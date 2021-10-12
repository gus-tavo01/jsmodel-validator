module.exports = (key, value) => ({
  validation: 'isOptional',
  value,
  property: key,
  execute: () => true, // pass ✔️
});
