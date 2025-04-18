import { Controller, useForm, type SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";
import { useYupValidationResolver } from "./hooks/use-yup-validation-resolver";
import {
  registrationSchema,
  type RegistrationFormValues,
} from "./schemas/registration-schema";
import { cn } from "@/utils/cn";
import { ErrorMessage } from "@hookform/error-message";

const inputClass = (hasError: boolean) =>
  cn(
    "w-full rounded-xl border p-3 text-sm outline-none bg-gray-900",
    hasError ? "border-red-500" : "border-gray-700 focus:border-blue-500"
  );

const defaultValues: Partial<RegistrationFormValues> = {
  fullName: "",
  email: "",
  password: "",
  confirmPassword: "",
  age: undefined,
};

export const Form = () => {
  const resolver = useYupValidationResolver(registrationSchema);

  const {
    handleSubmit,
    control,
    formState: { errors, isValid },
    reset,
  } = useForm<RegistrationFormValues>({
    resolver,
    defaultValues,
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

      <div>
        <Controller
          name="fullName"
          control={control}
          render={({ field }) => (
            <input
              {...field}
              type="text"
              placeholder="Full Name"
              aria-invalid={!!errors.fullName}
              aria-errormessage={errors.fullName ? "fullName-error" : undefined}
              className={inputClass(!!errors.fullName)}
            />
          )}
        />
        <ErrorMessage
          errors={errors}
          name="fullName"
          render={({ message }) => (
            <p id="fullName-error" className="text-sm text-red-400 mt-1">
              {message}
            </p>
          )}
        />
      </div>

      <div>
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <input
              {...field}
              type="email"
              placeholder="Email"
              aria-invalid={!!errors.email}
              aria-errormessage={errors.email ? "email-error" : undefined}
              className={inputClass(!!errors.email)}
            />
          )}
        />
        <ErrorMessage
          errors={errors}
          name="email"
          render={({ message }) => (
            <p id="email-error" className="text-sm text-red-400 mt-1">
              {message}
            </p>
          )}
        />
      </div>

      <div>
        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <input
              {...field}
              type="password"
              placeholder="Password"
              aria-invalid={!!errors.password}
              aria-errormessage={errors.password ? "password-error" : undefined}
              className={inputClass(!!errors.password)}
            />
          )}
        />
        <ErrorMessage
          errors={errors}
          name="password"
          render={({ message }) => (
            <p id="password-error" className="text-sm text-red-400 mt-1">
              {message}
            </p>
          )}
        />
      </div>

      <div>
        <Controller
          name="confirmPassword"
          control={control}
          render={({ field }) => (
            <input
              {...field}
              type="password"
              placeholder="Confirm Password"
              aria-invalid={!!errors.confirmPassword}
              aria-errormessage={
                errors.confirmPassword ? "confirmPassword-error" : undefined
              }
              className={inputClass(!!errors.confirmPassword)}
            />
          )}
        />
        <ErrorMessage
          errors={errors}
          name="confirmPassword"
          render={({ message }) => (
            <p id="confirmPassword-error" className="text-sm text-red-400 mt-1">
              {message}
            </p>
          )}
        />
      </div>

      <div>
        <Controller
          name="age"
          control={control}
          render={({ field }) => (
            <input
              {...field}
              type="number"
              placeholder="Age"
              aria-invalid={!!errors.age}
              aria-errormessage={errors.age ? "age-error" : undefined}
              className={inputClass(!!errors.age)}
              value={field.value ?? ""}
            />
          )}
        />
        <ErrorMessage
          errors={errors}
          name="age"
          render={({ message }) => (
            <p id="age-error" className="text-sm text-red-400 mt-1">
              {message}
            </p>
          )}
        />
      </div>

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
