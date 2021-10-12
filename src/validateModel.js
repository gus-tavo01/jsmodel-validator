const createValidation = require('./createValidation');
const executeValidations = require('./executeValidations');

module.exports = async (validationModel, entity) => {
  const model = validationModel(entity);
  const validationKeys = Object.keys(model);
  const entityKeys = Object.keys(entity);

  const extraProps = entityKeys
    .filter((ek) => !validationKeys.find((vk) => vk === ek))
    .map((key) => `Unexpected field '${key}'`);

  const resultsValidations = validationKeys
    .map((key) => {
      const validations = model[key];
      const optional = validations.find((v) => v.validation === 'isOptional');
      if (optional && optional.value === undefined) return [];

      return validations.map((v) => createValidation(v));
    })
    .flat();

  const { isValid, fields } = await executeValidations(resultsValidations);
  const validationState = {
    isValid: isValid && !(extraProps.length > 0),
    fields: [...fields, ...extraProps],
  };

  return validationState;
};
