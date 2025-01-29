import { describe, test, expect } from "vitest";
import NanoForm from ".";

describe("NanoForm", () => {
  test("setCurrentForm", () => {
    const { setCurrentForm, getCurrentForm, createForm } = NanoForm();
    const userForm = createForm({});
    const userFormB = createForm({});
    setCurrentForm(userForm);
    expect(getCurrentForm()).toStrictEqual(userForm);
    setCurrentForm(userFormB);
    expect(getCurrentForm()).toStrictEqual(userFormB);
  });

  test("mask", () => {
    const { mask } = NanoForm();
    const value = mask("1234567890", "000-000-000");
    expect(value).toBe("123-456-789");
  });
});
