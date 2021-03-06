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

describe('String Validations isMongoId', () => {
  test('When given value is a valid mongo id, expect validation to be passed', () => {
    // Arrange
    const value = '610ee6899a25e341708f1209';

    // Act
    const isValid = stringValidations.isMongoId('test', value).execute();

    // Assert
    expect(isValid).toBeTruthy();
  });

  test('When the given value is not a mong id, expect validation to fail', () => {
    // Arrange
    const value = 'Some1235idv7v6gdfhg98';

    // Act
    const isValid = stringValidations.isMongoId('test', value).execute();

    // Assert
    expect(isValid).not.toBeTruthy();
  });

  test('When a custom error message is provided, expect to be used when validation fails', () => {
    // Arrange
    const value = 'SomeRandomId1235idv7v6gdfh98';
    const customError = 'Given field is not valid';

    // Act
    const { onFailureMessage } = stringValidations.isMongoId(
      'test',
      value,
      customError
    );

    // Assert
    expect(onFailureMessage).toBe(customError);
  });
});

describe('String Validations isLength', () => {
  test('When the given strings length matches, expect validation to be passed', () => {
    // Arrange
    const value = 'Valid string';

    // Act
    const isValid = stringValidations
      .isLength('test', value, {
        min: 3,
        max: 15,
      })
      .execute();

    // Assert
    expect(isValid).toBeTruthy();
  });

  test('When the given strings length does not match, expect validation to fail', () => {
    // Arrange
    const value = 'Failed';

    // Act
    const isValid = stringValidations
      .isLength('test', value, { min: 10 })
      .execute();

    // Assert
    expect(isValid).not.toBeTruthy();
  });

  test('When a custom error message is provided, expect to be shown', () => {
    // Arrange
    const value = 'Test one two';
    const customError = 'No funciono man';

    // Act
    const { onFailureMessage } = stringValidations.isLength(
      'test',
      value,
      { max: 5 },
      customError
    );
    // Assert
    expect(onFailureMessage).toBe(customError);
  });
});

describe('String Validations isEmail', () => {
  test('When given value is a valid email, expect validation to pass', () => {
    // Arrange
    const value = 'gustavoa.loera@gmail.com';

    // Act
    const isValid = stringValidations.isEmail('test', value).execute();

    // Assert
    expect(isValid).toBeTruthy();
  });

  test('When given value is not an email, expect validation to fail', () => {
    // Arrange
    const value = 'gustavo.loera.com';

    // Act
    const isValid = stringValidations.isEmail('test', value).execute();

    // Assert
    expect(isValid).not.toBeTruthy();
  });

  test('When a a custom error is provided, expect to be shown', () => {
    // Arrange
    const value = 'gustavoa.loera';
    const customError = 'This validation has failed';

    // Act
    const { onFailureMessage } = stringValidations.isEmail(
      'test',
      value,
      customError
    );
    // Assert
    expect(onFailureMessage).toBe(customError);
  });
});

describe('String Validations isDate', () => {
  test('When the given value is a valid date, expect validation to be passed', () => {
    // Arrange
    const value = '2019-11-01';

    // Act
    const isValid = stringValidations.isDate('test', value).execute();

    // Assert
    expect(isValid).toBeTruthy();
  });

  test('When given value is not a valid date, expect validation to fail', () => {
    // Arrange
    const value = '201911-01';

    // Act
    const isValid = stringValidations.isDate('test', value).execute();

    // Assert
    expect(isValid).not.toBeTruthy();
  });

  test('When a custom error is passed, expect to be shown', () => {
    // Arrange
    const value = '2019-11-0100a';
    const customError = 'This is not working';

    // Act
    const { onFailureMessage } = stringValidations.isDate(
      'test',
      value,
      customError
    );

    // Assert
    expect(onFailureMessage).toBe(customError);
  });
});
