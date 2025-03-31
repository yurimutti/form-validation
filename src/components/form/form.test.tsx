import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Form } from "./";

describe("<Form />", () => {
  it("should show required errors when fields are empty", async () => {
    render(<Form />);

    fireEvent.submit(screen.getByRole("button", { name: /submit/i }));

    await waitFor(() => {
      expect(
        screen.getByText(/full name must be at least 3 characters/i)
      ).toBeInTheDocument();
      expect(screen.getByText(/email is required/i)).toBeInTheDocument();
      expect(
        screen.getByText(/password must contain at least one special character/i)
      ).toBeInTheDocument();
      expect(
        screen.getByText(/confirm password is required/i)
      ).toBeInTheDocument();
      expect(screen.getByText(/age is required/i)).toBeInTheDocument();
    });
  });

  it("should show validation errors when values are invalid", async () => {
    render(<Form />);

    fireEvent.input(screen.getByPlaceholderText(/full name/i), {
      target: { value: "Yu" },
    });
    fireEvent.input(screen.getByPlaceholderText(/email/i), {
      target: { value: "invalid-email" },
    });
    const passwordInputs = screen.getAllByPlaceholderText(/password/i);
    fireEvent.input(passwordInputs[0], { target: { value: "123" } });
    fireEvent.input(passwordInputs[1], { target: { value: "456" } });
    fireEvent.input(screen.getByPlaceholderText(/age/i), {
      target: { value: 15 },
    });

    fireEvent.submit(screen.getByRole("button", { name: /submit/i }));

    await waitFor(() => {
      expect(
        screen.getByText(/full name must be at least 3 characters/i)
      ).toBeInTheDocument();
      expect(screen.getByText(/invalid email format/i)).toBeInTheDocument();
      expect(
        screen.getByText(/password must contain at least one special character/i)
      ).toBeInTheDocument();
      expect(screen.getByText(/passwords must match/i)).toBeInTheDocument();
      expect(screen.getByText(/you must be at least 18/i)).toBeInTheDocument();
    });
  });

  it("should submit form when values are valid and reset fields", async () => {
    render(<Form />);

    fireEvent.input(screen.getByPlaceholderText(/full name/i), {
      target: { value: "Yuri Mutti" },
    });
    fireEvent.input(screen.getByPlaceholderText(/email/i), {
      target: { value: "yuri@mutti.com" },
    });
    const passwordInputs = screen.getAllByPlaceholderText(/password/i);
    fireEvent.input(passwordInputs[0], { target: { value: "Password@123" } });
    fireEvent.input(passwordInputs[1], { target: { value: "Password@123" } });
    fireEvent.input(screen.getByPlaceholderText(/age/i), {
      target: { value: 25 },
    });

    fireEvent.submit(screen.getByRole("button", { name: /submit/i }));

    await waitFor(() => {
      expect(
        screen.getByPlaceholderText(/full name/i)
      ).toHaveValue("");
      expect(screen.getByPlaceholderText(/email/i)).toHaveValue("");
      const passwordInputsAfter = screen.getAllByPlaceholderText(/password/i);
      expect(passwordInputsAfter[0]).toHaveValue("");
      expect(passwordInputsAfter[1]).toHaveValue("");
      expect(screen.getByPlaceholderText(/age/i)).toHaveValue(null);
    });
  });
});
