import { useSyncExternalStore } from "react";
import TsFormUser from "./createFormUser";

interface InputTextProps {
  field: string;
  mask: string | string[];
}

const InputText = ({ field, mask }: InputTextProps) => {
  const { subscribeValue, subscribeError, getError, setValue, getMasked } =
    TsFormUser.field(field);

  const value = useSyncExternalStore(subscribeValue, () => getMasked(mask));

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
