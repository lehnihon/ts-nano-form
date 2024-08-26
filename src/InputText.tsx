import { useSyncExternalStore } from "react";
import TsFormUser from "./createFormUser";

interface InputTextProps {
  field: string;
}

const InputText = ({ field }: InputTextProps) => {
  const { subscribeValue, getValue, subscribeError, getError, setValue } =
    TsFormUser.field(field);

  const value = useSyncExternalStore(subscribeValue, getValue);
  const error = useSyncExternalStore(subscribeError, getError);

  return (
    <>
      <p>{field}</p>
      <input value={value} onChange={(e) => setValue(e.target.value)} />
      <p>{error}</p>
    </>
  );
};

export default InputText;
