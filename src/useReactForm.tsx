import { useSyncExternalStore } from "react";
import { Store } from "../lib/types";

const useReactForm = (storeValue: Store, storeError: Store) => {
  const value = useSyncExternalStore(storeValue.subscribe, storeValue.get);
  const error = useSyncExternalStore(storeError.subscribe, storeError.get);

  return { value, error };
};

export default useReactForm;
