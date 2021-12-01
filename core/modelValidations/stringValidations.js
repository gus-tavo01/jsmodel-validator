const stringValidations = require('../validations/string');

module.exports = {
  isNotEmpty: (errorMessage = undefined) => ({
    validator: stringValidations.isNotEmpty,
    errorMessage,
  }),
  isString: (errorMessage = undefined) => ({
    validator: stringValidations.isString,
    errorMessage,
  }),
  isEmail: (errorMessage = undefined) => ({
    validator: stringValidations.isEmail,
    errorMessage,
  }),
  isDate: (errorMessage = undefined) => ({
    validator: stringValidations.isDate,
    errorMessage,
  }),
  isMongoId: (errorMessage = undefined) => ({
    validator: stringValidations.isMongoId,
    errorMessage,
  }),
  isLength: (conf, errorMessage = undefined) => ({
    validator: stringValidations.isLength,
    conf,
    errorMessage,
  }),
};
