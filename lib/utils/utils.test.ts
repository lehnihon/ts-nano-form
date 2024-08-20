import { describe, test, expect } from "vitest";
import createStore from "../store";
import {
  getValueStores,
  initStores,
  instanceOfStore,
  setErrorStores,
  splitName,
  subscribeStores,
} from ".";

describe("Utils", () => {
  test("instanceOfStore", () => {
    const store = createStore();
    expect(instanceOfStore(store)).toBe(true);
  });

  test("splitName", () => {
    const values = {
      document: createStore("abc"),
    };
    const store = splitName("document", values);
    expect(store.get()).toBe("abc");
  });

  test("splitName array", () => {
    const values = {
      document: [
        { name: createStore("a"), cpf: createStore("123") },
        { name: createStore("b"), cpf: createStore("456") },
      ],
    };
    const store = splitName("document.0.cpf", values);
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
    const store = splitName("document.0.extra.0.test", values);
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
    const values = [{ name: "1" }];

    const store = initStores(values, true);

    expect(store[0].name.get()).toBe("");
  });
});
