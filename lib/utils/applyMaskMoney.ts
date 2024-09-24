import { MoneyOptions } from "../types";
import regexMaskMoney from "./regexMaskMoney";

const applyMaskMoney = (value: number, sign: string, rules: MoneyOptions) =>
  `${sign}${rules.prefix || ""}${value
    .toFixed(rules.precision)
    .replace(".", rules.decimal)
    .replace(
      regexMaskMoney(rules.precision, rules.decimal),
      `$1${rules.thousands}`
    )}`;

export default applyMaskMoney;
