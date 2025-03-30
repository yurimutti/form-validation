import { createFileRoute } from "@tanstack/react-router";
import { useForm, type SubmitHandler } from "react-hook-form";

// Part 2: Add Validation Logic
// Objective:
// Incorporate validation for the form fields.

// Tasks:
// Implement validation for each field:
// Full Name: Required, minimum 3 characters.
// Email: Required, valid email format.
// Password: Required, minimum 8 characters, must include at least one number and one special character.
// Confirm Password: Must match the Password field.
// Age: Optional, must be a number greater than or equal to 18.
// Display error messages for invalid fields.
// Disable the "Submit" button if the form has any validation errors.
// Requirements:
// Use custom validation logic or a library (e.g., Yup, React Hook Form, or Formik).
// Ensure validation messages appear dynamically as the user interacts with the form.


type FormValues = {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  age: number | "";
};

export const Route = createFileRoute("/")({
  component: App,
});

function App() {
  const { register, handleSubmit } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = data => console.log(data);

  return (
    <div className="text-center">
      <header className="min-h-screen flex flex-col items-center justify-center bg-[#282c34] text-white text-[calc(10px+2vmin)]">
        <div className="flex min-h-screen items-center justify-center text-white px-4">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full max-w-md space-y-4 rounded-2xl bg-gray-800 p-8 shadow-lg"
          >
            <h1 className="text-2xl font-bold mb-4 text-center">
              Registration Form
            </h1>

            <input
              type="text"
              placeholder="Full Name"
              {...register("fullName")}
              className="w-full rounded-xl border border-gray-700 bg-gray-900 p-3 text-sm outline-none focus:border-blue-500"
            />

            <input
              type="email"
              placeholder="Email"
              {...register("email")}
              className="w-full rounded-xl border border-gray-700 bg-gray-900 p-3 text-sm outline-none focus:border-blue-500"
            />

            <input
              type="password"
              {...register("password")}
              placeholder="Password"
              className="w-full rounded-xl border border-gray-700 bg-gray-900 p-3 text-sm outline-none focus:border-blue-500"
            />

            <input
              type="password"
              {...register("confirmPassword")}
              placeholder="Confirm Password"
              className="w-full rounded-xl border border-gray-700 bg-gray-900 p-3 text-sm outline-none focus:border-blue-500"
            />

            <input
              type="number"
              placeholder="Age"
              {...register("age")}
              className="w-full rounded-xl border border-gray-700 bg-gray-900 p-3 text-sm outline-none focus:border-blue-500"
            />

            <button
              type="submit"
              className="w-full rounded-xl bg-blue-600 p-3 font-semibold hover:bg-blue-700 transition-colors cursor-pointer"
            >
              Submit
            </button>
          </form>
        </div>
      </header>
    </div>
  );
}
