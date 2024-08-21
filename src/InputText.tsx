import TsFormUser from "./createFormUser";
import useReactForm from "./useReactForm";

const { storeValue, storeError, onChangeMask } = TsFormUser.field("document");

const InputText = () => {
  const { value, error } = useReactForm(storeValue, storeError);

  return (
    <>
      <p>Valor A:{value}</p>
      <label>Campo Test a:</label>
      <input
        value={value}
        onChange={(e) => onChangeMask(e.target.value, "000-000")}
      />
      <p>Error:{error}</p>
    </>
  );
};

export default InputText;
