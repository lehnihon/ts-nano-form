import { z } from "zod";
import createForm from "../lib/form";
import validateZod from "./validateZod";

export const formSchema = z.object({
  name: z.string().trim().min(1),
  document: z.string().trim().min(1),
  data: z.array(
    z.object({
      image: z.string().trim().min(1),
    })
  ),
});

export type FormUser = z.infer<typeof formSchema>;

export const TsFormUserInitalValues = {
  name: "",
  document: "",
  data: [{ image: "" }],
};

const TsFormUser = createForm<FormUser>({
  resolver: validateZod(formSchema),
});

export default TsFormUser;
