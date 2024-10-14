/* eslint-disable @typescript-eslint/no-explicit-any */
export interface CreateForm<T> {
  getIsValid: () => boolean;
  getValues: () => T;
  getErrors: () => T;
  subscribeAllValues: (
    listener: (value: string, prevValue: string) => void
  ) => Record<string, any>;
  subscribeAllErrors: (
    listener: (value: string, prevValue: string) => void
  ) => Record<string, any>;
  reset: (values: Record<string, unknown>) => void;
  field: (name: string) => Field;
  submit: (fetcher: (values: T) => void) => void;
  setRulesMask: (rules: MaskOptions) => void;
  setRulesMoney: (rules: MoneyOptions) => void;
  getRules: () => {
    rulesMask: MaskOptions;
    rulesMoney: MoneyOptions;
  };
  mask: (value: string, maskRule: string | string[]) => string;
  unmask: (value: string) => string;
  maskMoney: (value: string) => string;
  unmaskMoney: (value: string) => string;
  getPlaceholder: (value: string) => string;
}

export interface CreateFormProps<T> {
  initialValues?: T;
  resolver?: (values: T) => Record<string, unknown> | undefined;
  options?: TsFormOptions;
}

export interface Field {
  getValue: () => string;
  getMasked: (maskRule: string | string[]) => string;
  getUnmasked: () => string;
  getMoneyMasked: () => string;
  getMoneyUnmasked: () => string;
  getError: () => string;
  setError: (value: string) => string;
  setValue: (value: string) => string;
  setMasked: (value: string, maskRule: string | string[]) => string;
  setMoney: (value: string) => string;
  setMoneyMasked: (value: string) => string;
  subscribeValue: (
    listener: (value: string, prevValue: string) => void
  ) => () => void;
  subscribeError: (
    listener: (value: string, prevValue: string) => void
  ) => () => void;
}

export interface Store {
  subscribe: (
    listener: (value: string, prevValue: string) => void
  ) => () => void;
  emit: (value: string, prevValue: string) => void;
  get: () => string;
  set: (newValue: string) => void;
}

export interface TsFormOptions {
  formOptions?: FormOptions;
  maskOptions?: MaskOptions;
  moneyOptions?: MoneyOptions;
}

export interface FormOptions {
  test: string;
}

export interface MaskOptions {
  map: Map<string, MapOptions>;
  beforeMask?: (value: string) => string;
  afterMask?: (value: string) => string;
}

export interface MoneyOptions {
  thousands: string;
  decimal: string;
  precision: number;
  prefix?: string;
  allowNegative?: boolean;
  beforeMask?: (value: string) => string;
  afterMask?: (value: string) => string;
}

export interface MapOptions {
  pattern: RegExp;
  transform?: (
    prevValue: string,
    newChar: string
  ) => { prevValue: string; newChar: string };
}
