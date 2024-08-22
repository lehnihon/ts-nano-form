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
To apply masks use onChangeMask or onChangeMoney.

```tsx
import { FormUser } from "./FormUser";

const { field } = FormUser;
const { getValue, getError, onChange, onChangeMask, onChangeMoney } =
  field("name");

onChange("123456");
getValue();
//123456

onChangeMask("123456", "000-000");
getValue();
//123-456

onChangeMoney("12346");
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
In stores each change can be watched with the subscribe method.

```ts
import createTsMask from "ts-simple-mask";

type FormUserType = {
  document: string;
};

export const FormUserFields = {
  document: "12345",
};

export const FormUser = createForm<FormUserType>(FormUserFields);
const { storeValue, storeError } = field("document");
storeValue.subscribe((value: string, prevValue: string) => {
  console.log(value, prevValue);
});
storeValue.set("67890");
//67890 12345
```

onChange, onChangeMask, onChangeMoney are shortcuts for set methods.
getValue, getError for get methods.

```ts
import createTsMask from "ts-simple-mask";

type FormUserType = {
  document: string;
};

export const FormUserFields = {
  document: "",
};

export const FormUser = createForm<FormUserType>(FormUserFields);
const { storeValue, storeError, onChange, getValue } = field("document");
storeValue.set("12345");
storeValue.get();
//12345
onChange("67890");
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

To place a masked value in a store, use the onChangeMask or onChangeMoney methods.

There are also getMasked and getMoneyMasked methods that transform and return a raw value from the store.

```ts
import { FormUser } from "./FormUser";

const { field } = FormUser;
const {
  onChange,
  onChangeMask,
  onChangeMoney,
  getMasked,
  getMoneyMasked,
  getUnmasked,
} = field("document");

onChange("123456");
getMasked("000-000");
//123-456
getMoneyMasked();
//1.234,56

onChangeMask("789012", "000-000");
getValue();
//789-012

onChangeMoney("345678");
getValue();
//3.456,78

getUnmasked();
//345678
```

![divider](./divider.png)

## TS Nano Form API

The API is separated into Mask API where the mask functions are located.

Form API methods, related to form, validation.

Field API methods, used to manipulate stores.

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

![divider](./divider.png)

## Customize

Customize

![divider](./divider.png)

## Examples

Practical use examples

![divider](./divider.png)

## License

[MIT](/LICENSE)
