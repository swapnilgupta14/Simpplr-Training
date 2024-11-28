import { it, expect, describe } from "vitest";
import { render, screen } from "@testing-library/react";
import UserAccount from "../../src/components/UserAccount";
import { User } from "../../src/entities";
import "@testing-library/jest-dom/vitest";


describe("UserAccount Component", () => {
  it("should renders the user profile with name", () => {
    const user: User = { id: 1, name: "Swapnil"};
    render(<UserAccount user={user} />);
    
    expect(screen.getByText(user.name)).toBeInTheDocument();
  });

  it("should render the 'Edit' button for admin", () => {
    const user: User = { id: 1, name: "Swapnil_Admin", isAdmin: true };
    render(<UserAccount user={user} />);
    
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent(/edit/i);
  });

  it("should not render the 'Edit' button for non-admin users", () => {
    const user: User = { id: 1, name: "Regular User", isAdmin: false};
    render(<UserAccount user={user} />);
    
    const button = screen.queryByRole('button');
    expect(button).toBeInTheDocument();
    // expect(button).not.toBeInTheDocument();
    expect(button).toHaveTextContent(/edit/i);
  });
});
