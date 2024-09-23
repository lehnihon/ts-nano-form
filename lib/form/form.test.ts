import { describe, test, expect } from "vitest";
import createForm from ".";

const TsForm = createForm({
  initialValues: {
    name: "Leandro",
    document: "123456",
    data: [{ image: "a" }, { image: "b" }],
  },
});

describe("Form", () => {
  test("getValues", () => {
    expect(TsForm.getValues()).toStrictEqual({
      name: "Leandro",
      document: "123456",
      data: [{ image: "a" }, { image: "b" }],
    });
  });

  test("getErrors", () => {
    TsForm.field("document").setError("required document");
    TsForm.field("data.0.image").setError("required image a");
    TsForm.field("data.1.image").setError("required image b");

    expect(TsForm.getErrors()).toStrictEqual({
      name: "",
      document: "required document",
      data: [{ image: "required image a" }, { image: "required image b" }],
    });
  });

  test("subscribeValues", () => {
    let data = "a";
    const listener = (value: string, prevValue: string) => {
      if (prevValue === "Leandro" && value === "name") data = "b";
    };
    TsForm.subscribeAllValues(listener);
    expect(data).toBe("a");
    TsForm.field("name").setValue("name");
    expect(data).toBe("b");
  });

  test("subscribeErrors", () => {
    let data = "c";
    const listener = (value: string, prevValue: string) => {
      if (prevValue === "" && value === "error name") data = "d";
    };
    TsForm.subscribeAllErrors(listener);
    expect(data).toBe("c");
    TsForm.field("name").setError("error name");
    expect(data).toBe("d");
  });

  test("submit", () => {
    TsForm.field("name").setValue("");
    TsForm.submit((data) => ({
      name: data?.name ? "" : "required name",
      document: data?.name ? "" : "required document",
      "data.0.image": "test",
    }));
    expect(TsForm.field("name").getError()).toBe("required name");
  });
});
