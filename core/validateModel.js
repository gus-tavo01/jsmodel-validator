const createValidation = require('./createValidation');
const executeValidations = require('./executeValidations');

function buildValidation(key, value, v) {
  // handle optional arguments
  if (v.conf) {
    return v.validator(key, value, v.conf, v.errorMessage);
  }
  // default behavior
  return v.validator(key, value, v.errorMessage);
}

module.exports = async (validationModel, entity) => {
  const model = validationModel(entity);
  const modelKeys = Object.keys(model);
  const entityKeys = Object.keys(entity);

  // check extra fields on entity
  const extraProps = entityKeys
    .filter((ek) => !modelKeys.find((vk) => vk === ek))
    .map((key) => `Unexpected field '${key}'`);

  // convert model validations into proccess validations
  const processValidations = modelKeys
    .map((key) => {
      // create validations from model
      const keyValidations = model[key].map((v) =>
        buildValidation(key, entity[key], v)
      );

      // ignore optional validations when theres no value on them
      const optional = keyValidations.find(
        (v) => v.validation === 'isOptional'
      );
      if (optional && optional.value === undefined) return [];

      return keyValidations.map((v) => createValidation(v));
    })
    .flat();

  const { isValid, fields } = await executeValidations(processValidations);
  const validationState = {
    isValid: isValid && !(extraProps.length > 0),
    fields: [...fields, ...extraProps],
  };

  return validationState;
};
