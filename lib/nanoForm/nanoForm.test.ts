import { describe, test, expect } from "vitest";
import NanoForm from ".";

describe("NanoForm", () => {
  test("setCurrentForm", () => {
    const { getCurrentForm, setCurrentForm, createForm } = NanoForm();
    const userForm = createForm({ name: "user" });
    const userFormB = createForm({ name: "userb" });
    setCurrentForm("user");
    expect(getCurrentForm()).toStrictEqual(userForm);

    setCurrentForm("userb");
    expect(getCurrentForm()).toStrictEqual(userFormB);
  });

  test("mask", () => {
    const { mask } = NanoForm();
    const value = mask("1234567890", "000-000-000");
    expect(value).toBe("123-456-789");
  });
});
