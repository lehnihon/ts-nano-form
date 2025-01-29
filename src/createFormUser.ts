import { array, InferType, object, string } from "yup";
import validateYup from "./validateYup";
import { TsNanoForm } from "./nanoForm";

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

const { createForm } = TsNanoForm;

const TsFormUser = createForm<FormUser>({
  resolver: validateYup(userSchema),
});

export default TsFormUser;
