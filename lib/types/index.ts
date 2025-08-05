/* eslint-disable @typescript-eslint/no-explicit-any */
export type NanoFormType = {
  mask: (
    value: string,
    maskRule: string | string[],
    maskOptions?: MaskOptions
  ) => string;
  unmask: (value: string, maskOptions?: MaskOptions) => string;
  maskMoney: (value: string, moneyOptions?: MoneyOptions) => string;
  unmaskMoney: (value: string, moneyOptions?: MoneyOptions) => string;
  getPlaceholder: (value: string, maskOptions?: MaskOptions) => string;
  createForm: CreateFormRef;
  getForm: (name: string) => CreateFormType<any>;
};

export type NanoFormProps = {
  maskOptions?: MaskOptions;
  moneyOptions?: MoneyOptions;
  formOptions?: FormOptions;
};

export type CreateFormRef = <T>(params: {
  name: string;
  initialValues?: Record<string, any>;
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
  clearValues: () => void;
  reset: (values: Record<string, any>) => void;
  resetValues: () => void;
  resetErrors: () => void;
  field: (name: string) => Field;
  submit: (fetcher: (values: T) => void) => void;
};

export type CreateFormProps<T> = {
  name: string;
  initialValues?: Record<string, any>;
  resolver?: (values: T) => Record<string, any> | undefined;
  options: {
    formOptions: FormOptions;
    maskOptions: MaskOptions;
    moneyOptions: MoneyOptions;
  };
};

export type Field = {
  getValue: () => any;
  getValueStore: () => Store;
  getMasked: (maskRule: string | string[]) => string;
  getUnmasked: () => string;
  getMoneyMasked: () => string;
  getMoneyUnmasked: () => string;
  getError: () => string;
  getErrorStore: () => Store;
  setError: (value: string) => string;
  setValue: (value: any) => any;
  setUnmasked: (value: any) => string;
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

export type FormOptions = {
  showLogErrors: boolean;
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
