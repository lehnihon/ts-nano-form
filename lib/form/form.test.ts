import { describe, test, expect } from "vitest";
import createForm from ".";

const TsForm = createForm({
  name: "Leandro",
  document: "123456",
  data: [{ image: "a" }, { image: "b" }],
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
    TsForm.field("document").storeError.set("required document");
    TsForm.field("data.0.image").storeError.set("required image a");
    TsForm.field("data.1.image").storeError.set("required image b");

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
    TsForm.subscribeValues(listener);
    expect(data).toBe("a");
    TsForm.field("name").storeValue.set("name");
    expect(data).toBe("b");
  });

  test("subscribeErrors", () => {
    let data = "c";
    const listener = (value: string, prevValue: string) => {
      if (prevValue === "" && value === "error name") data = "d";
    };
    TsForm.subscribeErrors(listener);
    expect(data).toBe("c");
    TsForm.field("name").storeError.set("error name");
    expect(data).toBe("d");
  });

  test("submit", () => {
    TsForm.field("name").storeValue.set("");
    TsForm.submit((data) => ({
      name: data?.name ? "" : "required name",
      document: data?.name ? "" : "required document",
      data: [{ image: "" }, { image: "" }],
    }));
    expect(TsForm.field("name").storeError.get()).toBe("required name");
  });
});
