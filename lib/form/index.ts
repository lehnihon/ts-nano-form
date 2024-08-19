import { DEFAULT_MASK_OPTIONS, DEFAULT_MONEY_OPTIONS } from "../constants";
import { TsFormOptions } from "../types";
import {
  getRecord,
  getRecursive,
  setRecursive,
  subscribeRecursive,
} from "../utils";
import field from "./field";

const createForm = <T extends Record<string, unknown>>(
  initialValues: T,
  options?: TsFormOptions
) => {
  const _values: Record<string, unknown> = Object.keys(initialValues).reduce(
    (acc, key) => ({ ...acc, [key]: getRecord(initialValues[key], true) }),
    {}
  );
  const _errors: Record<string, unknown> = Object.keys(initialValues).reduce(
    (acc, key) => ({ ...acc, [key]: getRecord(initialValues[key]) }),
    {}
  );
  const _rulesMask = options?.maskOptions ?? DEFAULT_MASK_OPTIONS;
  const _rulesMoney = options?.moneyOptions ?? DEFAULT_MONEY_OPTIONS;

  const getValues = () =>
    Object.keys(_values).reduce((acc, key) => {
      return { ...acc, [key]: getRecursive<T>(_values[key]) };
    }, {} as T);

  const getErrors = () =>
    Object.keys(_errors).reduce((acc, key) => {
      return { ...acc, [key]: getRecursive<T>(_errors[key]) };
    }, {} as T);

  const subscribeValues = (
    listener: (value: string, prevValue: string) => void
  ) =>
    Object.values(_values).map((key) =>
      subscribeRecursive(_values[`${key}`], listener)
    );

  const subscribeErrors = (
    listener: (value: string, prevValue: string) => void
  ) =>
    Object.values(_errors).map((key) =>
      subscribeRecursive(_errors[`${key}`], listener)
    );

  const submit = (validate: (values: T) => T) => {
    const storeValues = getValues();
    const newErrors = validate(storeValues);
    Object.keys(_errors).map((key) => {
      setRecursive(_errors[key], newErrors[key]);
    });
  };

  return {
    getValues,
    getErrors,
    subscribeValues,
    subscribeErrors,
    field: (name: string) =>
      field(name, _values, _errors, _rulesMask, _rulesMoney),
    submit,
  };
};

export default createForm;
