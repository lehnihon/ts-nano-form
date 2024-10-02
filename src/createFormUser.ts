import { array, InferType, object, string } from "yup";
import createForm from "../lib/form";

export const userSchema = object({
  name: string().required(),
  document: string().required(),
  data: array(
    object({
      image: string().required(),
    })
  ).required(),
});

export type FormUser = InferType<typeof userSchema>;

export const TsFormUserInitalValues = {
  name: "",
  document: "",
  data: [{ image: "" }],
};

const TsFormUser = createForm<FormUser>();

export default TsFormUser;
