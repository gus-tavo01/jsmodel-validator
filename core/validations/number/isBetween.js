module.exports = (key, value, conf, errorMsg = undefined) => {
  const defaultMsg = `Field '${key}', expected to be by: ${conf.from} and ${conf.to}. Got: ${value}`;
  const validationFailureMessage = !errorMsg ? defaultMsg : errorMsg;
  return {
    validation: 'isBetween',
    property: key,
    onFailureMessage: validationFailureMessage,
    execute: () => value >= conf.from && value <= conf.to,
  };
};
