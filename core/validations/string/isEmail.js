const validator = require('validator');

module.exports = (key, value, errorMsg = undefined) => {
  const defaultMsg = `Field '${key}', expected to be a valid email. Got: ${value}`;
  const validationFailureMessage = errorMsg || defaultMsg;
  return {
    validation: 'isEmail',
    property: key,
    value,
    onFailureMessage: validationFailureMessage,
    execute: () => validator.isEmail(value, { ignore_whitespace: true }),
  };
};
