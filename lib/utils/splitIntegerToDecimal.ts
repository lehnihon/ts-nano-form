import { onlyDigits } from ".";
import { MoneyOptions } from "../types";
import allowNegativeRule from "./allowNegativeRule";

export const splitIntegerDecimal = (value: string, rules: MoneyOptions) => {
  const minusSign = allowNegativeRule(value, rules);
  const numberParts = value.split(rules.decimal);
  const decimalPart = onlyDigits(numberParts.pop());
  const integerPart = onlyDigits(numberParts.join(""));
  return { integerPart: `${minusSign}${integerPart}`, decimalPart };
};

export default splitIntegerDecimal;
