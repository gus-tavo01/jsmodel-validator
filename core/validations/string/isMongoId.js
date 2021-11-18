const validator = require('validator');

module.exports = (key, value, errorMsg = undefined) => {
  const defaultMsg = `Field '${key}', expected to be a valid mongo id. Got: ${value}`;
  const validationFailureMessage = !errorMsg ? defaultMsg : errorMsg;
  return {
    validation: 'isMongoId',
    property: key,
    onFailureMessage: validationFailureMessage,
    execute: () => validator.isMongoId(value),
  };
};
