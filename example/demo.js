const { validate, validateModel, validations } = require('../index');

(async () => {
  // model validator example
  const productModel = (entity) => ({
    name: [validations.string.isNotEmpty('name', entity.name)],
    description: [
      validations.common.isOptional('description', entity.description),
      validations.string.isNotEmpty('description', entity.description),
    ],
    isNew: [validations.boolean.isBool('isNew', entity.isNew)],
  });

  const product = {
    name: 'Super box',
    // description is marked as optional, so can be omitted
    isNew: false,
  };

  const modelValidationResult = await validateModel(productModel, product);
  console.log(modelValidationResult); // prints {isValid: true, fields: []}

  // validations example
  const validationResult = await validate([
    validations.string.isString('foo', 'fooValue'),
    validations.number.isNotZero('bar', 0),
  ]);
  console.log(validationResult); // prints { isValid: true, fields: ["Field 'bar', expected not to be Zero. Got 0"] }

  // custom validation example
  const customValidator = (prop, value) => {
    const onFailureMessage = `Field '${prop}', is not valid`;
    return {
      validation: 'myCustomValidation', // validation name
      property: prop,
      onFailureMessage,
      execute: () => value !== undefined,
    };
  };

  const customValResult = await validate([customValidator('name', undefined)]);
  console.log(customValResult); // prints { isValid: false, fields: [ "Field 'name', is not valid" ] }
})();
