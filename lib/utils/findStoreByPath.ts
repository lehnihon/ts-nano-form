import { get, has, set } from ".";
import createStore from "../store";

/* eslint-disable @typescript-eslint/no-explicit-any */
const findStoreByPath = (obj: Record<string, any>, path: string | string[]) => {
  if (!has(obj, path)) set(obj, path, createStore());
  return get(obj, path);
};

export default findStoreByPath;
