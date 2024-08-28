import { describe, test, expect } from "vitest";
import createStore from "../store";
import {
  allowNegativeRule,
  applyMask,
  applyMaskMoney,
  clearMoneyValue,
  findStoreByPath,
  instanceOfStore,
  iterateStore,
  onlyDigits,
  removeSpecialChar,
  scapeRegex,
  splitIntegerDecimal,
  transformMask,
} from ".";
import { DEFAULT_MASK_OPTIONS, DEFAULT_MONEY_OPTIONS } from "../constants";

describe("Utils Form", () => {
  test("instanceOfStore", () => {
    const store = createStore();
    expect(instanceOfStore(store)).toBe(true);
  });

  test("findStoreByPath", () => {
    const values = {
      document: createStore("abc"),
    };
    const store = findStoreByPath(values, "document");
    expect(store.get()).toBe("abc");
  });

  test("findStoreByPath array", () => {
    const values = {
      document: [
        { name: createStore("a"), cpf: createStore("123") },
        { name: createStore("b"), cpf: createStore("456") },
      ],
    };
    const store = findStoreByPath(values, "document.0.cpf");
    expect(store.get()).toBe("123");
  });

  test("findStoreByPath multiarray", () => {
    const values = {
      document: [
        {
          name: createStore("a"),
          cpf: createStore("123"),
          extra: [{ test: createStore("def") }],
        },
        { name: createStore("b"), cpf: createStore("456") },
      ],
    };
    const store = findStoreByPath(values, "document.0.extra.0.test");
    expect(store.get()).toBe("def");
  });

  test("iterateStore", () => {
    const values = { a: createStore("a") };
    const objValues = iterateStore(
      values,
      (value) => instanceOfStore(value) && value.get()
    );
    expect(objValues).toStrictEqual({ a: "a" });
  });

  test("iterateStore array", () => {
    const values = {
      name: createStore("b"),
      cpf: createStore("456"),
      extra: [
        {
          test: createStore("1"),
        },
      ],
    };
    const objValues = iterateStore(
      values,
      (value) => instanceOfStore(value) && value.get()
    );
    expect(objValues).toStrictEqual({
      name: "b",
      cpf: "456",
      extra: [{ test: "1" }],
    });
  });
});

describe("Utils Mask", () => {
  test("transformMask", () => {
    const mapOptions = {
      pattern: /[A-Za-z]/,
      transform: (prevValue: string, newChar: string) => {
        return { prevValue, newChar: newChar.toUpperCase() };
      },
    };
    const value = transformMask("bcd", "a", mapOptions);
    expect(value).toBe("aBCD");
  });

  test("allowNegativeRule negative", () => {
    const sign = allowNegativeRule("100-", {
      thousands: ".",
      decimal: ",",
      precision: 2,
      allowNegative: true,
    });
    expect(sign).toBe("-");
  });

  test("allowNegativeRule double negative", () => {
    const sign = allowNegativeRule("100--", {
      thousands: ".",
      decimal: ",",
      precision: 2,
      allowNegative: true,
    });
    expect(sign).toBe("");
  });

  test("allowNegativeRule positive", () => {
    const sign = allowNegativeRule("100-+", {
      thousands: ".",
      decimal: ",",
      precision: 2,
      allowNegative: true,
    });
    expect(sign).toBe("");
  });

  test("applyMask", () => {
    const value = applyMask("1234567890", "000-000-000", DEFAULT_MASK_OPTIONS);
    expect(value).toBe("123-456-789");
  });

  test("applyMaskMoney", () => {
    const value = applyMaskMoney(1234567.89, "-", DEFAULT_MONEY_OPTIONS);
    expect(value).toBe("-1.234.567,89");
  });

  test("splitIntegerDecimal", () => {
    const value = splitIntegerDecimal("1.234.567,89", DEFAULT_MONEY_OPTIONS);
    expect(value).toStrictEqual({
      integerPart: "1234567",
      decimalPart: "89",
    });
  });

  test("clearMoneyValue", () => {
    const value = clearMoneyValue("1.234.567,89", 2);
    expect(value).toBe(1234567.89);
  });

  test("scapeRegex", () => {
    const value = scapeRegex(".*+");
    expect(value).toBe("\\.\\*\\+");
  });

  test("removeSpecialChar", () => {
    const value = removeSpecialChar("A,B/C1*2.3");
    expect(value).toBe("ABC123");
  });

  test("onlyDigits", () => {
    const value = onlyDigits("A123BC");
    expect(value).toBe("123");
  });
});
