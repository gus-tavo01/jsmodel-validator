const validator = require('validator');

module.exports = (key, value, errorMsg = undefined) => {
  const defaultMsg = `Field '${key}', expected to be Boolean. Got: ${value}`;
  const validationFailureMessage = !errorMsg ? defaultMsg : errorMsg;
  return {
    property: key,
    validation: 'isBool',
    onFailureMessage: validationFailureMessage,
    execute: () => validator.isBoolean(value.toString()),
  };
};
