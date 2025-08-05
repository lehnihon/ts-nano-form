/* eslint-disable @typescript-eslint/no-explicit-any */
import createStore from "../store";
import { CreateFormType, CreateFormProps, Store } from "../types";
import flattenObject from "../utils/flattenObject";
import unflattenObject from "../utils/unflattenObject";
import field from "./field";

const createForm = <T>(params: CreateFormProps<T>): CreateFormType<T> => {
  const initialValues = flattenObject(params?.initialValues || {});
  const _values = Object.fromEntries(
    Object.entries(initialValues).map(([key, value]) => [
      key,
      createStore(value),
    ])
  );
  const _errors = Object.fromEntries(
    Object.entries(initialValues).map(([key]) => [key, createStore()])
  );
  const {
    formOptions: _rulesOptions,
    maskOptions: _rulesMask,
    moneyOptions: _rulesMoney,
  } = params.options;
  let _isValid = false;

  const getValues = (): T =>
    unflattenObject(
      Object.fromEntries(
        Object.entries(_values).map(([key, value]) => [key, value.get()])
      )
    );

  const getErrors = (): T =>
    unflattenObject(
      Object.fromEntries(
        Object.entries(_errors).map(([key, value]) => [key, value.get()])
      )
    );

  const getValueStore = (name: string): Store =>
    name in _values ? _values[name] : (_values[name] = createStore());

  const getErrorStore = (name: string): Store =>
    name in _errors ? _errors[name] : (_errors[name] = createStore());

  const subscribeAllValues = (listener: (value: any, prevValue: any) => void) =>
    Object.values(_values).map((value: Store) => value.subscribe(listener));

  const subscribeAllErrors = (listener: (value: any, prevValue: any) => void) =>
    Object.values(_errors).map((value: Store) => value.subscribe(listener));

  const clearValues = () =>
    Object.keys(_values).map((key) => _values[key].set(undefined));

  const reset = (values: Record<string, any>) =>
    Object.keys(values).map((key) => _values[key].set(values[key]));

  const resetValues = () =>
    Object.keys(_values).map((key) =>
      _values[key].set(initialValues[key] ?? undefined)
    );

  const resetErrors = () =>
    Object.values(_errors).map((value: Store) => value.set(undefined));

  const submit = (fetcher: (values: T) => void) => {
    const storeValues = getValues();
    validateSubmit(storeValues);
    return _isValid
      ? fetcher(storeValues)
      : _rulesOptions.showLogErrors && console.log(getErrors());
  };

  const validateSubmit = (storeValues: T) => {
    const newErrors = (params?.resolver && params.resolver(storeValues)) ?? {};
    _isValid = true;
    resetErrors();
    Object.keys(newErrors).map((key) => {
      if (!newErrors[key]) return;
      _isValid = false;
      getErrorStore(key).set(newErrors[key]);
    });
  };

  const getIsValid = () => {
    return _isValid;
  };

  return {
    name: params.name,
    getIsValid,
    getValues,
    getErrors,
    subscribeAllValues,
    subscribeAllErrors,
    clearValues,
    reset,
    resetValues,
    resetErrors,
    field: (name) =>
      field(
        () => getValueStore(name),
        () => getErrorStore(name),
        _rulesMask,
        _rulesMoney
      ),
    submit,
  };
};

export default createForm;
