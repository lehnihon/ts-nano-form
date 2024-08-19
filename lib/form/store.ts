import { Store } from "../types";

const createStore = (initial?: string): Store => {
  let value = initial ?? "";
  let listeners: Array<(value: string, prevValue: string) => void> = [];

  const subscribe = (listener: (value: string, prevValue: string) => void) => {
    listeners = [...listeners, listener];

    return () => {
      listeners = listeners.filter((l) => l !== listener);
    };
  };

  const emit = (value: string, prevValue: string) => {
    for (const listener of listeners) {
      listener(value, prevValue);
    }
  };

  const get = () => {
    return value;
  };

  const set = (newValue: string) => {
    const prevValue = value;
    value = newValue;
    emit(newValue, prevValue);
  };

  return { subscribe, emit, get, set };
};

export default createStore;
