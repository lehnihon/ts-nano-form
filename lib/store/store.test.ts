import { describe, test, expect } from "vitest";
import createStore from ".";

describe("Store", () => {
  test("set and get", () => {
    const store = createStore();
    store.set("12345");
    expect(store.get()).toBe("12345");
  });

  test("subscribe", () => {
    const store = createStore();
    let subsValue = 0;
    store.subscribe((_, prev) => (subsValue = prev));
    store.set(123);
    store.set(456);
    expect(store.get()).toBe(456);
    expect(subsValue).toBe(123);
  });

  test("emit", () => {
    const store = createStore();
    let subsValue = 0;
    store.subscribe((_, prev) => (subsValue = prev));
    store.set(789);
    store.emit(123, 456);
    expect(store.get()).toBe(789);
    expect(subsValue).toBe(456);
  });
});
