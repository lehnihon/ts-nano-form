import { useSyncExternalStore } from "react";
import TsFormUser from "./createFormUser";

const { storeValue, storeError } = TsFormUser.field("document");

const InputText = () => {
  const value = useSyncExternalStore(storeValue.subscribe, storeValue.get);
  const error = useSyncExternalStore(storeError.subscribe, storeError.get);

  return (
    <>
      <p>Valor A:{value}</p>
      <label>Campo Test a:</label>
      <input
        name="name"
        value={value}
        onChange={(e) => storeValue.set(e.target.value)}
      />
      <p>Error:{error}</p>
    </>
  );
};

export default InputText;
