import { copyObj, isObject } from ".";
import instanceOfStore from "./instanceOfStore";

/* eslint-disable @typescript-eslint/no-explicit-any */
const iterateStore = (
  obj: Record<string, any>,
  callback: (value: any) => void
): any => {
  const objClone = copyObj(obj);
  if (!isObject(obj) || instanceOfStore(obj)) return callback(obj);
  for (const x in obj) {
    objClone[x] = iterateStore(obj[x], callback);
  }
  return objClone;
};

export default iterateStore;
