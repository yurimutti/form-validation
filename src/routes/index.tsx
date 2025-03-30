import { createFileRoute } from "@tanstack/react-router";
import { useCallback } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import * as yup from "yup";

const validationSchema = yup.object({
  fullName: yup
    .string()
    .required("Full Name is required")
    .min(3, "Full Name must be at least 3 characters"),
  email: yup
    .string()
    .required("Email is required")
    .email("Invalid email format"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .matches(/\d/, "Password must contain at least one number")
    .matches(
      /[^a-zA-Z0-9]/,
      "Password must contain at least one special character"
    ),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Confirm Password is required"),
  age: yup
    .number()
    .transform((value) => (isNaN(value) ? undefined : value))
    .nullable()
    .optional()
    .min(18, "You must be at least 18"),
});

type FormValues = yup.InferType<typeof validationSchema>;

const useYupValidationResolver = (
  validationSchema: yup.ObjectSchema<FormValues>
) =>
  useCallback(
    async (data: FormValues) => {
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
    },
    [validationSchema]
  );

export const Route = createFileRoute("/")({
  component: App,
});

function App() {
  const resolver = useYupValidationResolver(validationSchema);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm<FormValues>({
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

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log("Submitted Data:", data);
    alert("Form submitted successfully!");
    reset();
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#282c34] text-white px-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md space-y-4 rounded-2xl bg-gray-800 p-8 shadow-lg"
      >
        <h1 className="text-2xl font-bold mb-4 text-center">
          Registration Form
        </h1>

        <div>
          <input
            type="text"
            placeholder="Full Name"
            {...register("fullName")}
            className={`w-full rounded-xl border p-3 text-sm outline-none ${
              errors.fullName
                ? "border-red-500 bg-gray-900"
                : "border-gray-700 bg-gray-900 focus:border-blue-500"
            }`}
          />
          {errors.fullName && (
            <p className="text-sm text-red-400 mt-1">
              {errors.fullName.message}
            </p>
          )}
        </div>

        <div>
          <input
            type="email"
            placeholder="Email"
            {...register("email")}
            className={`w-full rounded-xl border p-3 text-sm outline-none ${
              errors.email
                ? "border-red-500 bg-gray-900"
                : "border-gray-700 bg-gray-900 focus:border-blue-500"
            }`}
          />
          {errors.email && (
            <p className="text-sm text-red-400 mt-1">{errors.email.message}</p>
          )}
        </div>

        <div>
          <input
            type="password"
            {...register("password")}
            placeholder="Password"
            className={`w-full rounded-xl border p-3 text-sm outline-none ${
              errors.password
                ? "border-red-500 bg-gray-900"
                : "border-gray-700 bg-gray-900 focus:border-blue-500"
            }`}
          />
          {errors.password && (
            <p className="text-sm text-red-400 mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        <div>
          <input
            type="password"
            {...register("confirmPassword")}
            placeholder="Confirm Password"
            className={`w-full rounded-xl border p-3 text-sm outline-none ${
              errors.confirmPassword
                ? "border-red-500 bg-gray-900"
                : "border-gray-700 bg-gray-900 focus:border-blue-500"
            }`}
          />
          {errors.confirmPassword && (
            <p className="text-sm text-red-400 mt-1">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        <div>
          <input
            type="number"
            placeholder="Age"
            {...register("age")}
            className={`w-full rounded-xl border p-3 text-sm outline-none ${
              errors.age
                ? "border-red-500 bg-gray-900"
                : "border-gray-700 bg-gray-900 focus:border-blue-500"
            }`}
          />
          {errors.age && (
            <p className="text-sm text-red-400 mt-1">{errors.age.message}</p>
          )}
        </div>

        <div className="flex gap-2">
          <button
            type="submit"
            disabled={!isValid}
            className={`w-full rounded-xl p-3 font-semibold transition-colors cursor-pointer ${
              isValid
                ? "bg-blue-600 hover:bg-blue-700"
                : "bg-gray-700 cursor-not-allowed"
            }`}
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
    </div>
  );
}
