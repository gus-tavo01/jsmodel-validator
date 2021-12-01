const numberValidations = require('./numberValidations');
const stringValidations = require('./stringValidations');
const booleanValidations = require('./booleanValidations');
const commonValidations = require('./commonValidations');

module.exports = {
  string: stringValidations,
  boolean: booleanValidations,
  number: numberValidations,
  common: commonValidations,
};
