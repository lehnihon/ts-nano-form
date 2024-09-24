import { MoneyOptions } from "../types";

export const allowNegativeRule = (value: string, rules: MoneyOptions) => {
  if (!rules.allowNegative) return "";
  return value.match(/-/g)?.length === 1 && value.match(/\+/g)?.length !== 1
    ? "-"
    : "";
};

export default allowNegativeRule;
