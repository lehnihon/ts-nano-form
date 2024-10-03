import { hasDecimal, isNumber, onlyDigits, toFixed } from ".";

const clearMoneyValue = (value: string, precision: number) =>
  isNumber(value) && hasDecimal(Number(value))
    ? toFixed(value, precision)
    : toFixed(
        `${
          Number(onlyDigits(value)) / Number(`1${"".padEnd(precision, "0")}`)
        }`,
        precision
      );

export default clearMoneyValue;
