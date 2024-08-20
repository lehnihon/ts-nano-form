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

  const getValue = () => {
    return _storeValue.get();
  };

  const getError = () => {
    return _storeError.get();
  };

  const getMasked = (maskRule: string) => {
    return mask(_storeValue.get() ?? "", maskRule, rulesMask);
  };

  const getUnmasked = () => {
    return unmask(_storeValue.get() ?? "", rulesMask);
  };

  const getMoneyMasked = () => {
    return maskMoney(_storeValue.get() ?? "", rulesMoney);
  };

  const getMoneyUnmasked = () => {
    return unmaskMoney(_storeValue.get() ?? "", rulesMoney);
  };

  const onChange = (value: string) => {
    _storeValue.set(value);
  };

  const onChangeMask = (value: string, maskRule: string) => {
    _storeValue.set(mask(value, maskRule, rulesMask));
  };

  const onChangeMoney = (value: string) => {
    _storeValue.set(maskMoney(value, rulesMoney));
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
