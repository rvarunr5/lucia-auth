import SignupPage from "@/app/signup/page";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect } from "vitest";

describe("Signup", () => {
  const setup = () => {
    render(<SignupPage />);
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText("Password");
    const passwordConfirmationInput = screen.getByLabelText(
      "Password Confirmation"
    );
    const signUpButton = screen.getByRole("button", { name: /sign up/i });
    return {
      emailInput,
      passwordInput,
      passwordConfirmationInput,
      signUpButton,
    };
  };
  it("renders sign-up form", () => {
    const {
      emailInput,
      passwordInput,
      passwordConfirmationInput,
      signUpButton,
    } = setup();
    expect(emailInput).toBeDefined();
    expect(passwordInput).toBeDefined();
    expect(passwordConfirmationInput).toBeDefined();
    expect(signUpButton).toBeDefined();
  });

  it("validate sign-up form when the sign up button is clicked without any inputs", async () => {
    const { signUpButton } = setup();
    await userEvent.click(signUpButton);

    expect(screen.getByText(/Please enter a valid email/i)).toBeInTheDocument();
    expect(
      screen.getByText("Password must contain at least 8 character(s)")
    ).toBeInTheDocument();
  });

  it("validate email and password confirmation when passwords don't match", async () => {
    const {
      emailInput,
      passwordInput,
      passwordConfirmationInput,
      signUpButton,
    } = setup();
    await userEvent.type(emailInput, "test@example");
    await userEvent.type(passwordInput, "password");
    await userEvent.type(passwordConfirmationInput, "password1");

    await userEvent.click(signUpButton);

    expect(screen.getByText(/Please enter a valid email/i)).toBeInTheDocument();
    expect(screen.getByText(/Passwords don't match/i)).toBeInTheDocument();
  });
});
