import { useSyncExternalStore } from "react";
import TsFormUser from "./createFormUser";

interface InputTextProps {
  field: string;
}

const InputText = ({ field }: InputTextProps) => {
  const { subscribeValue, subscribeError, getError, setMoney, getMoneyMasked } =
    TsFormUser.field(field);

  const value = useSyncExternalStore(subscribeValue, getMoneyMasked);
  const error = useSyncExternalStore(subscribeError, getError);
  return (
    <>
      <p>{field}</p>
      <input value={value} onChange={(e) => setMoney(e.target.value)} />
      <p>{error}</p>
    </>
  );
};

export default InputText;
