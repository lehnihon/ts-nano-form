import { TsNanoForm } from "./nanoForm";

export default function StoreDoc() {
  type FormUserType = {
    document: string;
  };

  const { createForm } = TsNanoForm;

  const FormUser = createForm<FormUserType>({
    initialValues: {
      document: "12345",
    },
  });

  const { subscribeValue, setValue } = FormUser.field("document");
  subscribeValue((value: unknown, prevValue: unknown) =>
    console.log(value, prevValue)
  );
  setValue("67890");
  // 67890 12345

  return <></>;
}
