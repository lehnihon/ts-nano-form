import { DEFAULT_MASK_OPTIONS, DEFAULT_MONEY_OPTIONS } from "../constants";
import {
  getMask,
  getPlaceholder,
  mask,
  maskMoney,
  unmask,
  unmaskMoney,
} from "../mask";
import { TsFormOptions } from "../types";
import {
  initStores,
  getValueStores,
  setErrorStores,
  subscribeStores,
} from "../utils";
import field from "./field";

const createForm = <T extends Record<string, unknown>>(
  initialValues: T,
  options?: TsFormOptions
) => {
  const _values: Record<string, unknown> = Object.keys(initialValues).reduce(
    (acc, key) => ({ ...acc, [key]: initStores(initialValues[key], true) }),
    {}
  );
  const _errors: Record<string, unknown> = Object.keys(initialValues).reduce(
    (acc, key) => ({ ...acc, [key]: initStores(initialValues[key]) }),
    {}
  );
  const _rulesMask = options?.maskOptions ?? DEFAULT_MASK_OPTIONS;
  const _rulesMoney = options?.moneyOptions ?? DEFAULT_MONEY_OPTIONS;

  const getValues = () =>
    Object.keys(_values).reduce((acc, key) => {
      return { ...acc, [key]: getValueStores<T>(_values[key]) };
    }, {} as T);

  const getErrors = () =>
    Object.keys(_errors).reduce((acc, key) => {
      return { ...acc, [key]: getValueStores<T>(_errors[key]) };
    }, {} as T);

  const subscribeAllValues = (
    listener: (value: string, prevValue: string) => void
  ) =>
    Object.keys(_values).map((key) =>
      subscribeStores(_values[`${key}`], listener)
    );

  const subscribeAllErrors = (
    listener: (value: string, prevValue: string) => void
  ) =>
    Object.keys(_errors).map((key) =>
      subscribeStores(_errors[`${key}`], listener)
    );

  const submit = (validate: (values: T) => T) => {
    const storeValues = getValues();
    const newErrors = validate(storeValues);
    Object.keys(_errors).map((key) => {
      setErrorStores(_errors[key], newErrors[key]);
    });
  };

  return {
    getValues,
    getErrors,
    subscribeAllValues,
    subscribeAllErrors,
    field: (name: string) =>
      field(name, _values, _errors, _rulesMask, _rulesMoney),
    submit,
    mask: (value: string, maskRule: string) =>
      mask(value, maskRule, _rulesMask),
    unmask: (value: string) => unmask(value, _rulesMask),
    maskMoney: (value: string) => maskMoney(value, _rulesMoney),
    unmaskMoney: (value: string) => unmaskMoney(value, _rulesMoney),
    getPlaceholder: (value: string) => getPlaceholder(value, _rulesMask),
    getMask,
  };
};

export default createForm;
