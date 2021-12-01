const commonValidations = require('../../core/validations/common');

module.exports = {
  isOptional: (errorMessage = undefined) => ({
    validator: commonValidations.isOptional,
    errorMessage,
  }),
  isOneOf: (errorMessage = undefined) => ({
    validator: commonValidations.isOneOf,
    errorMessage,
  }),
};
