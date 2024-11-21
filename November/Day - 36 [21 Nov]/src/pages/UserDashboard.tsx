import { useState } from 'react';
import {
    addTodo,
    toggleTodo,
    deleteTodo,
    editTodo
} from '../redux/todoSlice';
import { Todo } from '../types';
import { DashboardContentProps } from '../types';
import { useAppSelector, useAppDispatch } from '../redux/store';

const UserDashboard: React.FC<DashboardContentProps> = ({ todos }) => {
    const dispatch = useAppDispatch();
    const { user } = useAppSelector(state => state.auth);
    const [newTodo, setNewTodo] = useState('');
    const [editingTodo, setEditingTodo] = useState<Todo | null>(null);

    const handleAddTodo = (e: React.FormEvent) => {
        e.preventDefault();
        if (newTodo.trim() && user) {
            dispatch(addTodo({
                text: newTodo.trim(),
                userId: user.id,
                username: user.username
            }));
            setNewTodo('');
        }
    };

    const handleUpdateTodo = (e: React.FormEvent) => {
        e.preventDefault();
        if (editingTodo) {
            dispatch(editTodo({
                id: editingTodo.id,
                text: editingTodo.text
            }));
            setEditingTodo(null);
        }
    };

    const handleDoubleClick = (todo: Todo) => {
        setEditingTodo(todo);
    };

    return (
        <div className="w-[70%] grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-4">Create Task</h3>
                <form onSubmit={handleAddTodo} className="flex">
                    <input
                        type="text"
                        value={newTodo}
                        onChange={(e) => setNewTodo(e.target.value)}
                        placeholder="Enter a new todo"
                        className="flex-grow px-3 py-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-2 rounded-r-md hover:bg-blue-600"
                    >
                        Add Todo
                    </button>
                </form>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-lg shadow-md text-center flex flex-col items-center justify-start">
                    <h4 className="text-gray-600">Total Tasks</h4>
                    <div className=" flex-1 flex items-center justify-center text-3xl font-medium text-black">{todos.length}</div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-md text-center flex flex-col items-center justify-start">
                    <h4 className="text-gray-600">Completed</h4>
                    <div className="flex-1 flex items-center justify-center text-3xl font-medium text-green-600">
                        {todos.filter(todo => todo.completed).length}
                    </div>
                </div>
            </div>

            <div className="col-span-full bg-white p-6 rounded-lg shadow-md select-none">
                <h3 className="text-xl font-semibold mb-4">My Tasks</h3>
                <div className="space-y-4">
                    {todos.map(todo => (
                        <div
                            key={todo.id}
                            className="flex items-center justify-between p-4 bg-gray-50 rounded-md"
                        >
                            {editingTodo?.id === todo.id ? (
                                <form
                                    onSubmit={handleUpdateTodo}
                                    className="flex-grow flex"
                                >
                                    <input
                                        type="text"
                                        value={editingTodo.text}
                                        onChange={(e) => setEditingTodo({
                                            ...editingTodo,
                                            text: e.target.value
                                        })}
                                        className="flex-grow px-2 py-2 border rounded mr-2 text-base"
                                        autoFocus
                                    />
                                    <button
                                        type="submit"
                                        className="bg-green-200 text-green-900 px-3 py-2 rounded mr-2"
                                    >
                                        Save
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setEditingTodo(null)}
                                        className="bg-red-200 text-red-900 px-3 py-2 rounded"
                                    >
                                        Cancel
                                    </button>
                                </form>
                            ) : (
                                <>
                                    <div
                                        className="flex items-center flex-grow"
                                        onDoubleClick={() => handleDoubleClick(todo)}
                                    >
                                        <span
                                            className={`flex-grow text-base ${todo.completed ? 'line-through text-gray-500' : ''}`}
                                        >
                                            {todo.text}
                                        </span>
                                    </div>
                                    <div className="flex space-x-2">
                                        <button
                                            onClick={() => dispatch(toggleTodo(todo.id))}
                                            className={`
                                                px-3 py-2 rounded text-sm
                                                ${todo.completed
                                                    ? 'bg-yellow-200 text-yellow-500'
                                                    : 'bg-green-200 text-green-900'}
                                            `}
                                        >
                                            {todo.completed ? 'Undo' : 'Complete'}
                                        </button>
                                        <button
                                            onClick={() => dispatch(deleteTodo(todo.id))}
                                            className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default UserDashboard;