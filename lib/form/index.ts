import { DEFAULT_MASK_OPTIONS } from "../constants";
import { getPlaceholder, mask, maskMoney, unmask, unmaskMoney } from "../mask";
import createStore from "../store";
import {
  CreateForm,
  CreateFormProps,
  MaskOptions,
  MoneyOptions,
} from "../types";
import { toString } from "../utils";
import findStoreByPath from "../utils/findStoreByPath";
import instanceOfStore from "../utils/instanceOfStore";
import iterateStore from "../utils/iterateStore";
import validateMoneyRules from "../utils/validateMoneyRules";
import field from "./field";

const createForm = <T extends Record<string, unknown>>(
  params?: CreateFormProps<T>
): CreateForm<T> => {
  const _values = iterateStore(params?.initialValues || ({} as T), (value) =>
    createStore(value)
  );
  const _errors = iterateStore(params?.initialValues || ({} as T), () =>
    createStore()
  );
  let _isValid = false;
  let _rulesMask = params?.options?.maskOptions ?? DEFAULT_MASK_OPTIONS;
  let _rulesMoney = validateMoneyRules(params?.options?.moneyOptions);

  const getValues = () =>
    iterateStore(_values, (value) => instanceOfStore(value) && value.get());

  const getErrors = () =>
    iterateStore(
      _errors,
      (value) => instanceOfStore(value) && toString(value.get())
    );

  const subscribeAllValues = (
    listener: (value: unknown, prevValue: unknown) => void
  ) =>
    iterateStore(
      _values,
      (value) => instanceOfStore(value) && value.subscribe(listener)
    );

  const subscribeAllErrors = (
    listener: (value: unknown, prevValue: unknown) => void
  ) =>
    iterateStore(
      _errors,
      (value) => instanceOfStore(value) && value.subscribe(listener)
    );

  const reset = (values: Record<string, unknown>) => {
    iterateStore(values, (value) => instanceOfStore(value) && value.set(""));
  };

  const submit = (fetcher: (values: T) => void) => {
    const storeValues = getValues();
    const newErrors = params?.resolver
      ? params.resolver(storeValues) || {}
      : {};
    reset(_errors);
    _isValid = true;
    Object.keys(newErrors).map((key) => {
      if (!newErrors[key]) return;
      _isValid = false;
      const store = findStoreByPath(_errors, key);
      store.set(newErrors[key]);
    });
    if (_isValid) fetcher(storeValues);
  };

  const setRulesMask = (rules: MaskOptions) => {
    _rulesMask = rules;
  };

  const setRulesMoney = (rules: MoneyOptions) => {
    _rulesMoney = validateMoneyRules(rules);
  };

  const getRules = () => {
    return { rulesMask: _rulesMask, rulesMoney: _rulesMoney };
  };

  const getIsValid = () => {
    return _isValid;
  };

  return {
    getIsValid,
    getValues,
    getErrors,
    subscribeAllValues,
    subscribeAllErrors,
    reset,
    field: (name: string) =>
      field(name, _values, _errors, _rulesMask, _rulesMoney),
    submit,
    mask: (value: string, maskRule: string | string[]) =>
      mask(value, maskRule, _rulesMask),
    unmask: (value: string) => unmask(value, _rulesMask),
    maskMoney: (value: string) => maskMoney(value, _rulesMoney),
    unmaskMoney: (value: string) => unmaskMoney(value, _rulesMoney),
    getPlaceholder: (value: string) => getPlaceholder(value, _rulesMask),
    setRulesMask,
    setRulesMoney,
    getRules,
  };
};

export default createForm;
