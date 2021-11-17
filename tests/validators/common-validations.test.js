const commonValidations = require('../../core/validations/common');

describe('Common validations isOneOf', () => {
  test('When given value is in the collection, expect to be valid', async () => {
    // Arrange
    const value = true;
    const collection = [false, 'true', true];

    // Act
    const isValid = commonValidations
      .isOneOf('test', value, collection)
      .execute();

    // Assert
    expect(isValid).toBeTruthy();
  });

  test('When the given value does not exist in the provided collection, expect valid result to be false', () => {
    // Arrange
    const value = 'My value';
    const collection = [{ name: 'wilson' }, 'Not my value'];

    // Act
    const isValid = commonValidations
      .isOneOf('test', value, collection)
      .execute();

    // Assert
    expect(isValid).not.toBeTruthy();
  });

  test('When a custom compare function is provided, expect collection to be evaluated', async () => {
    // Arrange
    const value = 'wilson';
    const collection = [{ name: 'wilson' }, 'Not my value'];

    // Act
    const isValid = commonValidations
      .isOneOf('test', value, collection, (item) => item.name === value)
      .execute();

    // Assert
    expect(isValid).toBeTruthy();
  });

  test('When a custom error message is provided, expect to be displayed instead', async () => {
    // Arrange
    const value = 'My value';
    const collection = [{ name: 'wilson' }, 'Not my value'];
    const customError = 'Error test message for this validation';

    // Act
    const validation = commonValidations.isOneOf(
      'test',
      value,
      collection,
      undefined,
      customError
    );

    // Assert
    expect(validation.onFailureMessage).toBe(customError);
  });
});
