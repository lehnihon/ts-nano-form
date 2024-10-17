import { Store } from "../types";

const createStore = (initial?: unknown): Store => {
  let _value = initial;
  let _listeners: Array<(value: unknown, prevValue: unknown) => void> = [];

  const subscribe = (
    listener: (value: unknown, prevValue: unknown) => void
  ) => {
    _listeners = [..._listeners, listener];

    return () => {
      _listeners = _listeners.filter((l) => l !== listener);
    };
  };

  const emit = (value: unknown, prevValue: unknown) => {
    for (const listener of _listeners) {
      listener(value, prevValue);
    }
  };

  const get = (): unknown => {
    return _value;
  };

  const set = (newValue: unknown) => {
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
