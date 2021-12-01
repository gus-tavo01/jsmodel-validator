module.exports = (key, value, errMessage = undefined) => {
  const defaultMsg = `Field '${key}', expected to be Numeric. Got: ${value}`;
  const validationFailureMessage = !errMessage ? defaultMsg : errMessage;
  return {
    validation: 'isNumeric',
    property: key,
    value,
    onFailureMessage: validationFailureMessage,
    execute: () => {
      if (Array.isArray(value) || value === undefined) return false;
      return !isNaN(parseInt(value));
    },
  };
};
