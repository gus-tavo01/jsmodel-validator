const booleanValidations = require('../../core/validations/boolean');

module.exports = {
  isBool: (errorMessage = undefined) => ({
    validator: booleanValidations.isBool,
    errorMessage,
  }),
};
