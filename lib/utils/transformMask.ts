import { MapOptions } from "../types";

const transformMask = (value: string, acc: string, option: MapOptions) => {
  if (option?.transform) {
    const { prevValue, newChar } = option.transform(acc, value);
    return prevValue + newChar;
  }
  return acc + value;
};

export default transformMask;
