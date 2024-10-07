/* eslint-disable @typescript-eslint/no-explicit-any */
import { AnyObject, ObjectSchema, ValidationError } from "yup";

const validateYup = <T,>(schema: ObjectSchema<AnyObject>) => {
  return (data: T) => {
    let errors = { ...data };
    try {
      schema.validateSync(data, { abortEarly: false });
    } catch (e) {
      if (e instanceof ValidationError) {
        errors = e.inner.reduce((acc: any, error) => {
          acc[error.path!] = error.message;
          return acc;
        }, {} as T);
      }

      return errors;
    }
  };
};

export default validateYup;
