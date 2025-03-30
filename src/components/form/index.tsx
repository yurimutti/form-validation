import { useForm, type SubmitHandler } from "react-hook-form";
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

export const Form = () => {
  const resolver = useYupValidationResolver(registrationSchema);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm<RegistrationFormValues>({
    resolver: resolver,
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

      <div>
        <input
          aria-invalid={!!errors.fullName}
          aria-errormessage={errors.fullName ? "fullName-error" : undefined}
          autoFocus
          type="text"
          placeholder="Full Name"
          {...register("fullName")}
          className={inputClass(!!errors.fullName)}
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
        <input
          aria-invalid={!!errors.email}
          aria-errormessage={errors.email ? "email-error" : undefined}
          type="email"
          placeholder="Email"
          {...register("email")}
          className={inputClass(!!errors.email)}
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
        <input
          aria-invalid={!!errors.password}
          aria-errormessage={errors.password ? "password-error" : undefined}
          type="password"
          {...register("password")}
          placeholder="Password"
          className={inputClass(!!errors.password)}
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
        <input
          aria-invalid={!!errors.confirmPassword}
          aria-errormessage={
            errors.confirmPassword ? "confirmPassword-error" : undefined
          }
          type="password"
          {...register("confirmPassword")}
          placeholder="Confirm Password"
          className={inputClass(!!errors.confirmPassword)}
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
        <input
          aria-invalid={!!errors.age}
          aria-errormessage={errors.age ? "age-error" : undefined}
          type="number"
          placeholder="Age"
          {...register("age")}
          className={inputClass(!!errors.age)}
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
