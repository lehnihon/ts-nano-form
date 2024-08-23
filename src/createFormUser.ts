import { InferType, object, string } from "yup";
import createForm from "../lib/form";

export const userSchema = object({
  name: string().required(),
  document: string().required(),
});

export type FormUser = InferType<typeof userSchema>;

export const TsFormUserInitalValues = {
  name: "",
  document: "",
};

const TsFormUser = createForm<FormUser>(TsFormUserInitalValues, {
  moneyOptions: {
    thousands: ".",
    decimal: ",",
    precision: 2,
    beforeMask: (value) => (value === 1000 ? 1001 : value),
    afterMask: (value) => "$" + value,
  },
});

export default TsFormUser;
