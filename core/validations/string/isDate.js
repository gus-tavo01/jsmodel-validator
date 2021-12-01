const validator = require('validator');

module.exports = (key, value, errorMsg = undefined) => {
  const defaultMsg = `Field '${key}', expected to be a valid date. Got: ${value}`;
  const onFailureMessage = errorMsg || defaultMsg;
  return {
    property: key,
    value,
    validation: 'isDate',
    onFailureMessage,
    execute: () => validator.isDate(value),
  };
};
