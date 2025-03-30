import { Controller, useForm, type SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";
import { useYupValidationResolver } from "./hooks/use-yup-validation-resolver";
import {
  registrationSchema,
  type RegistrationFormValues,
} from "./schemas/registration-schema";
import { cn } from "@/utils/cn";
import { ErrorMessage } from "@hookform/error-message";
import { fields } from "./constants";

const inputClass = (hasError: boolean) =>
  cn(
    "w-full rounded-xl border p-3 text-sm outline-none bg-gray-900",
    hasError ? "border-red-500" : "border-gray-700 focus:border-blue-500"
  );

export const Form = () => {
  const resolver = useYupValidationResolver(registrationSchema);

  const {
    handleSubmit,
    control,
    formState: { errors, isValid },
    reset,
  } = useForm<RegistrationFormValues>({
    resolver,
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
      age: undefined,
    },
    mode: "onChange",
  });

  const onSubmit: SubmitHandler<RegistrationFormValues> = (data) => {
    console.log("Submitted Data:", data);
    toast.success("Form submitted successfully!");
    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full max-w-md space-y-4 rounded-2xl bg-gray-800 p-8 shadow-lg"
    >
      <h1 className="text-2xl font-bold mb-4 text-center">Form Validation</h1>

      {fields.map((field) => (
        <div key={field.name}>
          <Controller
            name={field.name}
            control={control}
            render={({ field: controllerField }) => (
              <input
                {...controllerField}
                aria-invalid={!!errors[field.name]}
                aria-errormessage={
                  errors[field.name] ? `${field.name}-error` : undefined
                }
                type={field.type}
                autoFocus={field.autoFocus}
                placeholder={field.placeholder}
                className={inputClass(!!errors[field.name])}
              />
            )}
          />
          <ErrorMessage
            errors={errors}
            name={field.name}
            render={({ message }) => (
              <p id={`${field.name}-error`} className="text-sm text-red-400 mt-1">
                {message}
              </p>
            )}
          />
        </div>
      ))}

      <div className="flex gap-2">
        <button
          type="submit"
          disabled={!isValid}
          className={cn(
            "w-full rounded-xl p-3 font-semibold transition-colors cursor-pointer",
            isValid
              ? "bg-blue-600 hover:bg-blue-700"
              : "bg-gray-700 cursor-not-allowed"
          )}
        >
          Submit
        </button>

        <button
          type="button"
          onClick={() => reset()}
          className="w-full rounded-xl bg-red-500 p-3 font-semibold hover:bg-red-600 transition-colors cursor-pointer"
        >
          Reset
        </button>
      </div>
    </form>
  );
};
