# js-validation-tool

Uses [validator.js](https://www.npmjs.com/package/validator) under the hood.

## Installation and usage

Install the library with `npm i js-validation-tool`

### Import

```
const jsValidator = require('js-validator-tool');
// or
const validate = require('js-validator-tool/core/validate');
const validations = require('js-validator-tool/core/validations);
// or
const { validate, validateModel, validations } = require('js-validator-tool);
```

### Validation models

Each _model_ must return an object, each property should have a collection of validations.

```
const Validations = require('js-validator-tool/core/validations');
const userModel = (entity) => ({
  name: [Validations.string.isNotEmpty('name', entity.name)],
  age: [Validations.number.isBetween('age', entity.age, { from: 18, to: 30 })],
  isNew: [Validations.boolean.isBool('isNew', entity.isNew)]
});
```

### Validations

Every validation takes the following parameters

| Parameter     | Description                                    | Optional |
| ------------- | ---------------------------------------------- | -------- |
| key           | Property name being validated                  | No       |
| value         | Value to validate                              | No       |
| configuration | Validation additional parameters               | Yes      |
| errorMessage  | Custom error message when validation is failed | Yes      |

returns a Promise<{ fields: [String], isValid: Boolean }>

**Example**

```
const validationResult = await validate([
  validations.string.isString('name', 'Jhon'),
  validations.number.isNotZero('age', 0),
]);
console.log(validationResult); // prints: { isValid: true, fields: ["Field 'age', expected not to be Zero. Got 0"] }
```

### Add your own validations

```
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
```

### Full example

```
const { validate, validateModel, validations } = require('js-validator-tool');

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

```
