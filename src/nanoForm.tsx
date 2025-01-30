import NanoForm from "../lib/nanoForm";
import { array, InferType, object, string } from "yup";
import validateYup from "./validateYup";

const userSchema = object({
  name: string().required(),
  document: string().required(),
  data: array(
    object({
      image: string().required(),
    })
  ).required(),
});

const loginSchema = object({
  username: string().required(),
  password: string().required(),
});

type FormUser = InferType<typeof userSchema>;
type FormLogin = InferType<typeof loginSchema>;

const TsNanoForm = NanoForm();
const { createForm } = TsNanoForm;

createForm<FormUser>({
  name: "user",
  resolver: validateYup(userSchema),
});

createForm<FormLogin>({
  name: "login",
  resolver: validateYup(loginSchema),
});

export default TsNanoForm;
