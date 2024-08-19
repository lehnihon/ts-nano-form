export interface Store {
  subscribe: (
    listener: (value: string, prevValue: string) => void
  ) => () => void;
  emit: (value: string, prevValue: string) => void;
  get: () => string | undefined;
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
  beforeMask?: (value: number) => number;
  afterMask?: (value: string) => string;
}

export interface MapOptions {
  pattern: RegExp;
  transform?: (
    prevValue: string,
    newChar: string
  ) => { prevValue: string; newChar: string };
}
