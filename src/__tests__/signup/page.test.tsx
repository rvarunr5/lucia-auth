import SignupPage from "@/app/signup/page";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";

describe("Signup", () => {
  it("renders sign-up form", () => {
    render(<SignupPage />);
    expect(screen.getByLabelText(/email/i)).toBeDefined();
    expect(screen.getByLabelText("Password")).toBeDefined();
    expect(screen.getByLabelText(/password confirmation/i)).toBeDefined();
    expect(screen.getByRole("button", { name: /sign up/i })).toBeDefined();
  });
});
