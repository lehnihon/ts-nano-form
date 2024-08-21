import { useSyncExternalStore } from "react";
import TsFormUser from "./createFormUser";

interface InputTextProps {
  field: string;
}

const InputText = ({ field }: InputTextProps) => {
  const { storeValue, storeError, onChangeMask } = TsFormUser.field(field);

  const value = useSyncExternalStore(storeValue.subscribe, storeValue.get);
  const error = useSyncExternalStore(storeError.subscribe, storeError.get);

  return (
    <>
      <p>{field}</p>
      <input
        value={value}
        onChange={(e) => onChangeMask(e.target.value, "000-000")}
      />
      <p>{error}</p>
    </>
  );
};

export default InputText;
