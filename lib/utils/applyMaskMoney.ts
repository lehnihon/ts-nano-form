import { MoneyOptions } from "../types";
import regexMaskMoney from "./regexMaskMoney";

const applyMaskMoney = (value: string, sign: string, rules: MoneyOptions) =>
  `${sign}${rules.prefix || ""}${value
    .replace(".", rules.decimal)
    .replace(
      regexMaskMoney(rules.precision, rules.decimal),
      `$1${rules.thousands}`
    )}`;

export default applyMaskMoney;
