const validator = require('validator');

module.exports = (key, value, errorMsg = undefined) => {
  const defaultMsg = `Field '${key}', expected to be a valid date. Got: ${value}`;
  const validationFailureMessage = errorMsg || defaultMsg;
  return {
    validation: 'isDate',
    property: key,
    onFailureMessage: validationFailureMessage,
    execute: () => validator.isDate(value),
  };
};
