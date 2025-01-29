/* eslint-disable @typescript-eslint/no-explicit-any */
import { DEFAULT_MASK_OPTIONS } from "../constants";
import createForm from "../form";
import { getPlaceholder, mask, maskMoney, unmask, unmaskMoney } from "../mask";
import {
  MaskOptions,
  MoneyOptions,
  NanoFormType,
  NanoFormProps,
  CreateFormType,
} from "../types";
import validateMoneyRules from "../utils/validateMoneyRules";

const NanoForm = (params?: NanoFormProps): NanoFormType => {
  let _currentForm: CreateFormType<any>;
  let _rulesMask = params?.options?.maskOptions ?? DEFAULT_MASK_OPTIONS;
  let _rulesMoney = validateMoneyRules(params?.options?.moneyOptions);

  const setCurrentForm = (form: CreateFormType<any>) => {
    _currentForm = form;
  };

  const getCurrentForm = () => _currentForm;

  const setRulesMask = (rules: MaskOptions) => {
    _rulesMask = rules;
  };

  const setRulesMoney = (rules: MoneyOptions) => {
    _rulesMoney = validateMoneyRules(rules);
  };

  const getRules = () => {
    return { rulesMask: _rulesMask, rulesMoney: _rulesMoney };
  };

  return {
    mask: (value, maskRule) => mask(value, maskRule, _rulesMask),
    unmask: (value) => unmask(value, _rulesMask),
    maskMoney: (value) => maskMoney(value, _rulesMoney),
    unmaskMoney: (value) => unmaskMoney(value, _rulesMoney),
    getPlaceholder: (value) => getPlaceholder(value, _rulesMask),
    createForm: (params) =>
      createForm({
        ...params,
        options: { maskOptions: _rulesMask, moneyOptions: _rulesMoney },
      }),
    setCurrentForm,
    getCurrentForm,
    setRulesMask,
    setRulesMoney,
    getRules,
  };
};

export default NanoForm;
