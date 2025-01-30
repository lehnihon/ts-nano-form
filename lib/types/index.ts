/* eslint-disable @typescript-eslint/no-explicit-any */
export type NanoFormType = {
  mask: (value: string, maskRule: string | string[]) => string;
  unmask: (value: string) => string;
  maskMoney: (value: string) => string;
  unmaskMoney: (value: string) => string;
  getPlaceholder: (value: string) => string;
  createForm: CreateFormRef;
  getForm: (name: string) => CreateFormType<any> | undefined;
  setRulesMask: (rules: MaskOptions) => void;
  setRulesMoney: (rules: MoneyOptions) => void;
  getRules: () => {
    rulesMask: MaskOptions;
    rulesMoney: MoneyOptions;
  };
};

export type NanoFormProps = {
  options?: TsFormOptions;
};

export type CreateFormRef = <T>(params: {
  name: string;
  initialValues?: T;
  resolver?: (values: T) => Record<string, any> | undefined;
}) => CreateFormType<T>;

export type CreateFormType<T> = {
  name: string;
  getIsValid: () => boolean;
  getValues: () => T;
  getErrors: () => T;
  subscribeAllValues: (
    listener: (value: any, prevValue: any) => void
  ) => Record<string, any>;
  subscribeAllErrors: (
    listener: (value: any, prevValue: any) => void
  ) => Record<string, any>;
  reset: (values: Record<string, any>) => void;
  field: (name: string) => Field;
  submit: (fetcher: (values: T) => void) => void;
};

export type CreateFormProps<T> = {
  name: string;
  initialValues?: T;
  resolver?: (values: T) => Record<string, any> | undefined;
  options: {
    maskOptions: MaskOptions;
    moneyOptions: MoneyOptions;
  };
};

export type Field = {
  getValue: () => any;
  getMasked: (maskRule: string | string[]) => string;
  getUnmasked: () => string;
  getMoneyMasked: () => string;
  getMoneyUnmasked: () => string;
  getError: () => string;
  setError: (value: string) => string;
  setValue: (value: any) => any;
  setMasked: (value: string, maskRule: string | string[]) => string;
  setMoney: (value: string) => string;
  setMoneyMasked: (value: string) => string;
  subscribeValue: (
    listener: (value: any, prevValue: any) => void
  ) => () => void;
  subscribeError: (
    listener: (value: any, prevValue: any) => void
  ) => () => void;
};

export type Store = {
  subscribe: (listener: (value: any, prevValue: any) => void) => () => void;
  emit: (value: any, prevValue: any) => void;
  get: () => any;
  set: (newValue: any) => void;
};

export type TsFormOptions = {
  formOptions?: FormOptions;
  maskOptions?: MaskOptions;
  moneyOptions?: MoneyOptions;
};

export type FormOptions = {
  test: string;
};

export type MaskOptions = {
  map: Map<string, MapOptions>;
  beforeMask?: (value: string) => string;
  afterMask?: (value: string) => string;
};

export type MoneyOptions = {
  thousands: string;
  decimal: string;
  precision: number;
  prefix?: string;
  allowNegative?: boolean;
  beforeMask?: (value: string) => string;
  afterMask?: (value: string) => string;
};

export type MapOptions = {
  pattern: RegExp;
  transform?: (
    prevValue: string,
    newChar: string
  ) => { prevValue: string; newChar: string };
};
