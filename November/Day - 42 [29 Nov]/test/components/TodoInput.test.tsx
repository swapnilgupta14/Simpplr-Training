import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import TodoInput from "../../src/components/TodoInput";
import { it, expect, describe, vi } from 'vitest'

describe("TodoInput Component", () => {
    it("renders input field and button", () => {
        render(<TodoInput onAddTask={vi.fn()} />);

        expect(screen.getByPlaceholderText(/Enter a new task/i)).toBeInTheDocument();
        expect(screen.getByRole("button", { name: /Add Task/i })).toBeInTheDocument();
    });

    it("should call onAddTask with correct input", () => {
        const mockOnAddTask = vi.fn();
        render(<TodoInput onAddTask={mockOnAddTask} />);

        const input = screen.getByPlaceholderText(/Enter a new task/i);
        const button = screen.getByRole("button", { name: /Add Task/i });

        fireEvent.change(input, { target: { value: "New Task 1" } });
        fireEvent.click(button);

        expect(mockOnAddTask).toHaveBeenCalledWith("New Task 1");
        expect(mockOnAddTask).toHaveBeenCalledTimes(1);
    });

    it("should clear input after adding a task", () => {
        const mockOnAddTask = vi.fn();
        render(<TodoInput onAddTask={mockOnAddTask} />);

        const input = screen.getByPlaceholderText(/Enter a new task/i);
        const button = screen.getByRole("button", { name: /Add Task/i });

        fireEvent.change(input, { target: { value: "Another Task to check" } });
        fireEvent.click(button);

        expect(input).toHaveValue("");
    });

    it("should show an alert if task is empty", () => {
        const mockOnAddTask = vi.fn();
        window.alert = vi.fn();

        render(<TodoInput onAddTask={mockOnAddTask} />);

        const button = screen.getByRole("button", { name: /Add Task/i });
        fireEvent.click(button);

        expect(window.alert).toHaveBeenCalledWith("Please enter a task");
    });
});
