/* eslint-disable @typescript-eslint/no-explicit-any */
import { z } from "zod";

const validateZod = <T,>(data: T, schema: z.ZodType<T>) => {
  let errors = { ...data };
  try {
    schema.parse(data);
  } catch (e) {
    if (e instanceof z.ZodError) {
      errors = e.issues.reduce((acc: any, error) => {
        acc[error.path.join(".")] = error.message;
        return acc;
      }, {} as T);
    }
    return errors;
  }
};

export default validateZod;
