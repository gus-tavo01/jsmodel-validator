const executeValidations = require('./executeValidations');
const createValidation = require('./createValidation');

module.exports = async (validations) => {
  const optionals = validations.filter((v) => v.validation === 'isOptional');

  const mandatoryValidations = validations.filter((v) => {
    const optional = optionals.find((op) => op.property === v.property);
    return !optional || optional.value !== undefined;
  });

  const validationsToExecute = mandatoryValidations.map((v) =>
    createValidation(v)
  );
  return executeValidations(validationsToExecute);
};
