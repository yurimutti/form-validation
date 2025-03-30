import { createFileRoute } from "@tanstack/react-router";
import { Form } from "react-hook-form";

export const Route = createFileRoute("/")({
  component: App,
});

function App() {

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#282c34] text-white px-4">
      <Form />
    </div>
  );
}
