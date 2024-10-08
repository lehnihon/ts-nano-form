import { describe, test, expect } from "vitest";
import { getPlaceholder, mask, maskMoney, unmask, unmaskMoney } from ".";
import { DEFAULT_MASK_OPTIONS, DEFAULT_MONEY_OPTIONS } from "../constants";
import { MapOptions } from "../types";

describe("Mask", () => {
  test("mask", () => {
    const value = mask("1234567890", "000-000-000", DEFAULT_MASK_OPTIONS);
    expect(value).toBe("123-456-789");
  });

  test("mask array cpf", () => {
    const value = mask(
      "30160798019",
      ["000.000.000-00", "00.000.000/0000-00"],
      DEFAULT_MASK_OPTIONS
    );
    expect(value).toBe("301.607.980-19");
  });

  test("mask array cnpj", () => {
    const value = mask(
      "41.996.557/0001-01",
      ["000.000.000-00", "00.000.000/0000-00"],
      DEFAULT_MASK_OPTIONS
    );
    expect(value).toBe("41.996.557/0001-01");
  });

  test("mask array cnpj unmasked", () => {
    const value = mask(
      "41996557000101",
      ["000.000.000-00", "00.000.000/0000-00"],
      DEFAULT_MASK_OPTIONS
    );
    expect(value).toBe("41.996.557/0001-01");
  });

  test("mask cpf", () => {
    const value = mask("30160798019", "000.000.000-00", DEFAULT_MASK_OPTIONS);
    expect(value).toBe("301.607.980-19");
  });

  test("mask cnpj", () => {
    const value = mask(
      "41996557000101",
      "00.000.000/0000-00",
      DEFAULT_MASK_OPTIONS
    );
    expect(value).toBe("41.996.557/0001-01");
  });

  test("mask transform", () => {
    const value = mask("abc-1d34", "XXX-0Z00", DEFAULT_MASK_OPTIONS);
    expect(value).toBe("ABC-1D34");
  });

  test("mask wrong char", () => {
    const value = mask("01A", "00/00/0000", DEFAULT_MASK_OPTIONS);
    expect(value).toBe("01/");
  });

  test("mask wrong string", () => {
    const value = mask("ABC", "00/00/0000", DEFAULT_MASK_OPTIONS);
    expect(value).toBe("");
  });

  test("mask before", () => {
    const value = mask("abcdef", "###-####", {
      map: new Map<string, MapOptions>([["#", { pattern: /[A-Za-z]/ }]]),
      beforeMask: (value) => value + "g",
    });
    expect(value).toBe("abc-defg");
  });

  test("mask after", () => {
    const value = mask("efghij", "###-####", {
      map: new Map<string, MapOptions>([["#", { pattern: /[A-Za-z]/ }]]),
      afterMask: (value) => value + "g",
    });
    expect(value).toBe("efg-hijg");
  });

  test("unmask", () => {
    const value = unmask("123-456-789", DEFAULT_MASK_OPTIONS);
    expect(value).toBe("123456789");
  });

  test("getPlaceholder", () => {
    const value = getPlaceholder("SS-SS-SSSS", DEFAULT_MASK_OPTIONS);
    expect(value).toBe("__-__-____");
  });
});

describe("Mask money", () => {
  test("maskMoney", () => {
    const value = maskMoney("123456789", DEFAULT_MONEY_OPTIONS);
    expect(value).toBe("1.234.567,89");
  });

  test("maskMoney zero precision decimal", () => {
    const value = maskMoney("1234.50", DEFAULT_MONEY_OPTIONS);
    expect(value).toBe("1.234,50");
  });

  test("maskMoney zero precision integer", () => {
    const value = maskMoney("123450", DEFAULT_MONEY_OPTIONS);
    expect(value).toBe("1.234,50");
  });

  test("maskMoney precision round", () => {
    const value = maskMoney("1234567.8999", DEFAULT_MONEY_OPTIONS);
    expect(value).toBe("1.234.567,89");
  });

  test("maskMoney empty", () => {
    const value = maskMoney("", DEFAULT_MONEY_OPTIONS);
    expect(value).toBe("0,00");
  });

  test("maskMoney wrong string", () => {
    const value = maskMoney("A2C1", DEFAULT_MONEY_OPTIONS);
    expect(value).toBe("0,21");
  });

  test("maskMoney negative", () => {
    const value = maskMoney("123456-", {
      thousands: ".",
      decimal: ",",
      precision: 2,
      allowNegative: true,
    });
    expect(value).toBe("-1.234,56");
  });

  test("maskMoney prefix", () => {
    const value = maskMoney("123456-", {
      thousands: ".",
      decimal: ",",
      precision: 2,
      allowNegative: true,
      prefix: "R$",
    });
    expect(value).toBe("-R$1.234,56");
  });

  test("maskMoney prefix integer", () => {
    const value = maskMoney("123456-", {
      thousands: " ",
      decimal: ",",
      precision: 0,
      allowNegative: false,
      prefix: "R$",
    });
    expect(value).toBe("R$123 456");
  });

  test("maskMoney before", () => {
    const value = maskMoney("123456", {
      thousands: ".",
      decimal: ",",
      precision: 2,
      beforeMask: (value) => `${Number(value) + 5}`,
    });
    expect(value).toBe("1.239,56");
  });

  test("maskMoney after", () => {
    const value = maskMoney("123456", {
      thousands: ".",
      decimal: ",",
      precision: 2,
      afterMask: (value) => "R$" + value,
    });
    expect(value).toBe("R$1.234,56");
  });

  test("unmaskMoney", () => {
    const value = unmaskMoney("1.234.567,89", DEFAULT_MONEY_OPTIONS);
    expect(value).toBe("1234567.89");
  });

  test("unmaskMoney empty", () => {
    const value = unmaskMoney("", DEFAULT_MONEY_OPTIONS);
    expect(value).toBe("0");
  });

  test("unmaskMoney integer", () => {
    const value = unmaskMoney("1.234.567,89", {
      thousands: ".",
      decimal: ",",
      precision: 0,
    });
    expect(value).toBe("123456789");
  });

  test("unmaskMoney negative", () => {
    const value = unmaskMoney("123456-", {
      thousands: ".",
      decimal: ",",
      precision: 2,
      allowNegative: true,
    });
    expect(value).toBe("-1234.56");
  });
});
