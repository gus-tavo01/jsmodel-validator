const numberValidations = require('../../core/validations/number');

module.exports = {
  isBetween: (conf, errorMessage = undefined) => ({
    validator: numberValidations.isBetween,
    errorMessage,
    conf,
  }),
  isNumeric: (errorMessage = undefined) => ({
    validator: numberValidations.isNumeric,
    errorMessage,
  }),
  isNotZero: (errorMessage = undefined) => ({
    validator: numberValidations.isNotZero,
    errorMessage,
  }),
};
