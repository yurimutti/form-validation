import { createFileRoute } from "@tanstack/react-router";
import type { FormEvent } from "react";

export const Route = createFileRoute("/")({
  component: App,
});

// Form validation

// Part 1: Basic Form Implementation
// Objective:
// Set up the structure and functionality of the form without validation logic.

// Tasks:
// Create a registration form with the following fields:
// Full Name (text input)
// Email (text input)
// Password (password input)
// Confirm Password (password input)
// Age (number input)
// Add a "Submit" button.
// On submission, log the form data to the console.
// Requirements:
// Use controlled components for form fields.
// Display the submitted data in the console only when the "Submit" button is clicked.

function App() {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log("submited");
  };

  return (
    <div className="text-center">
      <header className="min-h-screen flex flex-col items-center justify-center bg-[#282c34] text-white text-[calc(10px+2vmin)]">
        <div className="flex min-h-screen items-center justify-center text-white px-4">
          <form
            onSubmit={handleSubmit}
            className="w-full max-w-md space-y-4 rounded-2xl bg-gray-800 p-8 shadow-lg"
          >
            <h1 className="text-2xl font-bold mb-4 text-center">
              Registration Form
            </h1>

            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              className="w-full rounded-xl border border-gray-700 bg-gray-900 p-3 text-sm outline-none focus:border-blue-500"
            />

            <input
              type="email"
              name="email"
              placeholder="Email"
              className="w-full rounded-xl border border-gray-700 bg-gray-900 p-3 text-sm outline-none focus:border-blue-500"
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              className="w-full rounded-xl border border-gray-700 bg-gray-900 p-3 text-sm outline-none focus:border-blue-500"
            />

            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              className="w-full rounded-xl border border-gray-700 bg-gray-900 p-3 text-sm outline-none focus:border-blue-500"
            />

            <input
              type="number"
              name="age"
              placeholder="Age"
            
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
