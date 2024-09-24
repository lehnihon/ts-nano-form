import { scapeRegex } from ".";

const regexMaskMoney = (precision: number, decimal: string) =>
  new RegExp(
    precision === 0
      ? "(\\d{1,3})(?=(\\d{3})+(?!\\d))"
      : `(\\d)(?=(\\d{3})+${scapeRegex(decimal)})`,
    "g"
  );

export default regexMaskMoney;
