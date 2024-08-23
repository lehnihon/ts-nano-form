</br>
<p align="center">
  <img src="./logo.png" alt="tsnanoform" height="250"  />
</p>
<h1 align="center"></h1>
</br>
<p align="center">
  <b>A simple and versatile way of working with forms. Lightweight and dependency free.</b>
</p>
</br>
<p align="center">
  <sub>Made with ❤️ by <a href="https://github.com/lehnihon">lehnihon</a> & <a href="https://github.com/lehnihon/ts-nano-form/graphs/contributors">contributors</a></sub>
</p>

<br />

<div align="center">

[![npm version](https://img.shields.io/npm/v/ts-nano-form.svg?style=flat-square)](https://www.npmjs.org/package/ts-nano-form)
[![install size](https://img.shields.io/badge/dynamic/json?url=https://packagephobia.com/v2/api.json?p=ts-nano-form&query=$.install.pretty&label=install%20size&style=flat-square)](https://packagephobia.now.sh/result?p=ts-nano-form)
[![npm bundle size](https://img.shields.io/bundlephobia/minzip/ts-nano-form?style=flat-square)](https://bundlephobia.com/package/ts-nano-form@latest)
[![npm downloads](https://img.shields.io/npm/dm/ts-nano-form.svg?style=flat-square)](https://www.npmjs.com/package/ts-nano-form)
[![npm](https://img.shields.io/npm/l/ts-nano-form?style=flat-square)](https://github.com/lehnihon/ts-nano-form/blob/main/LICENSE)

</div>

<br />

## Why

Need for a solution that works on different stacks.

### Features

- Form validation.
- Mask input texts.

![divider](./divider.png)

## Table of Contents

- [Getting Started](#getting-started)
- [Store](#store)
- [Mask](#mask)
- [TS Nano Form API](#ts-nano-form-api)
  - [Mask API](#mask-api)
  - [Form API](#form-api)
  - [Store API](#store-api)
- [Customize](#customize)
- [Examples](#examples)
- [License](#license)

![divider](./divider.png)

## Getting Started

### Install

```bash
npm install ts-nano-form
```

### Quickstart

For each form, create a component with the createForm method.

```tsx
import createTsMask from "ts-simple-mask";

type FormUserType = {
  name: string;
  document: string;
};

export const FormUserFields = {
  name: "",
  document: "",
};

export const FormUser = createForm<FormUserType>(FormUserFields);
```

Values ​​and errors are accessed by get methods getValue and getError.
To apply masks use setMasked or setMoneyMasked.

```tsx
import { FormUser } from "./FormUser";

const { field } = FormUser;
const { getValue, getError, setValue, setMasked, setMoneyMasked } =
  field("name");

setValue("123456");
getValue();
//123456

setMasked("123456", "000-000");
getValue();
//123-456

setMoneyMasked("12346");
getValue();
//1.234,56
```

The submit method validates and returns errors.

```tsx
import { FormUser, FormUserFields } from "./FormUser";

const { submit, field } = FormUser;
const { getError } = field("name");

submit((data) => {
  let errors = { ...FormUserFields };
  if (!data.name) errors.name = "name required";
  if (!data.document) errors.document = "document required";
  //check for errors
  if (JSON.stringify(errors) === JSON.stringify(FormUserFields))
    console.log("send data", data);

  return errors;
});

getError();
//'name required' if it is empty
```

![divider](./divider.png)

## Store

Values and errors ​​are placed in stores.
Each change can be watched with the subscribe method.

```ts
import createTsMask from "ts-simple-mask";

type FormUserType = {
  document: string;
};

export const FormUserFields = {
  document: "12345",
};

export const FormUser = createForm<FormUserType>(FormUserFields);
const { subscribeValue, setValue } = field("document");
subscribeValue((value: string, prevValue: string) =>
  console.log(value, prevValue)
);
setValue("67890");
//67890 12345
```

setValue is to change store values.
getValue, getError are to return the values.

```ts
import createTsMask from "ts-simple-mask";

type FormUserType = {
  document: string;
};

export const FormUserFields = {
  document: "",
};

export const FormUser = createForm<FormUserType>(FormUserFields);
const { setValue, setValueMasked, getValue } = field("document");
setValueMasked("12345");
getValue();
//123,45
setValue("67890");
getValue();
//67890
```

![divider](./divider.png)

## Mask

There are some ready-to-use standard rules:

- '0' = any digit
- 'A' = any alphanumeric
- 'S' = any letter
- 'X' = any letter and transform to uppercase
- 'x' = any letter and transform to lowercase
- 'Z' = any alphanumeric and transform to uppercase
- 'z' = any alphanumeric and transform to lowercase

```ts
import { FormUser } from "./FormUser";

const { mask, unmask } = FormUser;
mask("123456789", "000-000-000");
//123-456-789

unmask("123-456-789");
//123456789
```

To place a masked value in a store, use the setMasked or setMoneyMasked methods.

There are also getMasked and getMoneyMasked methods that transform and return a raw value from the store.

```ts
import { FormUser } from "./FormUser";

const { field } = FormUser;
const {
  setValue,
  setMasked,
  setMoneyMasked,
  getMasked,
  getMoneyMasked,
  getUnmasked,
} = field("document");

setValue("123456");
getMasked("000-000");
//123-456
getMoneyMasked();
//1.234,56

setMasked("789012", "000-000");
getValue();
//789-012

setMoneyMasked("345678");
getValue();
//3.456,78

getUnmasked();
//345678
```

![divider](./divider.png)

## TS Nano Form API

The API is separated into Mask API where the mask functions are located.

Form API methods, related to form, validation.

Store API methods, used to manipulate stores.

### Mask API

- Mask text

`mask(value: string, maskRule: string)`

```ts
import { FormUser } from "./FormUser";

const { mask } = FormUser;
mask("ABC1A23", "SSS-0A00");
//ABC-1A23
```

- Unmask text

`unmask(value: string)`

```ts
import { FormUser } from "./FormUser";

const { unmask } = FormUser;
const unmasked = unmask("ABC-1A23");
//ABC1A23
```

- Mask money

`maskMoney(value: string)`

```ts
import { FormUser } from "./FormUser";

const { maskMoney } = FormUser;
const masked = maskMoney("123456");
//1.234,56
```

- Unmask money

`unmaskMoney(value: string)`

```ts
import { FormUser } from "./FormUser";

const { unmaskMoney } = FormUser;
const umasked = unmaskMoney("1.234,56");
//123456
```

- Get default masks

`getMask(value: string, type: MaskType)`

```ts
import { FormUser } from "./FormUser";
import { MaskType } from "ts-simple-mask";

const { mask, getMask } = FormUser;
const value = "469636036";
mask(value, getMask(value, MaskType.DOCUMENT_BR));
//46.963.603-6
```

- Get placeholder

`getPlaceholder(maskRule: string)`

```ts
import { FormUser } from "./FormUser";

const { getPlaceholder } = FormUser;
const placeholder = getPlaceholder("SSS-0A00");
//___-____
```

### Form API

- Submit store values

`submit(validate: (values: T) => T)`

```ts
import { FormUserFields, FormUser } from "./FormUser";

const { submit } = FormUser;

const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
  e.preventDefault();
  submit((data) => {
    const errors = { ...FormUserFields };
    if (!data.name) errors.name = "name required";
    //check for errors
    if (JSON.stringify(errors) === JSON.stringify(TsFormUserInitalValues))
      console.log("send data", data);

    return errors;
  });
};
```

- Field store

`field(name: string)`

```ts
import { FormUserFields, FormUser } from "./FormUser";

const { field } = FormUser;
const { setMasked } = field("document");

setMasked("123456", "000-000");
```

### Store API

- Get the store value

`getValue(): string`

```ts
import { FormUser } from "./FormUser";

const { field } = FormUser;
const { getValue } = field("name");
getValue();
```

- Get masked value without changing the store

`getMasked(maskRule: string): string`

```ts
import { FormUser } from "./FormUser";

const { field } = FormUser;
const { getMasked } = field("name");
getMasked("000-000");
```

- Get unmasked value without changing the store

`getUnmasked(maskRule: string): string`

```ts
import { FormUser } from "./FormUser";

const { field } = FormUser;
const { getUnmasked } = field("name");
getUnmasked();
```

- Get masked money without changing the store

`getMoneyMasked(maskRule: string): string`

```ts
import { FormUser } from "./FormUser";

const { field } = FormUser;
const { getMoneyMasked } = field("name");
getMoneyMasked();
```

- Get unmasked money without changing the store

`getMoneyUnmasked(): string`

```ts
import { FormUser } from "./FormUser";

const { field } = FormUser;
const { getMoneyUnmasked } = field("name");
getMoneyUnmasked();
```

- Get the store error

`getError(): string`

```ts
import { FormUser } from "./FormUser";

const { field } = FormUser;
const { getError } = field("name");
getError();
```

- Get all store values

`getValues(): T`

```ts
import { FormUser } from "./FormUser";

const { getValues } = FormUser;

getValues();
```

- Get all store errors

`getErrors(): T`

```ts
import { FormUser } from "./FormUser";

const { getErrors } = FormUser;

getErrors();
```

- Set the store value

`setValue(value: string): string`

```ts
import { FormUser } from "./FormUser";

const { field } = FormUser;
const { setValue } = field("name");
setValue("John Doe");
```

- Set the store with the masked value

`setMasked(value: string): string`

```ts
import { FormUser } from "./FormUser";

const { field } = FormUser;
const { setMasked } = field("name");
setMasked("123456", "000-000");
```

- Set the store with the masked money

`setMoneyMasked(value: string): string`

```ts
import { FormUser } from "./FormUser";

const { field } = FormUser;
const { setMoneyMasked } = field("name");
setMoneyMasked("123456");
```

- Set the store error

`setError(value: string): string`

```ts
import { FormUser } from "./FormUser";

const { field } = FormUser;
const { setError } = field("name");
setError("name required");
```

- Watch changes in the store value

`subscribeValue(listener: (value: string, prevValue: string) => void): () => void`

```ts
import { FormUser } from "./FormUser";

const { field } = FormUser;
const { subscribeValue } = field("name");

subscribeValue((value: string, prevValue: string) =>
  console.log(value, prevValue)
);
```

- Watch changes in the store error

`subscribeError(listener: (value: string, prevValue: string) => void): () => void`

```ts
import { FormUser } from "./FormUser";

const { field } = FormUser;
const { subscribeError } = field("name");

subscribeError((value: string, prevValue: string) =>
  console.log(value, prevValue)
);
```

- Watch changes in all store values

`subscribeAllValues(listener: (value: string, prevValue: string) => void): () => void`

```ts
import { FormUser } from "./FormUser";

const { subscribeAllValues } = FormUser;

subscribeAllValues((value: string, prevValue: string) =>
  console.log(value, prevValue)
);
```

- Watch changes in all store errors

`subscribeAllErrors(listener: (value: string, prevValue: string) => void): () => void`

```ts
import { FormUser } from "./FormUser";

const { subscribeAllErrors } = FormUser;

subscribeAllErrors((value: string, prevValue: string) =>
  console.log(value, prevValue)
);
```

![divider](./divider.png)

## Customize

Customize

![divider](./divider.png)

## Examples

Practical use examples

![divider](./divider.png)

## License

[MIT](/LICENSE)
