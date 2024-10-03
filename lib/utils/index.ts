/* eslint-disable @typescript-eslint/no-explicit-any */

export const has = (obj: Record<string, any>, path: string | string[]) =>
  !!pathToArray(path).reduce((prevObj, key) => prevObj && prevObj[key], obj);

export const get = (
  obj: Record<string, any>,
  path: string | string[],
  defValue?: string
) => pathToArray(path).reduce((acc, key) => acc && acc[key], obj) ?? defValue;

export const set = (
  obj: Record<string, any>,
  path: string | string[],
  value: any
) => {
  pathToArray(path).reduce((acc, key, i, path) => {
    if (acc[key] === undefined) acc[key] = isNumber(key) ? {} : [];
    if (i === path.length - 1) acc[key] = value;
    return acc[key];
  }, obj);
};

export const toFixed = (value: string, precision: number) =>
  !value || value === "0"
    ? `0${precision === 0 ? "" : ".".padEnd(precision + 1, "0")}`
    : Number(
        value.match(
          new RegExp("^-?\\d+(?:.\\d{0," + (precision || -1) + "})?")
        )![0]
      ).toFixed(precision);

export const pathToArray = (path: string | string[]) =>
  Array.isArray(path) ? path : path.match(/([^[.\]])+/g) || [];

export const scapeRegex = (value: string) =>
  value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

export const removeSpecialChar = (value?: string) =>
  (value || "").replace(/[^a-zA-Z0-9]/g, "");

export const onlyDigits = (value?: string) =>
  (value || "").replace(/[^0-9]/g, "");

export const isObject = (value: any) =>
  typeof value === "object" && value !== null;

export const hasDecimal = (value: number) => value % 1 != 0;

export const isNumber = (num: any) =>
  (typeof num === "number" || (typeof num === "string" && num.trim() !== "")) &&
  !isNaN(num as number);

export const copyObj = (obj: any) => JSON.parse(JSON.stringify(obj));
