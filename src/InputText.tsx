import { useSyncExternalStore } from "react";
import useNanoForm from "./useNanoForm";
import TsNanoForm from "./nanoForm";

interface InputTextProps {
  name: string;
  mask?: string | string[];
}

const InputText = ({ name, mask }: InputTextProps) => {
  const { form } = useNanoForm();
  const {
    subscribeValue,
    subscribeError,
    getError,
    setValue,
    getValue,
    getMasked,
  } = form.field(name);

  const value = useSyncExternalStore(
    subscribeValue,
    mask ? getMasked.bind(this, mask) : getValue
  );
  const error = useSyncExternalStore(subscribeError, getError);

  return (
    <>
      <p>{name}</p>
      <input
        value={value || ""}
        onChange={(e) => setValue(TsNanoForm.unmask(e.target.value))}
      />
      <p>Error: {error}</p>
    </>
  );
};

export default InputText;
