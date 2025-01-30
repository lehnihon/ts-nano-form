import { useContext } from "react";
import { NanoFormContext, NanoFormContextType } from "./nanoFormProvider";

const useNanoForm = (): NanoFormContextType => {
  const context = useContext(NanoFormContext);
  if (!context) {
    throw new Error("useNanoForm deve ser usado dentro de um NanoFormProvider");
  }
  return context;
};

export default useNanoForm;
