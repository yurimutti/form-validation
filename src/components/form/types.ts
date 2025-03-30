import type { RegistrationFormValues } from "./schemas/registration-schema";

export type Field = {
  name: keyof RegistrationFormValues;
  type: string;
  placeholder: string;
  autoFocus?: boolean;
};