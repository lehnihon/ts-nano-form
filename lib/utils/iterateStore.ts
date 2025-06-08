import { copyObj, isObject } from ".";
import instanceOfStore from "./instanceOfStore";

/* eslint-disable @typescript-eslint/no-explicit-any */
const iterateStore = (
  obj: Record<string, any>,
  callback: (value: any, index: string | undefined) => void,
  index?: string
): any => {
  const objClone = copyObj(obj);
  if (!isObject(obj) || instanceOfStore(obj)) return callback(obj, index);
  for (const x in obj) {
    objClone[x] = iterateStore(obj[x], callback, x);
  }
  return objClone;
};

export default iterateStore;
