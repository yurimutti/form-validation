import { useCallback } from "react";
import * as yup from "yup";

export const useYupValidationResolver = <T extends yup.AnyObject>(
  validationSchema: yup.ObjectSchema<T>
) =>
  useCallback(async (data: T) => {
    try {
      const values = await validationSchema.validate(data, {
        abortEarly: false,
      });

      return {
        values,
        errors: {},
      };
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        return {
          values: {},
          errors: error.inner.reduce(
            (allErrors, currentError) => ({
              ...allErrors,
              [currentError.path!]: {
                type: currentError.type ?? "validation",
                message: currentError.message,
              },
            }),
            {}
          ),
        };
      }

      return {
        values: {},
        errors: {},
      };
    }
  }, [validationSchema]);