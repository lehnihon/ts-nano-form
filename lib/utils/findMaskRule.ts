import { unmask } from "../mask";
import { MaskOptions } from "../types";

const findMaskRule = (
  value: string,
  maskRule: string | string[],
  rules: MaskOptions
) =>
  Array.isArray(maskRule)
    ? maskRule
        .sort((a, b) => a.length - b.length)
        .find(
          (rule) => unmask(rule, rules).length >= unmask(value, rules).length
        ) ||
      maskRule.pop() ||
      ""
    : maskRule;

export default findMaskRule;
