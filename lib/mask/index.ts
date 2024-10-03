import { MaskOptions, MoneyOptions } from "../types";
import { scapeRegex } from "../utils";
import allowNegativeRule from "../utils/allowNegativeRule";
import applyMask from "../utils/applyMask";
import applyMaskMoney from "../utils/applyMaskMoney";
import clearMoneyValue from "../utils/clearMoneyValue";
import findMaskRule from "../utils/findMaskRule";

export const mask = (
  value: string,
  maskRule: string | string[],
  rules: MaskOptions
) => {
  const beforeValue = rules.beforeMask ? rules.beforeMask(value) : value;
  const masked = applyMask(
    beforeValue,
    findMaskRule(value, maskRule, rules),
    rules
  );
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
  const minusSign = allowNegativeRule(value, rules);
  return `${minusSign}${clearMoneyValue(value, rules.precision)}`;
};

export const getPlaceholder = (maskRule: string, rules: MaskOptions) =>
  [...maskRule].reduce((acc, char) => {
    return rules.map.get(char) ? acc + "_" : acc + char;
  }, "");
