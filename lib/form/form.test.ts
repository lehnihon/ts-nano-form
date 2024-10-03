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

  test("setValue", () => {
    TsForm.field("name").setValue("123456");

    expect(TsForm.field("name").getValue()).toBe("123456");
  });

  test("setValue masked", () => {
    TsForm.field("name").setValue("123-456");

    expect(TsForm.field("name").getValue()).toBe("123456");
  });

  test("setValue getMasked", () => {
    TsForm.field("name").setValue("123456");

    expect(TsForm.field("name").getMasked("000-000")).toBe("123-456");
  });

  test("setMasked", () => {
    TsForm.field("name").setMasked("123456", "000-000");

    expect(TsForm.field("name").getValue()).toBe("123-456");
  });

  test("setMasked getUnmasked", () => {
    TsForm.field("name").setMasked("123456", "000-000");

    expect(TsForm.field("name").getUnmasked()).toBe("123456");
  });

  test("setMoney", () => {
    TsForm.field("name").setMoney("123456");

    expect(TsForm.field("name").getValue()).toBe("1234.56");
  });

  test("setMoney masked", () => {
    TsForm.field("name").setMoney("1.234,56");

    expect(TsForm.field("name").getValue()).toBe("1234.56");
  });

  test("setMoney getMoneyMasked", () => {
    TsForm.field("name").setMoneyMasked("123456");

    expect(TsForm.field("name").getMoneyMasked()).toBe("1.234,56");
  });

  test("setMoneyMasked", () => {
    TsForm.field("name").setMoneyMasked("1234.56");

    expect(TsForm.field("name").getValue()).toBe("1.234,56");
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
