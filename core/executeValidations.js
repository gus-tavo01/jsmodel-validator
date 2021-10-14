module.exports = async function executeValidations(validations) {
  const rawFields = await Promise.all(validations);
  const fields = rawFields.filter((field) => field !== null);
  const validationResult = {
    isValid: fields.length === 0,
    fields,
  };

  return validationResult;
};
