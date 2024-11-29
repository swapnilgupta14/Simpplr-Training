import React, { useState } from "react";

interface TodoInputProps {
  onAddTask: (task: string) => void;
}

const TodoInput: React.FC<TodoInputProps> = ({ onAddTask }) => {
  const [task, setTask] = useState<string>("");

  const handleAddTask = () => {
    if (task.trim() === "") {
      alert("Please enter a task");
      return;
    }
    onAddTask(task.trim());
    setTask("");
  };

  return (
    <div className="mb-4">
      <input
        type="text"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder="Enter a new task"
        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <div className="flex justify-center mt-2">
        <button
          onClick={handleAddTask}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
        >
          Add Task
        </button>
      </div>
    </div>
  );
};

export default TodoInput;
