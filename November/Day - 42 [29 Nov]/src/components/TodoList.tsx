import React from "react";
import { Todo } from "../types";

interface TodoListProps {
  todos: Todo[];
  onRemoveTask: (id: number) => void;
}

const TodoList: React.FC<TodoListProps> = ({ todos, onRemoveTask }) => {
  return (
    <ul className="mt-4 space-y-2">
      {todos.length === 0 ? (
        <li className="text-center text-gray-500">No tasks available</li>
      ) : (
        todos.map((todo) => (
          <li
            key={todo.id}
            className="flex justify-between items-center bg-gray-200 px-4 py-2 rounded-lg"
          >
            <span>{todo.task}</span>
            <button
              onClick={() => onRemoveTask(todo.id)}
              className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
            >
              Remove
            </button>
          </li>
        ))
      )}
    </ul>
  );
};

export default TodoList;
