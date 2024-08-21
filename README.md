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
- Mask, unmask input texts, apply custom rules.
- Money functions.

![divider](./divider.png)

## Table of Contents

- [Getting Started](#getting-started)
- [TS Nano Form API](#ts-nano-form-api)
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

For each form create a component with the createForm method.

```tsx
type FormUserType = {
  name: string;
  document: string;
};

const FormUser = createForm<FormUserType>({
  name: "John Doe",
  document: "123456789",
});

export default FormUser;
```

You can access the value and error stores using the field method.

```tsx
import FormUser from "./FormUser";

const { field, submit } = FormUser;
const { storeValue, storeError } = field("name");
storeValue.get();
//John Doe
storeValue.set("Jane Doe");
storeValue.get();
//Jane Doe
```

The getValue method is a shortcut for storeValue.get() and onChange is a shortcut for storeValue.set().

To apply masks use onChangeMask or onChangeMoney

```tsx
const { getValue, onChange, onChangeMask, onChangeMoney } = field("document");
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

![divider](./divider.png)

## TS Nano Form API

Api

![divider](./divider.png)

## Customize

Customize

![divider](./divider.png)

## Examples

Practical use examples

![divider](./divider.png)

## License

[MIT](/LICENSE)
