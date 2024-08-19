import {
  getRecord,
  getRecursive,
  setRecursive,
  stripName,
  subscribeRecursive,
} from "../utils";

const createForm = <T extends Record<string, unknown>>(initialValues: T) => {
  const values: Record<string, unknown> = Object.keys(initialValues).reduce(
    (acc, key) => ({ ...acc, [key]: getRecord(initialValues[key], true) }),
    {}
  );
  const errors: Record<string, unknown> = Object.keys(initialValues).reduce(
    (acc, key) => ({ ...acc, [key]: getRecord(initialValues[key]) }),
    {}
  );

  const getValues = () =>
    Object.keys(values).reduce((acc, key) => {
      return { ...acc, [key]: getRecursive<T>(values[key]) };
    }, {} as T);

  const getErrors = () =>
    Object.keys(errors).reduce((acc, key) => {
      return { ...acc, [key]: getRecursive<T>(errors[key]) };
    }, {} as T);

  const subscribeValues = (
    listener: (value: string, prevValue: string) => void
  ) =>
    Object.values(values).map((key) =>
      subscribeRecursive(values[`${key}`], listener)
    );

  const subscribeErrors = (
    listener: (value: string, prevValue: string) => void
  ) =>
    Object.values(errors).map((key) =>
      subscribeRecursive(errors[`${key}`], listener)
    );

  const submit = (validate: (values: T) => T) => {
    const storeValues = getValues();
    const newErrors = validate(storeValues);
    Object.keys(errors).map((key) => {
      setRecursive(errors[key], newErrors[key]);
    });
  };

  const field = (name: string) => {
    const storeValue = stripName(name, values);
    const storeError = stripName(name, errors);

    return {
      storeValue,
      storeError,
    };
  };

  return {
    getValues,
    getErrors,
    subscribeValues,
    subscribeErrors,
    field,
    submit,
  };
};

export default createForm;
