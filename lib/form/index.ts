import { DEFAULT_MASK_OPTIONS } from "../constants";
import {
  getMask,
  getPlaceholder,
  mask,
  maskMoney,
  unmask,
  unmaskMoney,
} from "../mask";
import createStore from "../store";
import { MaskOptions, MoneyOptions, TsFormOptions } from "../types";
import {
  validateMoneyRules,
  findStoreByPath,
  iterateStore,
  instanceOfStore,
} from "../utils";
import field from "./field";

const createForm = <T extends Record<string, unknown>>(
  initialValues: T,
  options?: TsFormOptions
) => {
  const _values: Record<string, unknown> = iterateStore(
    initialValues,
    (value) => createStore(value)
  );
  const _errors: Record<string, unknown> = iterateStore(initialValues, () =>
    createStore()
  );
  let _rulesMask = options?.maskOptions ?? DEFAULT_MASK_OPTIONS;
  let _rulesMoney = validateMoneyRules(options?.moneyOptions);

  const getValues = () =>
    iterateStore(_values, (value) => instanceOfStore(value) && value.get());

  const getErrors = () =>
    iterateStore(_errors, (value) => instanceOfStore(value) && value.get());

  const subscribeAllValues = (
    listener: (value: string, prevValue: string) => void
  ) =>
    iterateStore(
      _values,
      (value) => instanceOfStore(value) && value.subscribe(listener)
    );

  const subscribeAllErrors = (
    listener: (value: string, prevValue: string) => void
  ) =>
    iterateStore(
      _errors,
      (value) => instanceOfStore(value) && value.subscribe(listener)
    );

  const reset = (values: Record<string, unknown>) =>
    iterateStore(values, (value) => instanceOfStore(value) && value.set(""));

  const submit = (
    validate: (values: T) => Record<string, unknown> | undefined
  ) => {
    const storeValues = getValues();
    const newErrors = validate(storeValues);
    reset(_errors);
    if (newErrors)
      Object.keys(newErrors).map((key) => {
        const store = findStoreByPath(_errors, key);
        store.set(newErrors[key]);
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
