import createStore, { Store } from "../form/store";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const instanceOfStore = (object: any): object is Store => {
  return "subscribe" in object;
};

export const stripName = (
  name: string,
  values: Record<string, unknown>
): Store => {
  const nameSplit = name.split(".");
  if (nameSplit.length === 1) {
    return values[name] as Store;
  }
  const firstName = nameSplit.shift();
  return stripNameRecursive(values[firstName!], nameSplit);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const stripNameRecursive = (values: any, nameSplit: string[]): any => {
  const firstName = nameSplit.shift();
  if (!firstName) return;
  return instanceOfStore(values[firstName])
    ? values[firstName!]
    : stripNameRecursive(values[firstName!], nameSplit);
};

export const getRecursive = <T>(value: unknown): unknown => {
  if (value instanceof Array) {
    return value.map((item) =>
      Object.keys(item).reduce((acc, key) => {
        return { ...acc, [key]: getRecursive(item[key]) };
      }, {} as T)
    );
  }

  return (value as Store).get();
};

export const setRecursive = (value: unknown, error: unknown): unknown => {
  if (value instanceof Array) {
    return value.map((item, i) =>
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      Object.keys(item).map((j: any) => {
        setRecursive(item[j], (error as [])[i][j]);
      })
    );
  }
  return (value as Store).set(`${error || ""}`);
};

export const subscribeRecursive = (
  value: unknown,
  listener: (value: string, prevValue: string) => void
): unknown =>
  value instanceof Array
    ? value.map((item) =>
        Object.keys(item).map((key) =>
          subscribeRecursive(item[`${key}`], listener)
        )
      )
    : (value as Store).subscribe(listener);

export const getRecord = (
  value: unknown,
  hasInitalValues: boolean = false
): unknown => {
  if (value instanceof Array) {
    return value.map((item) =>
      Object.keys(item).reduce(
        (acc, key) => ({ ...acc, [key]: getRecord(item[key]) }),
        {}
      )
    );
  }
  return hasInitalValues ? createStore(`${value}`) : createStore();
};
