import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import TodoList from "../../src/components/TodoList";
import { Todo } from "../../src/types";
import { it, expect, describe, vi } from 'vitest'

describe("TodoList Component", () => {
    const mockTodos: Todo[] = [
        { id: 1, task: "Task 1" },
        { id: 2, task: "Task 2" },
    ];

    it("should display no tasks when todo list is empty", () => {
        render(<TodoList todos={[]} onRemoveTask={vi.fn()} />);

        expect(screen.getByText(/No tasks available/i)).toBeInTheDocument();
    });

    it("should render all tasks correctly", () => {
        render(<TodoList todos={mockTodos} onRemoveTask={vi.fn()} />);

        expect(screen.getByText("Task 1")).toBeInTheDocument();
        expect(screen.getByText("Task 2")).toBeInTheDocument();
    });

    it("should call onRemoveTask with correct ID", () => {
        const mockOnRemoveTask = vi.fn();
        render(<TodoList todos={mockTodos} onRemoveTask={mockOnRemoveTask} />);

        const removeButtons = screen.getAllByRole("button", { name: /Remove/i });

        fireEvent.click(removeButtons[0]); // Remove "Task 1"
        expect(mockOnRemoveTask).toHaveBeenCalledWith(1);
        expect(mockOnRemoveTask).toHaveBeenCalledTimes(1);
    });
});
