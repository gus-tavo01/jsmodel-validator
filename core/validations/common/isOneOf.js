module.exports = (
  key,
  value,
  collection,
  compareFunc = undefined,
  errorMsg = undefined
) => {
  const defaultMsg = `Field '${key}', expected to be in ${JSON.stringify(
    collection
  )}. Got: ${value}`;
  const validationFailureMessage = errorMsg || defaultMsg;
  return {
    validation: 'isOneOf',
    property: key,
    value,
    onFailureMessage: validationFailureMessage,
    execute: () => {
      const handler = (v) => v === value;
      return collection.some(compareFunc || handler);
    },
  };
};
