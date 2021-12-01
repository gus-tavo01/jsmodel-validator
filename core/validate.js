const executeValidations = require('./executeValidations');
const createValidation = require('./createValidation');

module.exports = async (validations) => {
  const optionals = validations.filter((v) => v.validation === 'isOptional');

  const mandatoryValidations = validations.filter((v) => {
    const optionalValidation = optionals.find((o) => o.property === v.property);
    return !optionalValidation || v.value !== undefined;
  });

  const validationsToExecute = mandatoryValidations.map((v) =>
    createValidation(v)
  );
  return executeValidations(validationsToExecute);
};
