/* eslint-disable @typescript-eslint/no-explicit-any */
import { mask, maskMoney, unmask, unmaskMoney } from "../mask";
import { Field, MaskOptions, MoneyOptions, Store } from "../types";
import { toString } from "../utils";
import findStoreByPath from "../utils/findStoreByPath";

const field = (
  name: string,
  values: Record<string, any>,
  errors: Record<string, any>,
  rulesMask: MaskOptions,
  rulesMoney: MoneyOptions
): Field => {
  const _storeValue = findStoreByPath(values, name) as Store;
  const _storeError = findStoreByPath(errors, name) as Store;

  const getValue = (): any => {
    return _storeValue.get();
  };

  const getError = (): string => {
    return toString(_storeError.get());
  };

  const getMasked = (maskRule: string | string[]): string => {
    return mask(
      unmask(toString(_storeValue.get()), rulesMask),
      maskRule,
      rulesMask
    );
  };

  const getUnmasked = (): string => {
    return unmask(toString(_storeValue.get()), rulesMask);
  };

  const getMoneyMasked = (): string => {
    return maskMoney(toString(_storeValue.get()), rulesMoney);
  };

  const getMoneyUnmasked = (): string => {
    return unmaskMoney(toString(_storeValue.get()), rulesMoney);
  };

  const setError = (value: string): string => {
    _storeError.set(value);
    return toString(getError());
  };

  const setValue = (value: any): any => {
    _storeValue.set(value);
    return getValue();
  };

  const setUnmasked = (value: any): any => {
    _storeValue.set(unmask(value, rulesMask));
    return getValue();
  };

  const setMasked = (value: string, maskRule: string | string[]): string => {
    _storeValue.set(mask(unmask(value, rulesMask), maskRule, rulesMask));
    return toString(getValue());
  };

  const setMoney = (value: string): string => {
    _storeValue.set(unmaskMoney(value, rulesMoney));
    return toString(getValue());
  };

  const setMoneyMasked = (value: string): string => {
    _storeValue.set(maskMoney(value, rulesMoney));
    return toString(getValue());
  };

  const subscribeValue = (listener: (value: any, prevValue: any) => void) =>
    _storeValue.subscribe(listener);

  const subscribeError = (listener: (value: any, prevValue: any) => void) =>
    _storeError.subscribe(listener);

  return {
    getValue,
    getMasked,
    getUnmasked,
    getMoneyMasked,
    getMoneyUnmasked,
    getError,
    setError,
    setValue,
    setUnmasked,
    setMasked,
    setMoney,
    setMoneyMasked,
    subscribeValue,
    subscribeError,
  };
};

export default field;
