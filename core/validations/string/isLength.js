const validator = require('validator');

module.exports = (key, value, conf, errorMsg = undefined) => {
  const defaultMsg = `Field '${key}', expected to have length ${conf}. Got: ${value}`;
  const validationFailureMessage = !errorMsg ? defaultMsg : errorMsg;
  return {
    validation: 'isLength',
    property: key,
    onFailureMessage: validationFailureMessage,
    execute: () => !validator.isEmpty(value, { ignore_whitespace: true }),
  };
};
