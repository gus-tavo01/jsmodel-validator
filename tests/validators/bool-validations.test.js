const booleanValidations = require('../../src/validations/boolean');

describe('Boolean Validations isBool', () => {
  test('When value is boolean type, expect validation to be success', async () => {
    // Arrange
    const value = true;

    // Act
    const result = booleanValidations.isBool('test', value).execute();

    // Assert
    expect(result).toBeTruthy();
  });

  test('When value is string boolean, expect validation to suceed', async () => {
    // Arrange
    const value = 'true';

    // Act
    const result = booleanValidations.isBool('test', value).execute();

    // Assert
    expect(result).toBeTruthy();
  });

  test('When value is array, expect validation to fail', async () => {
    // Arrange
    const value = [true];

    // Act
    const result = booleanValidations.isBool('test', value).execute();

    // Assert
    expect(result).not.toBeTruthy();
  });

  test('When value is a number, expect validation to fail', async () => {
    // Arrange
    const value = 1;

    // Act
    const result = booleanValidations.isBool('test', value).execute();

    // Assert
    expect(result).not.toBeTruthy();
  });
});
