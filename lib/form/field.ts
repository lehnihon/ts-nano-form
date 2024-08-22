import { mask, maskMoney, unmask, unmaskMoney } from "../mask";
import { MaskOptions, MoneyOptions } from "../types";
import { splitName } from "../utils";

const field = (
  name: string,
  values: Record<string, unknown>,
  errors: Record<string, unknown>,
  rulesMask: MaskOptions,
  rulesMoney: MoneyOptions
) => {
  const _storeValue = splitName(name, values);
  const _storeError = splitName(name, errors);

  const getValue = (): string => {
    return _storeValue.get() || "";
  };

  const getError = (): string => {
    return _storeError.get() || "";
  };

  const getMasked = (maskRule: string): string => {
    return mask(_storeValue.get() ?? "", maskRule, rulesMask);
  };

  const getUnmasked = (): string => {
    return unmask(_storeValue.get() ?? "", rulesMask);
  };

  const getMoneyMasked = (): string => {
    return maskMoney(_storeValue.get() ?? "", rulesMoney);
  };

  const getMoneyUnmasked = (): string => {
    return unmaskMoney(_storeValue.get() ?? "", rulesMoney);
  };

  const onChange = (value: string): string => {
    _storeValue.set(value);
    return getValue();
  };

  const onChangeMask = (value: string, maskRule: string): string => {
    _storeValue.set(mask(value, maskRule, rulesMask));
    return getValue();
  };

  const onChangeMoney = (value: string): string => {
    _storeValue.set(maskMoney(value, rulesMoney));
    return getValue();
  };

  return {
    storeValue: _storeValue,
    storeError: _storeError,
    getValue,
    getMasked,
    getUnmasked,
    getMoneyMasked,
    getMoneyUnmasked,
    getError,
    onChange,
    onChangeMask,
    onChangeMoney,
  };
};

export default field;
