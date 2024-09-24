import { MaskType } from "../enums";
import { MaskOptions, MoneyOptions } from "../types";
import { onlyDigits, removeSpecialChar, scapeRegex } from "../utils";
import allowNegativeRule from "../utils/allowNegativeRule";
import applyMask from "../utils/applyMask";
import applyMaskMoney from "../utils/applyMaskMoney";
import clearMoneyValue from "../utils/clearMoneyValue";
import splitIntegerDecimal from "../utils/splitIntegerToDecimal";

export const mask = (value: string, maskRule: string, rules: MaskOptions) => {
  const beforeValue = rules.beforeMask ? rules.beforeMask(value) : value;
  const masked = applyMask(beforeValue, maskRule, rules);
  const afterValue = rules.afterMask ? rules.afterMask(masked) : masked;

  return afterValue;
};

export const unmask = (value: string, rules: MaskOptions) => {
  const patterns = [...rules.map.values()].map((rule) => rule.pattern);
  return value.replace(
    new RegExp(
      `${[...value]
        .filter((char) => !patterns.find((pattern) => pattern.test(char)))
        .map((char) => scapeRegex(char))
        .join("|")}`,
      "g"
    ),
    ""
  );
};

export const maskMoney = (value: string, rules: MoneyOptions) => {
  const sign = allowNegativeRule(value, rules);
  const clearValue = clearMoneyValue(value, rules.precision);
  const beforeMask = rules.beforeMask
    ? rules.beforeMask(clearValue)
    : clearValue;
  const masked = applyMaskMoney(beforeMask, sign, rules);
  const afterMask = rules.afterMask ? rules.afterMask(masked) : masked;

  return afterMask;
};

export const unmaskMoney = (value: string, rules: MoneyOptions) => {
  if (!value) return "0";
  if (rules.precision === 0) return onlyDigits(value);
  const { integerPart, decimalPart } = splitIntegerDecimal(value, rules);
  return `${integerPart}.${decimalPart}`;
};

export const getMask = (value: string, type: MaskType) => {
  switch (type) {
    case MaskType.DOCUMENT_BR:
      return removeSpecialChar(value).length <= 11
        ? "000.000.000-00"
        : "00.000.000/0000-00";
    case MaskType.PHONE_BR:
      return removeSpecialChar(value).length <= 10
        ? "(00)0000-0000"
        : "(00)00000-0000";
    case MaskType.LICENSE_PLATE_BR:
      return "XXX-0Z00";
    case MaskType.ZIPCODE_BR:
      return "00000-000";
    default:
      return "";
  }
};

export const getPlaceholder = (maskRule: string, rules: MaskOptions) =>
  [...maskRule].reduce((acc, char) => {
    return rules.map.get(char) ? acc + "_" : acc + char;
  }, "");
