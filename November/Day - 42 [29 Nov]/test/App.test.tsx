import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import App from "../src/App";
import { it, expect, describe } from 'vitest'

describe("App Component", () => {
    it("should add a new task to the list", () => {
        render(<App />);

        const input = screen.getByPlaceholderText(/Enter a new task/i);
        const button = screen.getByRole("button", { name: /Add Task/i });

        fireEvent.change(input, { target: { value: "Learn Testing with react + TSC + Vitest" } });
        fireEvent.click(button);

        expect(screen.getByText("Learn Testing with react + TSC + Vitest")).toBeInTheDocument();
    });

    it("should remove a task from the list", () => {
        render(<App />);

        const input = screen.getByPlaceholderText(/Enter a new task/i);
        const button = screen.getByRole("button", { name: /Add Task/i });

        fireEvent.change(input, { target: { value: "Task to Remove" } });
        fireEvent.click(button);

        const removeButton = screen.getByRole("button", { name: /Remove/i });
        fireEvent.click(removeButton);

        expect(screen.queryByText("Task to Remove")).not.toBeInTheDocument();
    });
});
