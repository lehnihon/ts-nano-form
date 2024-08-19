import { InferType, object, string } from "yup";
import createForm from "../lib/form";

export const userSchema = object({
  name: string().required(),
  document: string().required(),
});

export type FormUser = InferType<typeof userSchema>;

const TsFormUser = createForm<FormUser>({
  name: "",
  document: "",
});

export default TsFormUser;
