const validator = require('validator');

module.exports = (key, value, errMessage = undefined) => {
  const defaultMsg = `Field '${key}', expected to be Numeric. Got ${value}`;
  const validationFailureMessage = !errMessage ? defaultMsg : errMessage;
  return {
    validation: 'isNumeric',
    property: key,
    onFailureMessage: validationFailureMessage,
    execute: () => validator.isNumeric(value.toString()),
  };
};
