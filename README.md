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

## Documentation

Visit https://lehnihon.github.io/ts-nano-form-docs/ to view the documentation.

## Getting Started

### Install

```bash
npm install ts-nano-form
```

### Quickstart

First initialize the main NanoForm object.

```tsx
import NanoForm from "ts-nano-form";

const TsNanoForm = NanoForm();
```

For each form, create a component with the createForm method.
Validation is done by the resolver.

```tsx
import NanoForm from "ts-nano-form";

type FormUserType = {
  name: string;
};

const resolver = (data: any) => {
  const errors = {
    name: "",
  };
  if (!data.name) errors.name = "name required";

  return errors;
};

const TsNanoForm = NanoForm();
const { createForm } = TsNanoForm;
createForm<FormUserType>({
  name: "form-user",
  resolver,
});
export default TsNanoForm;
```

The fields are filled in and returned by the setValue and getValue methods

```tsx
import TsNanoForm from "./nanoForm";

const { field } = TsNanoForm.getForm("form-user");
const { getValue, setValue } = field("name");

setValue("user name");
getValue();
//user name
```

The submit method validate all fields by the resolver and the fields are returned via the data parameter.

```tsx
import TsNanoForm from "./nanoForm";

const { submit } = TsNanoForm.getForm("form-user");

submit((data) => console.log("submit", data));
```

## License

[MIT](/LICENSE)
