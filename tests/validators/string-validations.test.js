const stringValidations = require('../../core/validations/string');

describe('String Validations isString', () => {
  test('When a valid string type value is provided, expect to be success', async () => {
    // Arrange
    const value = 'Papuh';

    // Act
    const result = stringValidations.isString('test', value).execute();

    // Assert
    expect(result).toBeTruthy();
  });
});

describe('String Validations isNotEmpty', () => {
  test('When value is not an empty string, expect validation to pass', async () => {
    // Arrange
    const value = 'Ticky y yayis';

    // Act
    const result = stringValidations.isNotEmpty('name', value).execute();

    // Assert
    expect(result).toBeTruthy();
  });

  test('When value is an empty string, expect validation to fail', async () => {
    // Arrange
    const value = '';

    // Act
    const result = stringValidations.isNotEmpty('name', value).execute();

    // Assert
    expect(result).not.toBeTruthy();
  });

  test('When value contains white spaces, expect validation to fail', async () => {
    // Arrange
    const value = '   ';

    // Act
    const result = stringValidations.isNotEmpty('name', value).execute();

    // Assert
    expect(result).not.toBeTruthy();
  });
});

// describe('String Validations isMongoId', () => {});

// describe('String Validations isLength', () => {});

// describe('String Validations isEmail', () => {});

// describe('String Validations isDate', () => {});
