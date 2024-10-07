import { describe, test, expect } from "vitest";
import createForm from ".";

describe("Form", () => {
  test("getValues", () => {
    const TsForm = createForm({
      initialValues: {
        name: "Leandro",
        document: "123456",
        data: [{ image: "a" }, { image: "b" }],
      },
    });

    expect(TsForm.getValues()).toStrictEqual({
      name: "Leandro",
      document: "123456",
      data: [{ image: "a" }, { image: "b" }],
    });
  });

  test("getErrors", () => {
    const TsForm = createForm({
      initialValues: {
        name: "Leandro",
        document: "123456",
        data: [{ image: "a" }, { image: "b" }],
      },
    });

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
    const TsForm = createForm({
      initialValues: {
        name: "Leandro",
        document: "123456",
        data: [{ image: "a" }, { image: "b" }],
      },
    });

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
    const TsForm = createForm({
      initialValues: {
        name: "Leandro",
        document: "123456",
        data: [{ image: "a" }, { image: "b" }],
      },
    });

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
    const TsForm = createForm({
      initialValues: {
        name: "Leandro",
        document: "123456",
        data: [{ image: "a" }, { image: "b" }],
      },
    });

    TsForm.field("name").setValue("123456");

    expect(TsForm.field("name").getValue()).toBe("123456");
  });

  test("setValue masked", () => {
    const TsForm = createForm({
      initialValues: {
        name: "Leandro",
        document: "123456",
        data: [{ image: "a" }, { image: "b" }],
      },
    });

    TsForm.field("name").setValue("123-456");

    expect(TsForm.field("name").getValue()).toBe("123456");
  });

  test("setValue getMasked", () => {
    const TsForm = createForm({
      initialValues: {
        name: "Leandro",
        document: "123456",
        data: [{ image: "a" }, { image: "b" }],
      },
    });

    TsForm.field("name").setValue("123456");

    expect(TsForm.field("name").getMasked("000-000")).toBe("123-456");
  });

  test("setMasked", () => {
    const TsForm = createForm({
      initialValues: {
        name: "Leandro",
        document: "123456",
        data: [{ image: "a" }, { image: "b" }],
      },
    });

    TsForm.field("name").setMasked("123456", "000-000");

    expect(TsForm.field("name").getValue()).toBe("123-456");
  });

  test("setMasked getUnmasked", () => {
    const TsForm = createForm({
      initialValues: {
        name: "Leandro",
        document: "123456",
        data: [{ image: "a" }, { image: "b" }],
      },
    });

    TsForm.field("name").setMasked("123456", "000-000");

    expect(TsForm.field("name").getUnmasked()).toBe("123456");
  });

  test("setMoney", () => {
    const TsForm = createForm({
      initialValues: {
        name: "Leandro",
        document: "123456",
        data: [{ image: "a" }, { image: "b" }],
      },
    });

    TsForm.field("name").setMoney("123456");

    expect(TsForm.field("name").getValue()).toBe("1234.56");
  });

  test("setMoney masked", () => {
    const TsForm = createForm({
      initialValues: {
        name: "Leandro",
        document: "123456",
        data: [{ image: "a" }, { image: "b" }],
      },
    });

    TsForm.field("name").setMoney("1.234,56");

    expect(TsForm.field("name").getValue()).toBe("1234.56");
  });

  test("setMoney getMoneyMasked", () => {
    const TsForm = createForm({
      initialValues: {
        name: "Leandro",
        document: "123456",
        data: [{ image: "a" }, { image: "b" }],
      },
    });

    TsForm.field("name").setMoneyMasked("123456");

    expect(TsForm.field("name").getMoneyMasked()).toBe("1.234,56");
  });

  test("setMoneyMasked", () => {
    const TsForm = createForm({
      initialValues: {
        name: "Leandro",
        document: "123456",
        data: [{ image: "a" }, { image: "b" }],
      },
    });

    TsForm.field("name").setMoneyMasked("1234.56");

    expect(TsForm.field("name").getValue()).toBe("1.234,56");
  });

  test("submit", () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const resolver = (data: any) => {
      const errors = {
        name: "",
      };
      if (!data.name) errors.name = "name required";

      return errors;
    };

    const TsForm = createForm({
      initialValues: {
        name: "Leandro",
        document: "123456",
        data: [{ image: "a" }, { image: "b" }],
      },
      resolver: resolver,
    });

    TsForm.field("name").setValue("");
    TsForm.submit((data) => console.log("submit", data));
    expect(TsForm.field("name").getError()).toBe("name required");
  });
});
