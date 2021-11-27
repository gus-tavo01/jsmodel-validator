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

_Models_ are functions that returns an object, each property has a collection of validations.

```
const ModelValidations = require('js-validator-tool/core/modelValidations');
const userModel = () => ({
  name: [ModelValidations.string.isNotEmpty()],
  age: [ModelValidations.number.isBetween({ from: 18, to: 30 })],
  isNew: [ModelValidations.boolean.isBool()]
});
```

### Single validations

Every validation takes the following parameters

| Parameter     | Description                                    | Optional |
| ------------- | ---------------------------------------------- | -------- |
| key           | Property name being validated                  | No       |
| value         | Value to validate                              | No       |
| configuration | Validation additional parameters               | Yes      |
| errorMessage  | Custom error message when validation is failed | Yes      |

returns a Promise<{ fields: [String], isValid: Boolean }>

### Available validations

Validations are separated in types (string, boolean, number and common)

#### String validations

| Validation | Description                                                            | Params                     |
| ---------- | ---------------------------------------------------------------------- | -------------------------- |
| isNotEmpty | Returns true if the given string value is not empty                    |                            |
| isString   | Returns true if the given value is a string                            |                            |
| isMongoId  | Returns true if the given value is a valid mongo id                    |                            |
| isDate     | Returns true if the given value is a date                              |                            |
| isEmail    | Returns true if the given value is a valid email address               |                            |
| isLength   | Returns true if the given string matches the provided min - max length | {min: number, max: number} |

#### Common validations

| Validation | Description                                            |
| ---------- | ------------------------------------------------------ |
| isOptional | Set the property as optional to be validated           |
| isOneOf    | Returns true when any value matches the provided array |

#### Number validations

| Validation | Description                                                                   |
| ---------- | ----------------------------------------------------------------------------- |
| isNumeric  | Returns true when the given value is a valid number                           |
| isNotZero  | Returns true when the provided value is different to 0                        |
| isBetween  | Returns true when the provided value matches with the provided range (config) |

#### Bool validations

| Validation | Description                                                  |
| ---------- | ------------------------------------------------------------ |
| isBool     | Returns true if the given value is boolean ('true' is valid) |

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
const { validate, validateModel, validations, modelValidations } = require('js-validator-tool');

(async () => {
  // model validator example
  const productModel = () => ({
    name: [modelValidations.string.isNotEmpty('name', entity.name)],
    description: [
      modelValidations.common.isOptional('description', entity.description),
      modelValidations.string.isNotEmpty('description', entity.description),
    ],
    isNew: [modelValidations.boolean.isBool('isNew', entity.isNew)],
  });

  const product = {
    name: 'Super box',
    // description is marked as optional, so can be omitted
    isNew: false,
  };

  const modelValidationResult = await validateModel(productModel, product);
  console.log(modelValidationResult); // prints {isValid: true, fields: []}

  // single validations example
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
