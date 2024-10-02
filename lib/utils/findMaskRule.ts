import { unmask } from "../mask";
import { MaskOptions } from "../types";

export const findMaskRule = (
  value: string,
  maskRule: string | string[],
  rules: MaskOptions
) => {
  if (Array.isArray(maskRule)) {
    maskRule.sort((a, b) => a.length - b.length);
    return (
      maskRule.find(
        (rule) => unmask(rule, rules).length >= unmask(value, rules).length
      ) ||
      maskRule.pop() ||
      ""
    );
  }
  return maskRule;
};
