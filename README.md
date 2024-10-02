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
  - [Form API](#form-api)
  - [Store API](#store-api)
  - [Mask API](#mask-api)
- [Options](#Options)
- [Examples](#examples)
  - [Vanilla JS](#vanilla-js)
  - [React](#react)
  - [Angular](#angular)
  - [Validators](#validators)
    - [Yup](#yup)
    - [Zod](#zod)
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
import createForm from "ts-nano-form";

type FormUserType = {
  name: string;
  document: string;
};

export const FormUserFields = {
  name: "",
  document: "",
};

export const FormUser = createForm<FormUserType>();
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

Stores are used to store all values ​​and errors and then validated by the submit method.
Each change can be watched with the subscribe method.

```ts
import createForm from "ts-nano-form";

type FormUserType = {
  document: string;
};

export const FormUserFields = {
  document: "12345",
};

export const FormUser = createForm<FormUserType>();
const { subscribeValue, setValue } = field("document");
subscribeValue((value: string, prevValue: string) =>
  console.log(value, prevValue)
);
setValue("67890");
//67890 12345
```

setValue, setError are to change store values.
getValue, getError are to return the values.

```ts
import createForm from "ts-nano-form";

type FormUserType = {
  document: string;
};

export const FormUserFields = {
  document: "",
};

export const FormUser = createForm<FormUserType>();
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

To use the mask without selecting a field, use mask, unmask.
These values ​​are not put in the store.

```ts
import { FormUser } from "./FormUser";

const { mask, unmask } = FormUser;
mask("123456789", "000-000-000");
//123-456-789

unmask("123-456-789");
//123456789
```

If is necessary to validate these values, put a masked value in a store, use the setMasked or setMoneyMasked methods.

There are also getMasked and getMoneyMasked which returns a masked value without changing the store.

Be careful when using the getUnmasked method, if the value is money use getMoneyUnmasked to add the decimal values.

```ts
import { FormUser } from "./FormUser";

const { field } = FormUser;
const {
  setValue,
  setMasked,
  setMoneyMasked,
  getMasked,
  getMoneyMasked,
  getMoneyMasked,
  getMoneyUnmasked,
} = field("document");

setValue("123456");
getMasked("000-000");
//123-456
getMoneyMasked();
//1.234,56
getValue();
//123456

setMasked("789012", "000-000");
getValue();
//789-012

setMoneyMasked("345678");
getValue();
//3.456,78

getMoneyUnmasked();
//3456.78
getUnmasked();
//345678
```

![divider](./divider.png)

## TS Nano Form API

The API is separated into Mask API where the mask functions are located.

Form API methods, related to form, validation.

Store API methods, used to manipulate stores.

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

- Change mask rules

`setRulesMask(rules: MaskOptions)`

```ts
import { FormUser } from "./FormUser";

const maskOptions = {
  map: new Map<string, MapOptions>([["9", { pattern: /\d/ }]]),
};

const { setRulesMask } = FormUser;
setRulesMask(maskOptions);
```

- Change money rules

`setRulesMoney(rules: MoneyOptions)`

```ts
import { FormUser } from "./FormUser";

const moneyOptions = {
  thousands: " ",
  decimal: ".",
  precision: 3,
  prefix: "R$",
};

const { setRulesMask } = FormUser;
setRulesMoney(moneyOptions);
```

- Get current rules

`getRules()`

```ts
import { FormUser } from "./FormUser";

const { getRules } = FormUser;
getRules();
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

- Get placeholder

`getPlaceholder(maskRule: string)`

```ts
import { FormUser } from "./FormUser";

const { getPlaceholder } = FormUser;
const placeholder = getPlaceholder("SSS-0A00");
//___-____
```

![divider](./divider.png)

## Options

- Default options

```ts
const DEFAULT_MONEY_OPTIONS = {
  thousands: ".",
  decimal: ",",
  precision: 2,
};

const DEFAULT_MASK_OPTIONS = {
  map: new Map<string, MapOptions>([
    ["0", { pattern: /\d/ }],
    ["A", { pattern: /[a-zA-Z0-9]/ }],
    ["S", { pattern: /[A-Za-z]/ }],
    [
      "X",
      {
        pattern: /[A-Za-z]/,
        transform: (prevValue, newChar) => ({
          prevValue,
          newChar: newChar.toLocaleUpperCase(),
        }),
      },
    ],
    [
      "x",
      {
        pattern: /[A-Za-z]/,
        transform: (prevValue, newChar) => ({
          prevValue,
          newChar: newChar.toLocaleLowerCase(),
        }),
      },
    ],
    [
      "Z",
      {
        pattern: /[a-zA-Z0-9]/,
        transform: (prevValue, newChar) => ({
          prevValue,
          newChar: newChar.toLocaleUpperCase(),
        }),
      },
    ],
    [
      "z",
      {
        pattern: /[a-zA-Z0-9]/,
        transform: (prevValue, newChar) => ({
          prevValue,
          newChar: newChar.toLocaleLowerCase(),
        }),
      },
    ],
  ]),
};
```

- Custom options

```ts
import createForm, { MapOptions } from "ts-nano-form";

type FormUserType = {
  document: string;
};

const moneyOptions = {
  thousands: " ",
  decimal: ".",
  precision: 3,
  prefix: "R$",
};

const maskOptions = {
  map: new Map<string, MapOptions>([
    [
      "#",
      {
        pattern: /[A-Za-z]/,
        transform: (prevValue, newChar) => ({
          prevValue,
          newChar: newChar.toLocaleUpperCase(),
        }),
      },
    ],
    ["9", { pattern: /\d/ }],
  ]),
};

export const FormUserFields = {
  document: "",
};

export const FormUser = createForm<FormUserType>({
  initialValues: FormUserFields,
  options: {
    maskOptions,
    moneyOptions,
  },
});

const { mask, maskMoney, setRulesMask, setRulesMoney } = FormUser;

mask("abcd", "####");
//return ABCD

maskMoney("123456789");
//return R$12 345.689

setRulesMask(maskOptions);
setRulesMoney(moneyOptions);
//change the mask rules
```

- Before Mask, After Mask

```ts
import createForm, { MapOptions } from "ts-nano-form";

type FormUserType = {
  document: string;
};

const moneyOptions = {
  thousands: ".",
  decimal: ",",
  precision: 2,
  beforeMask: (value) => (value === 1000 ? 1001 : value),
  afterMask: (value) => "$" + value,
};

const maskOptions = {
  map: new Map<string, MapOptions>([["#", { pattern: /[A-Za-z]/ }]]),
  beforeMask: (value) => (value === "hello" ? "helloworld" : value),
  afterMask: (value) => (value.length > 10 ? value.slice(0, -1) : value),
};

export const FormUserFields = {
  document: "",
};

const FormUser = createForm<FormUserType>({
  initialValues: FormUserFields,
  options: {
    maskOptions,
    moneyOptions,
  },
});

const { mask, maskMoney } = FormUser;

mask("hello", "###########");
//return helloworld

maskMoney("1000");
//return $10,00
```

![divider](./divider.png)

## Examples

Practical use examples

### Vanilla JS

```html
<form class="form">
  <input type="text" class="name" />
  <input type="submit" value="submit" />
</form>
```

```ts
import createForm from "ts-nano-form";

type FormUserType = {
  name: string;
};

const FormUserFields = {
  name: "",
};

const FormUser = createForm<FormUserType>();

const { field, submit } = FormUser;

const nameInput = document.querySelector<HTMLInputElement>(".name");
if (nameInput)
  nameInput.addEventListener("input", function (e) {
    if (e.target instanceof HTMLInputElement)
      nameInput.value = field("name").setValue(e.target.value);
  });

const form = document.querySelector<HTMLFormElement>(".form");
if (form)
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    submit((data) => {
      let errors = { ...FormUserFields };
      if (!data.name) errors.name = "name required";
      //check for errors
      if (JSON.stringify(errors) === JSON.stringify(FormUserFields))
        console.log("send data", data);

      return errors;
    });
  });
```

### React

Create a component and use the useSyncExternalStore hook to watch value and error changes.

```tsx
import { useSyncExternalStore } from "react";
import FormUser from "./createFormUser";

interface InputTextProps {
  field: string;
}

const InputText = ({ field }: InputTextProps) => {
  const { subscribeValue, getValue, subscribeError, getError, setValue } =
    FormUser.field(field);

  const value = useSyncExternalStore(subscribeValue, getValue);
  const error = useSyncExternalStore(subscribeError, getError);

  return (
    <>
      <label>{field}</label>
      <input value={value} onChange={(e) => setValue(e.target.value)} />
      <p>{error}</p>
    </>
  );
};

export default InputText;
```

Validate the fields with the submit method.

```tsx
import InputText from "./InputText";
import FormUser, { FormUserFields } from "./createFormUser";

function Form() {
  const { submit } = FormUser;

  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    submit((data) => {
      const errors = { ...FormUserFields };

      if (!data.name) errors.name = "name required";
      if (!data.document) errors.document = "document required";
      //check for errors
      if (JSON.stringify(errors) === JSON.stringify(TsFormUserInitalValues))
        console.log("send data", data);

      return errors;
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <InputText field="name" />
      <InputText field="document" />
      <p>
        <input type="submit" value="Enviar" />
      </p>
    </form>
  );
}

export default Form;
```

### Angular

Input html

```html
<div>
  <div>
    <label>Name</label>
    <input type="text" name="name" (input)="changeName($event)" />
  </div>
  <div>{{ error }}</div>
  <button (click)="submitData()">Send</button>
</div>
```

Input component

```ts
import { Component, OnInit } from "@angular/core";
import createForm from "ts-nano-form";
import FormUser from "./createFormUser";

const { field } = FormUser;

@Component({
  selector: "app-form",
  templateUrl: "./form.component.html",
  styleUrls: ["./form.component.scss"],
})
export class FormComponent implements OnInit {
  @Input() field: string = "";
  public value: string = "";
  public error: string = "";
  public fieldName = field("name");

  ngOnInit() {
    field(this.field).subscribeValue((value) => (this.value = value));
    field(this.field).subscribeError((value) => (this.error = value));
  }

  changeName(e: any) {
    field(this.field).setValue(e.target.value);
  }

  submitData() {
    submit((data) => {
      let errors = { ...FormUserFields };
      if (!data.name) errors.name = "name required";
      //check for errors
      if (JSON.stringify(errors) === JSON.stringify(FormUserFields))
        console.log("send data", data);

      return errors;
    });
  }
}
```

Submit html

```html
<div>
  <app-form field="name" />
  <button (click)="submitData()">Submit</button>
</div>
```

Submit component

```ts
import { Component } from "@angular/core";
import { FormUser, FormUserFields } from "../formUser";

const { submit } = FormUser;

@Component({
  selector: "app-root",
  templateUrl: "app.component.html",
  styleUrls: ["app.component.scss"],
})
export class AppComponent {
  constructor() {}

  submitData() {
    submit((data) => {
      let errors = { ...FormUserFields };
      if (!data.name) errors.name = "name required";
      //check for errors
      if (JSON.stringify(errors) === JSON.stringify(FormUserFields))
        console.log("send data", data);

      return errors;
    });
  }
}
```

### Validators

Examples of using form validators

#### Yup

```ts
import { AnyObject, ObjectSchema, ValidationError } from "yup";
import TsFormUser, { userSchema } from "./createFormUser";

const validateYup = <T>(data: T, schema: ObjectSchema<AnyObject>) => {
  let errors = { ...data };
  try {
    schema.validateSync(data, { abortEarly: false });
  } catch (e) {
    if (e instanceof ValidationError) {
      errors = e.inner.reduce((acc: any, error) => {
        acc[error.path!] = error.message;
        return acc;
      }, {} as T);
    }

    return errors;
  }
};

const { submit } = TsFormUser;
submit((data) => validateYup(data, userSchema));
```

#### Zod

```ts
import { z } from "zod";
import TsFormUser, { userSchema } from "./createFormUser";

const validateZod = <T>(data: T, schema: z.ZodType<T>) => {
  let errors = { ...data };
  try {
    schema.parse(data);
  } catch (e) {
    if (e instanceof z.ZodError) {
      errors = e.issues.reduce((acc: any, error) => {
        acc[error.path.join(".")] = error.message;
        return acc;
      }, {} as T);
    }
    return errors;
  }
};

const { submit } = TsFormUser;
submit((data) => validateZod(data, userSchema));
```

![divider](./divider.png)

## License

[MIT](/LICENSE)
