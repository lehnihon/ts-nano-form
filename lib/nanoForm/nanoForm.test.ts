import { describe, test, expect } from "vitest";
import NanoForm from ".";

describe("NanoForm", () => {
  test("setCurrentForm", () => {
    const { getForm, createForm } = NanoForm();
    const userForm = createForm({ name: "user" });
    const userFormB = createForm({ name: "userb" });
    expect(getForm("user")).toStrictEqual(userForm);
    expect(getForm("userb")).toStrictEqual(userFormB);
  });

  test("mask", () => {
    const { mask } = NanoForm();
    const value = mask("1234567890", "000-000-000");
    expect(value).toBe("123-456-789");
  });
});
