const validator = require('validator');

module.exports = (key, value, errorMsg = undefined) => {
  const defaultMsg = `Field '${key}', expected not to be empty. Got: ${value}`;
  const validationFailureMessage = !errorMsg ? defaultMsg : errorMsg;
  return {
    validation: 'isNotEmpty',
    property: key,
    onFailureMessage: validationFailureMessage,
    execute: () => !validator.isEmpty(value, { ignore_whitespace: true }),
  };
};
