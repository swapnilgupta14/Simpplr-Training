import React, { useState } from "react";
import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";
import { Todo } from "./types";

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [currentId, setCurrentId] = useState<number>(1);

  const addTask = (task: string) => {
    const newTodo: Todo = { id: currentId, task };
    setTodos([...todos, newTodo]);
    setCurrentId(currentId + 1);
  };

  const removeTask = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <div className="bg-gray-100 flex justify-center items-center h-screen">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center mb-4">Todo List</h1>
        <TodoInput onAddTask={addTask} />
        <TodoList todos={todos} onRemoveTask={removeTask} />
      </div>
    </div>
  );
};

export default App;
