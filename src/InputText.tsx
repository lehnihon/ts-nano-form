import { useSyncExternalStore } from "react";
import TsFormUser from "./createFormUser";

interface InputTextProps {
  field: string;
}

const InputText = ({ field }: InputTextProps) => {
  const { subscribeValue, getValue, subscribeError, getError, setMasked } =
    TsFormUser.field(field);

  const value = useSyncExternalStore(subscribeValue, getValue);
  const error = useSyncExternalStore(subscribeError, getError);

  return (
    <>
      <p>{field}</p>
      <input
        value={value}
        onChange={(e) => setMasked(e.target.value, "000-000")}
      />
      <p>{error}</p>
    </>
  );
};

export default InputText;
