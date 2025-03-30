import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";

export const Route = createFileRoute("/")({
  component: App,
});

function App() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    age: "",
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log(formData);
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
              onChange={(e) =>
                setFormData({ ...formData, fullName: e.target.value })
              }
              className="w-full rounded-xl border border-gray-700 bg-gray-900 p-3 text-sm outline-none focus:border-blue-500"
            />

            <input
              type="email"
              name="email"
              placeholder="Email"
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="w-full rounded-xl border border-gray-700 bg-gray-900 p-3 text-sm outline-none focus:border-blue-500"
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              className="w-full rounded-xl border border-gray-700 bg-gray-900 p-3 text-sm outline-none focus:border-blue-500"
            />

            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              onChange={(e) =>
                setFormData({
                  ...formData,
                  confirmPassword: e.target.value,
                })
              }
              className="w-full rounded-xl border border-gray-700 bg-gray-900 p-3 text-sm outline-none focus:border-blue-500"
            />

            <input
              type="number"
              name="age"
              placeholder="Age"
              onChange={(e) =>
                setFormData({ ...formData, age: e.target.value })
              }
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
