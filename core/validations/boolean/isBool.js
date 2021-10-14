module.exports = (key, value, errorMsg = undefined) => {
  const defaultMsg = `Field '${key}', expected to be Boolean. Got: ${value}`;
  const validationFailureMessage = !errorMsg ? defaultMsg : errorMsg;
  return {
    property: key,
    validation: 'isBool',
    onFailureMessage: validationFailureMessage,
    execute: () => {
      const v = value.toString();
      return !Array.isArray(value) && (v === 'true' || v === 'false');
    },
  };
};
