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

// describe('String Validations isNotEmpty', () => {});

// describe('String Validations isMongoId', () => {});

// describe('String Validations isLength', () => {});

// describe('String Validations isEmail', () => {});

// describe('String Validations isDate', () => {});
