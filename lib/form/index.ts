/* eslint-disable @typescript-eslint/no-explicit-any */
import createStore from "../store";
import { CreateFormType, CreateFormProps } from "../types";
import { toString } from "../utils";
import findStoreByPath from "../utils/findStoreByPath";
import instanceOfStore from "../utils/instanceOfStore";
import iterateStore from "../utils/iterateStore";
import field from "./field";

const createForm = <T>(params: CreateFormProps<T>): CreateFormType<T> => {
  const _values = iterateStore(params?.initialValues || {}, (value) =>
    createStore(value)
  );
  const _errors = iterateStore(params?.initialValues || {}, () =>
    createStore()
  );
  const _rulesMask = params.options.maskOptions;
  const _rulesMoney = params.options.moneyOptions;
  let _isValid = false;

  const getValues = () =>
    iterateStore(_values, (value) => instanceOfStore(value) && value.get());

  const getErrors = () =>
    iterateStore(
      _errors,
      (value) => instanceOfStore(value) && toString(value.get())
    );

  const subscribeAllValues = (listener: (value: any, prevValue: any) => void) =>
    iterateStore(
      _values,
      (value) => instanceOfStore(value) && value.subscribe(listener)
    );

  const subscribeAllErrors = (listener: (value: any, prevValue: any) => void) =>
    iterateStore(
      _errors,
      (value) => instanceOfStore(value) && value.subscribe(listener)
    );

  const reset = (values: Record<string, any>) => {
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
    field: (name) => field(name, _values, _errors, _rulesMask, _rulesMoney),
    submit,
  };
};

export default createForm;
