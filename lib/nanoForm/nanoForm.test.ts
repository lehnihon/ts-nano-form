import { describe, test, expect } from "vitest";
import NanoForm from ".";
import { MapOptions } from "../types";

describe("NanoForm", () => {
  test("getForm and createForm", () => {
    const { getForm, createForm } = NanoForm();
    const userForm = createForm({ name: "user" });
    const userFormB = createForm({ name: "userb" });
    expect(getForm("user")).toStrictEqual(userForm);
    expect(getForm("userb")).toStrictEqual(userFormB);
  });

  test("mask", () => {
    const { mask } = NanoForm();

    const maskOptions = {
      map: new Map<string, MapOptions>([
        [
          "#",
          {
            pattern: /[A-Za-z]/,
            transform: (prevValue, newChar) => ({
              prevValue,
              newChar: newChar.toLocaleUpperCase(),
            }),
          },
        ],
        ["9", { pattern: /\d/ }],
      ]),
    };

    const value = mask("1234567890", "999-999-999", maskOptions);
    expect(value).toBe("123-456-789");
  });
});
