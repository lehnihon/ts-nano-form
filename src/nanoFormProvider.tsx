/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, ReactNode } from "react";
import { CreateFormType } from "../lib/types";

export interface NanoFormContextType {
  form: CreateFormType<any>;
}

export const NanoFormContext = createContext<NanoFormContextType | undefined>(
  undefined
);

interface NanoFormProviderProps {
  form: CreateFormType<any>;
  children: ReactNode;
}

const NanoFormProvider = ({ form, children }: NanoFormProviderProps) => {
  return (
    <NanoFormContext.Provider value={{ form }}>
      {children}
    </NanoFormContext.Provider>
  );
};

export default NanoFormProvider;
