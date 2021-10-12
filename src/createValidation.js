module.exports = async (validation) => {
  try {
    const validationPassed = validation.execute();
    if (!validationPassed) return validation.onFailureMessage;
  } catch (err) {
    return validation.onFailureMessage;
  }
  return null; // validation succeed ✔️
};
