import { onlyDigits } from ".";

const clearMoneyValue = (value: string, precision: number) =>
  Number(onlyDigits(value)) / Number(`1${"".padEnd(precision, "0")}`);

export default clearMoneyValue;
