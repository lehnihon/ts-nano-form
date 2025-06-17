/* eslint-disable @typescript-eslint/no-explicit-any */
import { DEFAULT_FORM_OPTIONS, DEFAULT_MASK_OPTIONS } from "../constants";
import createForm from "../form";
import { getPlaceholder, mask, maskMoney, unmask, unmaskMoney } from "../mask";
import {
  NanoFormType,
  CreateFormType,
  CreateFormRef,
  NanoFormProps,
} from "../types";
import validateMoneyRules from "../utils/validateMoneyRules";

const NanoForm = (params?: NanoFormProps): NanoFormType => {
  const _formList: CreateFormType<any>[] = [];
  const _formOptions = params?.formOptions ?? DEFAULT_FORM_OPTIONS;
  const _maskOptions = params?.maskOptions ?? DEFAULT_MASK_OPTIONS;
  const _moneyOptions = validateMoneyRules(params?.moneyOptions);

  const addForm = (form: CreateFormType<any>) => {
    if (!_formList.find((item) => item.name === form.name))
      _formList.push(form);
  };

  const getForm = (name: string) => {
    const findForm = _formList.find((item) => item.name === name);
    if (findForm) return findForm;
    throw new Error("Form not found, check if the name of this form exists");
  };

  const handleCreateForm: CreateFormRef = (params) => {
    const createdForm = createForm({
      ...params,
      options: {
        formOptions: _formOptions,
        maskOptions: _maskOptions,
        moneyOptions: _moneyOptions,
      },
    });
    addForm(createdForm);
    return createdForm;
  };

  return {
    mask: (value, maskRule, optional) =>
      mask(value, maskRule, optional ? optional : _maskOptions),
    unmask: (value, optional) =>
      unmask(value, optional ? optional : _maskOptions),
    maskMoney: (value, optional) =>
      maskMoney(value, optional ? optional : _moneyOptions),
    unmaskMoney: (value, optional) =>
      unmaskMoney(value, optional ? optional : _moneyOptions),
    getPlaceholder: (value, optional) =>
      getPlaceholder(value, optional ? optional : _maskOptions),
    createForm: handleCreateForm,
    getForm,
  };
};

export default NanoForm;
