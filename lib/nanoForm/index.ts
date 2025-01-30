/* eslint-disable @typescript-eslint/no-explicit-any */
import { DEFAULT_MASK_OPTIONS } from "../constants";
import createForm from "../form";
import { getPlaceholder, mask, maskMoney, unmask, unmaskMoney } from "../mask";
import {
  MaskOptions,
  MoneyOptions,
  NanoFormType,
  CreateFormType,
  CreateFormRef,
  NanoFormProps,
} from "../types";
import validateMoneyRules from "../utils/validateMoneyRules";

const NanoForm = (params?: NanoFormProps): NanoFormType => {
  const _formList: CreateFormType<any>[] = [];
  let _rulesMask = params?.options?.maskOptions ?? DEFAULT_MASK_OPTIONS;
  let _rulesMoney = validateMoneyRules(params?.options?.moneyOptions);

  const addForm = (form: CreateFormType<any>) => {
    if (!_formList.find((item) => item.name === form.name))
      _formList.push(form);
  };

  const getForm = (name: string) => {
    const findForm = _formList.find((item) => item.name === name);
    if (findForm) return findForm;
    throw new Error("Form not found, check if the name of this form exists");
  };

  const setRulesMask = (rules: MaskOptions) => {
    _rulesMask = rules;
  };

  const setRulesMoney = (rules: MoneyOptions) => {
    _rulesMoney = validateMoneyRules(rules);
  };

  const getRules = () => {
    return { rulesMask: _rulesMask, rulesMoney: _rulesMoney };
  };

  const handleCreateForm: CreateFormRef = (params) => {
    const createdForm = createForm({
      ...params,
      options: { maskOptions: _rulesMask, moneyOptions: _rulesMoney },
    });
    addForm(createdForm);
    return createdForm;
  };

  return {
    mask: (value, maskRule) => mask(value, maskRule, _rulesMask),
    unmask: (value) => unmask(value, _rulesMask),
    maskMoney: (value) => maskMoney(value, _rulesMoney),
    unmaskMoney: (value) => unmaskMoney(value, _rulesMoney),
    getPlaceholder: (value) => getPlaceholder(value, _rulesMask),
    createForm: handleCreateForm,
    getForm,
    setRulesMask,
    setRulesMoney,
    getRules,
  };
};

export default NanoForm;
