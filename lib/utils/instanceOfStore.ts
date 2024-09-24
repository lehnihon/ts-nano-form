import { Store } from "../types";
/* eslint-disable @typescript-eslint/no-explicit-any */
const instanceOfStore = (object: any): object is Store =>
  typeof object === "object" && "subscribe" in object;

export default instanceOfStore;
