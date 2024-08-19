export interface Store {
  subscribe: (
    listener: (value: string, prevValue: string) => void
  ) => () => void;
  emit: (value: string, prevValue: string) => void;
  get: () => string | undefined;
  set: (newValue: string) => void;
}
