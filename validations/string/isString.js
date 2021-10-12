module.exports = (key, value, errorMsg = undefined) => {
  const defaultMsg = `Field '${key}', expected not to be String. Got: ${value}`;
  const validationFailureMessage = !errorMsg ? defaultMsg : errorMsg;
  return {
    validation: 'isString',
    property: key,
    onFailureMessage: validationFailureMessage,
    execute: () => typeof value === 'string',
  };
};
