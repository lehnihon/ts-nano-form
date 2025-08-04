/* eslint-disable @typescript-eslint/no-explicit-any */
const flattenObject = (obj: any, prefix = ""): Record<string, any> => {
  const result: Record<string, any> = {};

  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const newKey = prefix ? `${prefix}.${key}` : key;

      if (
        typeof obj[key] === "object" &&
        obj[key] !== null &&
        !Array.isArray(obj[key])
      ) {
        // Recursively flatten nested objects
        Object.assign(result, flattenObject(obj[key], newKey));
      } else if (Array.isArray(obj[key])) {
        // Flatten arrays by treating each element as a sub-object
        obj[key].forEach((item: any, index: number) => {
          if (typeof item === "object" && item !== null) {
            Object.assign(result, flattenObject(item, `${newKey}.${index}`));
          } else {
            result[`${newKey}.${index}`] = item;
          }
        });
      } else {
        // Assign primitive values directly
        result[newKey] = obj[key];
      }
    }
  }
  return result;
};

export default flattenObject;
