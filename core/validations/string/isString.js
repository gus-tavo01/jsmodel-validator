module.exports = (key, value, errorMsg = undefined) => {
  const defaultMsg = `Field '${key}', expected to be String. Got: ${value}`;
  const validationFailureMessage = !errorMsg ? defaultMsg : errorMsg;
  return {
    validation: 'isString',
    property: key,
    value,
    onFailureMessage: validationFailureMessage,
    execute: () => typeof value === 'string',
  };
};
