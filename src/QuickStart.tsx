import TsNanoForm from "./nanoForm";

export default function QuickStart() {
  type FormUserType = {
    name: string;
    document: string;
  };

  const validate = (values: FormUserType) => {
    const errors = {} as FormUserType;
    if (!values.name) errors.name = "name required";
    if (!values.document) errors.document = "document required";

    return errors;
  };

  const { createForm } = TsNanoForm;
  const FormUser = createForm<FormUserType>({
    name: "user",
    resolver: validate,
  });

  const { submit, field, getErrors } = FormUser;

  field("name").setValue("John Doe");

  submit(async (data) => {
    try {
      await fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
    } catch (e) {
      console.log(e);
    }
  });

  console.log(getErrors());
  // {name: '', document: 'document required'}

  return <></>;
}
