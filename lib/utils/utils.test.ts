import { describe, test, expect } from "vitest";
import createStore from "../store";
import {
  allowNegativeRule,
  applyMask,
  applyMaskMoney,
  clearMoneyValue,
  findStoreByPath,
  getValueStores,
  initStores,
  instanceOfStore,
  onlyDigits,
  removeSpecialChar,
  scapeRegex,
  setErrorStores,
  splitIntegerDecimal,
  subscribeStores,
  transformMask,
} from ".";
import { DEFAULT_MASK_OPTIONS, DEFAULT_MONEY_OPTIONS } from "../constants";

describe("Utils Form", () => {
  test("instanceOfStore", () => {
    const store = createStore();
    expect(instanceOfStore(store)).toBe(true);
  });

  test("splitName", () => {
    const values = {
      document: createStore("abc"),
    };
    const store = findStoreByPath(values, "document");
    expect(store.get()).toBe("abc");
  });

  test("splitName array", () => {
    const values = {
      document: [
        { name: createStore("a"), cpf: createStore("123") },
        { name: createStore("b"), cpf: createStore("456") },
      ],
    };
    const store = findStoreByPath(values, "document.0.cpf");
    expect(store.get()).toBe("123");
  });

  test("splitName multiarray", () => {
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

  test("getValueStores", () => {
    const objValues = getValueStores(createStore("a"));
    expect(objValues).toStrictEqual("a");
  });

  test("getValueStores array", () => {
    const values = [
      { name: createStore("a"), cpf: createStore("123") },
      {
        name: createStore("b"),
        cpf: createStore("456"),
      },
    ];
    const objValues = getValueStores(values);
    expect(objValues).toStrictEqual([
      {
        cpf: "123",
        name: "a",
      },
      {
        cpf: "456",
        name: "b",
      },
    ]);
  });

  test("getValueStores multiarray", () => {
    const values = [
      { name: createStore("a"), cpf: createStore("123") },
      {
        name: createStore("b"),
        cpf: createStore("456"),
        extra: [
          {
            test: createStore("1"),
          },
        ],
      },
    ];
    const objValues = getValueStores(values);
    expect(objValues).toStrictEqual([
      {
        cpf: "123",
        name: "a",
      },
      {
        cpf: "456",
        name: "b",
        extra: [{ test: "1" }],
      },
    ]);
  });

  test("setErrorStores", () => {
    const errors = createStore();
    const newErrors = "erro";
    setErrorStores(errors, newErrors);
    expect(errors.get()).toStrictEqual("erro");
  });

  test("setErrorStores array", () => {
    const errors = [
      { name: createStore("a"), cpf: createStore("123") },
      {
        name: createStore("b"),
        cpf: createStore("456"),
      },
    ];
    const newErrors = [
      { name: "erro a", cpf: "erro b" },
      {
        name: "erro c",
        cpf: "erro d",
      },
    ];
    setErrorStores(errors, newErrors);
    expect(errors[0].name.get()).toStrictEqual("erro a");
  });

  test("setErrorStores multiarray", () => {
    const errors = [
      { name: createStore("a"), cpf: createStore("123") },
      {
        name: createStore("b"),
        cpf: createStore("456"),
        multi: [{ test: createStore("456") }],
      },
    ];
    const newErrors = [
      { name: "erro a", cpf: "erro b" },
      {
        name: "erro c",
        cpf: "erro d",
        multi: [{ test: "erro f" }],
      },
    ];
    setErrorStores(errors, newErrors);
    expect(errors[1].multi![0].test.get()).toStrictEqual("erro f");
  });

  test("subscribeStores", () => {
    const values = createStore("a");
    const store = createStore("1");
    const listener = (value: string) => {
      if (value === "b") store.set("2");
    };
    subscribeStores(values, listener);
    expect(store.get()).toBe("1");
    values.set("b");
    expect(store.get()).toBe("2");
  });

  test("subscribeStores array", () => {
    const values = [
      { name: createStore("a"), cpf: createStore("123") },
      {
        name: createStore("b"),
        cpf: createStore("456"),
      },
    ];
    const store = createStore("3");
    const listener = (value: string) => {
      if (value === "b") store.set("4");
    };
    subscribeStores(values, listener);
    expect(store.get()).toBe("3");
    values[1].name.set("b");
    expect(store.get()).toBe("4");
  });

  test("initStores", () => {
    const values = "2";
    const store = initStores(values, true);
    expect(store.get()).toBe("2");
  });

  test("initStores array", () => {
    const values = [{ name: "1" }];
    const store = initStores(values, true);
    expect(store[0].name.get()).toBe("1");
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
