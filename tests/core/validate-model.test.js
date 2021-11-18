const validateModel = require('../../core/validateModel');
const Validations = require('../../core/validations');

describe('Validate-Model execution', () => {
  test('When a validation model is provided, expect return an object with {isValid, fields}', async () => {
    // Arrange
    const person = { name: 'Do something', age: 13 };
    const personModel = (e) => ({
      name: [Validations.string.isNotEmpty('name', e.name)],
      age: [Validations.number.isBetween('age', e.age, { from: 15, to: 30 })],
    });

    // Act
    const validationResult = await validateModel(personModel, person);

    expect(validationResult).toHaveProperty('fields', [
      `Field 'age', expected to be by: 15 and 30. Got: ${person.age}`,
    ]);
    expect(validationResult).toHaveProperty('isValid');
  });

  test('When an optional validation is provided and entity does not have it, expect to ommit the validations', async () => {
    // Arrange
    const dog = { name: 'pitu' };
    const dogModel = (entity) => ({
      name: [Validations.string.isNotEmpty('name', entity.name)],
      age: [
        Validations.common.isOptional('age', entity.age),
        Validations.number.isBetween('age', entity.age, { from: 1, to: 10 }),
      ],
    });

    // Act
    const validationResult = await validateModel(dogModel, dog);

    // Assert
    expect(validationResult).toMatchObject({ isValid: true, fields: [] });
  });

  test('When an optional validation is provided and entity has it, expect to include the validations', async () => {
    // Arrange
    const from = 1;
    const to = 10;
    const dog = { name: 'pitu', age: 11 };
    const dogModel = (entity) => ({
      name: [Validations.string.isNotEmpty('name', entity.name)],
      age: [
        Validations.common.isOptional('age', entity.age),
        Validations.number.isBetween('age', entity.age, { from, to }),
      ],
    });

    // Act
    const validationResult = await validateModel(dogModel, dog);

    // Assert
    expect(validationResult).toMatchObject({
      isValid: false,
      fields: [
        `Field 'age', expected to be by: ${from} and ${to}. Got: ${dog.age}`,
      ],
    });
  });

  test('When entity has extra properties, expect fields to be populated', async () => {
    // Arrange
    const cat = { name: 'yayis', size: 'gordito', age: 12 };
    const catModel = (entity) => ({
      name: [Validations.string.isNotEmpty('name', entity.name)],
    });

    // Act
    const validationResult = await validateModel(catModel, cat);

    // Assert
    expect(validationResult).toMatchObject({
      isValid: false,
      fields: [`Unexpected field 'size'`, `Unexpected field 'age'`],
    });
  });

  test('When custom error message is provided, expect to be added when invalid', async () => {
    // Arrange
    const customError = `Invalid student name`;
    const student = {
      name: '',
      class: 'Mathematics',
    };
    const studentModel = (e) => ({
      name: [Validations.string.isNotEmpty('name', e.name, customError)],
      class: [Validations.string.isNotEmpty('class', e.class)],
    });

    // Act
    const validationResult = await validateModel(studentModel, student);

    // Assert
    expect(validationResult.fields).toMatchObject([customError]);
  });
});
