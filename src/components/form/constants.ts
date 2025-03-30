import type { Field } from "./types";


export const fields: Field[] = [
  { name: "fullName", type: "text", placeholder: "Full Name", autoFocus: true },
  { name: "email", type: "email", placeholder: "Email" },
  { name: "password", type: "password", placeholder: "Password" },
  { name: "confirmPassword", type: "password", placeholder: "Confirm Password" },
  { name: "age", type: "number", placeholder: "Age" },
];