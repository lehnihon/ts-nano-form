import { MaskOptions } from "../types";
import transformMask from "./transformMask";

const applyMask = (value: string, maskRule: string, rules: MaskOptions) => {
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

export default applyMask;
