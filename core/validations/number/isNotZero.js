module.exports = (key, value, errMessage = undefined) => {
  const defaultMsg = `Field '${key}', expected not to be Zero. Got: ${value}`;
  const validationFailureMessage = !errMessage ? defaultMsg : errMessage;
  return {
    validation: 'isNotZero',
    property: key,
    onFailureMessage: validationFailureMessage,
    execute: () => parseInt(value, 10) > 0,
  };
};
