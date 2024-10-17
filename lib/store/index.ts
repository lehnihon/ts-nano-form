/* eslint-disable @typescript-eslint/no-explicit-any */
import { Store } from "../types";

const createStore = (initial?: any): Store => {
  let _value = initial;
  let _listeners: Array<(value: any, prevValue: any) => void> = [];

  const subscribe = (listener: (value: any, prevValue: any) => void) => {
    _listeners = [..._listeners, listener];

    return () => {
      _listeners = _listeners.filter((l) => l !== listener);
    };
  };

  const emit = (value: any, prevValue: any) => {
    for (const listener of _listeners) {
      listener(value, prevValue);
    }
  };

  const get = (): any => {
    return _value;
  };

  const set = (newValue: any) => {
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
