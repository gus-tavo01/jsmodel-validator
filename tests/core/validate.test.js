const validate = require('../../src/validate');
const Validations = require('../../src/validations');

describe('Validate execution', () => {
  test('When multiple validations are given, expect them to be executed', async () => {
    // Arrange
    const name = '';
    const validations = [
      Validations.string.isNotEmpty('name', name),
      Validations.boolean.isBool('isBlue', 'true'),
    ];

    // Act
    const validationResult = await validate(validations);

    // Assert
    expect(validationResult).toMatchObject({
      isValid: false,
      fields: [`Field 'name', expected not to be empty. Got: ${name}`],
    });
  });

  test('When isOptional validation is provided for a given field, expect to be validated', async () => {
    // Arrange
    const lastName = 'is defined';
    const validations = [
      Validations.string.isNotEmpty('name', 'Cool'),
      Validations.common.isOptional('lastName', lastName),
      Validations.string.isNotEmpty('lastName', lastName),
    ];

    // Act
    const validationResult = await validate(validations);

    // Assert
    expect(validationResult).toMatchObject({
      isValid: true,
      fields: [],
    });
  });

  test('When isOptional validation is provided for a not present field, expect validation to be omitted', async () => {
    // Arrange
    const second = undefined;
    const validations = [
      Validations.string.isString('firstOne', 'Kiki'),
      Validations.string.isString('secondOne', second),
      Validations.common.isOptional('secondOne', second),
    ];

    // Act
    const validationResult = await validate(validations);

    // Assert
    expect(validationResult).toMatchObject({ isValid: true, fields: [] });
  });
});
