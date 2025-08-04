/* eslint-disable @typescript-eslint/no-explicit-any */
const unflattenObject = (obj: Record<string, any>): any => {
  const result: any = {};

  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const parts = key.split(".");
      let current: any = result;

      for (let i = 0; i < parts.length; i++) {
        const part = parts[i];
        const isLastPart = i === parts.length - 1;
        const isArrayIndex = /^\d+$/.test(parts[i + 1]); // Check if next part is an array index

        if (isLastPart) {
          current[part] = obj[key];
        } else {
          if (!current[part]) {
            current[part] = isArrayIndex ? [] : {};
          }
          current = current[part];
        }
      }
    }
  }
  return result;
};
export default unflattenObject;
