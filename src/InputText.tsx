import { useSyncExternalStore } from "react";
import TsFormUser from "./createFormUser";

interface InputTextProps {
  field: string;
}

const InputText = ({ field }: InputTextProps) => {
  const { subscribeValue, subscribeError, getError, setValue, getMasked } =
    TsFormUser.field(field);

  const value = useSyncExternalStore(subscribeValue, () =>
    getMasked(["000.000.000-00", "00.000.000/0000-00"])
  );
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
