import { Store } from "../types";

const createStore = (initial?: string): Store => {
  let _value = initial ?? "";
  let _listeners: Array<(value: string, prevValue: string) => void> = [];

  const subscribe = (listener: (value: string, prevValue: string) => void) => {
    _listeners = [..._listeners, listener];

    return () => {
      _listeners = _listeners.filter((l) => l !== listener);
    };
  };

  const emit = (value: string, prevValue: string) => {
    for (const listener of _listeners) {
      listener(value, prevValue);
    }
  };

  const get = () => {
    return _value;
  };

  const set = (newValue: string) => {
    const prevValue = _value;
    _value = newValue;
    emit(newValue, prevValue);
  };

  return {
    subscribe,
    emit,
    get,
    set,
  };
};

export default createStore;
