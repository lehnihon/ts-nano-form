import { DEFAULT_MONEY_OPTIONS } from "../constants";
import { MoneyOptions } from "../types";

const validateMoneyRules = (rules?: MoneyOptions) => {
  if (!rules) return DEFAULT_MONEY_OPTIONS;
  return {
    ...rules,
    precision: !rules.precision || rules.precision < 0 ? 0 : rules.precision,
    decimal: !rules.decimal ? "." : rules.decimal,
    allowNegative: !rules?.allowNegative ? false : true,
  };
};

export default validateMoneyRules;
