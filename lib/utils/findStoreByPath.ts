/* eslint-disable @typescript-eslint/no-explicit-any */
import { get, has, set } from ".";
import createStore from "../store";

const findStoreByPath = (obj: Record<string, any>, path: string | string[]) => {
  if (!has(obj, path)) set(obj, path, createStore());
  return get(obj, path);
};

export default findStoreByPath;
