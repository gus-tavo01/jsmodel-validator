const numberValidations = require('../../validations/number');

describe('Number Validations isNumeric', () => {
  test('When a numeric type value is provided, expect to be success', async () => {
    // Arrange
    const myAge = 25;

    // Act
    const validationResult = numberValidations
      .isNumeric('myAge', myAge)
      .execute();

    // Assert
    expect(validationResult).toBe(true);
  });

  test('When a string number is provided, expect to be success', async () => {
    // Arrange
    const myAge = '250';

    // Act
    const validationResult = numberValidations
      .isNumeric('myAge', myAge)
      .execute();

    // Assert
    expect(validationResult).toBe(true);
  });

  test('When an array is provided, expect to be success', async () => {
    // Arrange
    const value = [25];

    // Act
    const validationResult = numberValidations
      .isNumeric('test', value)
      .execute();

    // Assert
    expect(validationResult).toBe(false);
  });

  test('When an object is provided, expect to be success', async () => {
    // Arrange
    const value = { number: 1111 };

    // Act
    const validationResult = numberValidations
      .isNumeric('test', value)
      .execute();

    // Assert
    expect(validationResult).toBe(false);
  });
});

describe('Number Validations isBetween', () => {
  test('When conf object is populated correctly, expect a successful result', async () => {
    // Arrange
    const from = 1;
    const to = 10;
    const value = 5;

    // Act
    const validationResult = numberValidations.isBetween('test', value, {
      from,
      to,
    });

    // Assert
    expect(validationResult).toBeTruthy();
  });

  test('When value is not in range, expect a failure result', async () => {
    // Arrange
    const from = 1;
    const to = 10;
    const value = 50;

    // Act
    const validationResult = numberValidations
      .isBetween('test', value, {
        from,
        to,
      })
      .execute();

    // Assert
    expect(validationResult).not.toBeTruthy();
  });

  test('When from is out of range, expect validation to be false', async () => {
    // Arrange
    const from = 11;
    const to = 10;
    const value = 5;

    // Act
    const validationResult = numberValidations
      .isBetween('test', value, {
        from,
        to,
      })
      .execute();

    // Assert
    expect(validationResult).not.toBeTruthy();
  });
});

describe('Number Validations isNotZero', () => {
  test('When value is a number different to zero, expect validation to be passed', async () => {
    // Arrange
    const value = 500;

    // Act
    const validationResult = numberValidations
      .isNotZero('test', value)
      .execute();

    // Assert
    expect(validationResult).toBeTruthy();
  });

  test('When value is a string number different to zero, expect validation to be success', async () => {
    // Arrange
    const value = '10';

    // Act
    const validation = numberValidations.isNotZero('test', value).execute();

    // Assert
    expect(validation).toBeTruthy();
  });

  test('When value is zero, expect validation to fail', async () => {
    // Arrange
    const value = 0;

    // Act
    const validation = numberValidations.isNotZero('test', value).execute();

    // Assert
    expect(validation).not.toBeTruthy();
  });

  test('When value is not a valid number, expect validation to fail', async () => {
    // Arrange
    const value = 'Twenty';

    // Act
    const validation = numberValidations.isNotZero('test', value).execute();

    // Assert
    expect(validation).not.toBeTruthy();
  });
});
