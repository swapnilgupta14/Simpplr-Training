// import { useEffect } from "react";
import { DashboardContentProps } from "../types";

const AdminDashboard: React.FC<DashboardContentProps> = ({ todos }) => {
  // console.log(todos);

  return (
    <div className="w-[70%] grid grid-cols-1 md:grid-cols-4 gap-6">
       <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-4">Total Users</h3>
        <p className="text-3xl font-medium text-blue-500">2</p>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-4">Total Tasks Created</h3>
        <p className="text-3xl font-medium text-black">{todos.length}</p>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-4">Total Completed Tasks</h3>
        <p className="text-3xl font-medium text-green-600">
          {todos.filter(todo => todo.completed).length}
        </p>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-4">Total Pending Todos</h3>
        <p className="text-3xl font-medium text-yellow-600">
          {todos.filter(todo => !todo.completed).length}
        </p>
      </div>

      <div className="col-span-full bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-4">All Taks</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-3 text-left">Task ID</th>
                <th className="p-3 text-left">Username</th>
                <th className="p-3 text-left">User ID</th>
                <th className="p-3 text-left">Task Label</th>
                <th className="p-3 text-left">Status</th>
                <th className="p-3 text-left">Created At</th>
              </tr>
            </thead>
            <tbody>
              {todos.map(todo => (
                <tr key={todo.id} className="border-b">
                  <td className="p-3">{todo.id}</td>
                  <td className="p-3">{todo.username}</td>
                  <td className="p-3">{todo.userId}</td>
                  <td className="p-3">{todo.text}</td>
                  <td className="p-3">
                    <span
                      className={`px-3 py-1 rounded-full text-xs ${todo.completed
                          ? 'bg-green-200 text-green-800'
                          : 'bg-yellow-200 text-yellow-800'
                        }`}
                    >
                      {todo.completed ? 'Completed' : 'Pending'}
                    </span>
                  </td>
                  <td className="p-3">
                    {new Date(todo.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;