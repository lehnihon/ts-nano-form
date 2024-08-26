import { DEFAULT_MASK_OPTIONS } from "../constants";
import {
  getMask,
  getPlaceholder,
  mask,
  maskMoney,
  unmask,
  unmaskMoney,
} from "../mask";
import { MaskOptions, MoneyOptions, TsFormOptions } from "../types";
import {
  initStores,
  getValueStores,
  subscribeStores,
  validateMoneyRules,
  findStoreByName,
  resetField,
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
  let _rulesMask = options?.maskOptions ?? DEFAULT_MASK_OPTIONS;
  let _rulesMoney = validateMoneyRules(options?.moneyOptions);

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

  const reset = (values: Record<string, unknown>) =>
    Object.keys(values).map((key) => resetField(values[`${key}`]));

  const submit = (validate: (values: T) => T | undefined) => {
    const storeValues = getValues();
    const newErrors = validate(storeValues);
    reset(_errors);
    if (newErrors)
      Object.keys(newErrors).map((key) => {
        const store = findStoreByName(key, _errors);
        store.set(newErrors[key] ?? "");
      });
  };

  const setRulesMask = (rules: MaskOptions) => {
    _rulesMask = rules;
  };

  const setRulesMoney = (rules: MoneyOptions) => {
    _rulesMoney = validateMoneyRules(rules);
  };

  const getRules = () => {
    return { _rulesMask, _rulesMoney };
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
    setRulesMask,
    setRulesMoney,
    getRules,
  };
};

export default createForm;
