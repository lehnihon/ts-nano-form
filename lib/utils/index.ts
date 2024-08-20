import { Store } from "../types";
import { DEFAULT_MONEY_OPTIONS } from "../constants";
import { MoneyOptions, MapOptions, MaskOptions } from "../types";
import createStore from "../store";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const instanceOfStore = (object: any): object is Store => {
  return "subscribe" in object;
};

export const splitName = (
  name: string,
  values: Record<string, unknown>
): Store => {
  const nameSplit = name.split(".");
  if (nameSplit.length === 1) {
    return values[name] as Store;
  }
  const firstName = nameSplit.shift();
  return splitNameRecursive(values[firstName!], nameSplit);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const splitNameRecursive = (values: any, nameSplit: string[]): any => {
  const firstName = nameSplit.shift();
  if (!firstName) return;
  return instanceOfStore(values[firstName])
    ? values[firstName!]
    : splitNameRecursive(values[firstName!], nameSplit);
};

export const getValueStores = <T>(value: unknown): unknown => {
  if (value instanceof Array) {
    return value.map((item) =>
      Object.keys(item).reduce((acc, key) => {
        return { ...acc, [key]: getValueStores(item[key]) };
      }, {} as T)
    );
  }
  return (value as Store).get();
};

export const setErrorStores = (value: unknown, error: unknown): unknown => {
  if (value instanceof Array) {
    return value.map((item, i) =>
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      Object.keys(item).map((j: any) => {
        setErrorStores(item[j], (error as [])[i][j]);
      })
    );
  }
  return (value as Store).set(`${error || ""}`);
};

export const subscribeStores = (
  value: unknown,
  listener: (value: string, prevValue: string) => void
): unknown =>
  value instanceof Array
    ? value.map((item) =>
        Object.keys(item).map((key) =>
          subscribeStores(item[`${key}`], listener)
        )
      )
    : (value as Store).subscribe(listener);

export const initStores = (
  value: unknown,
  hasInitalValues: boolean = false
): unknown => {
  if (value instanceof Array) {
    return value.map((item) =>
      Object.keys(item).reduce(
        (acc, key) => ({ ...acc, [key]: initStores(item[key]) }),
        {}
      )
    );
  }
  return hasInitalValues ? createStore(`${value}`) : createStore();
};

export const transformMask = (
  value: string,
  acc: string,
  option: MapOptions
) => {
  if (option?.transform) {
    const { prevValue, newChar } = option.transform(acc, value);
    return prevValue + newChar;
  }
  return acc + value;
};

export const allowNegativeRule = (value: string, rules: MoneyOptions) => {
  if (!rules.allowNegative) return "";
  return value.match(/-/g)?.length === 1 && value.match(/\+/g)?.length !== 1
    ? "-"
    : "";
};

export const applyMask = (
  value: string,
  maskRule: string,
  rules: MaskOptions
) => {
  let i = 0;
  return [...maskRule].reduce((acc, char) => {
    const currentValue = value[i];
    if (!currentValue) return acc;
    if (currentValue === char) return ++i, acc + char;
    const currentRule = rules.map.get(char);
    if (!currentRule) return acc + char;
    return currentRule.pattern.test(currentValue)
      ? (++i, transformMask(currentValue, acc, currentRule))
      : ((i = -1), acc);
  }, "");
};

export const applyMaskMoney = (
  value: number,
  sign: string,
  rules: MoneyOptions
) => {
  return `${sign}${rules.prefix || ""}${value
    .toFixed(rules.precision)
    .replace(".", rules.decimal)
    .replace(
      regexMaskMoney(rules.precision, rules.decimal),
      `$1${rules.thousands}`
    )}`;
};

export const regexMaskMoney = (precision: number, decimal: string) =>
  new RegExp(
    precision === 0
      ? "(\\d{1,3})(?=(\\d{3})+(?!\\d))"
      : `(\\d)(?=(\\d{3})+${scapeRegex(decimal)})`,
    "g"
  );

export const splitIntegerDecimal = (value: string, rules: MoneyOptions) => {
  const minusSign = allowNegativeRule(value, rules);
  const numberParts = value.split(rules.decimal);
  const decimalPart = onlyDigits(numberParts.pop());
  const integerPart = onlyDigits(numberParts.join(""));
  return { integerPart: `${minusSign}${integerPart}`, decimalPart };
};

export const clearMoneyValue = (value: string, precision: number) =>
  Number(onlyDigits(value)) / Number(`1${"".padEnd(precision, "0")}`);

export const validateMoneyRules = (rules?: MoneyOptions) => {
  if (!rules) return DEFAULT_MONEY_OPTIONS;
  return {
    ...rules,
    precision: !rules.precision || rules.precision < 0 ? 0 : rules.precision,
    decimal: !rules.decimal ? "." : rules.decimal,
    allowNegative: !rules?.allowNegative ? false : true,
  };
};

export const scapeRegex = (value: string) =>
  value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

export const removeSpecialChar = (value?: string) =>
  (value || "").replace(/[^a-zA-Z0-9]/g, "");

export const onlyDigits = (value?: string) =>
  (value || "").replace(/[^0-9]/g, "");
