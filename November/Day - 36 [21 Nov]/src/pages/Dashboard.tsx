import React from 'react';
import { useAppSelector, useAppDispatch } from '../redux/store';
import { logout } from '../redux/authSlice';
import { useNavigate } from 'react-router-dom';
import AdminDashboard from './AdminDashboard';
import UserDashboard from './UserDashboard';

const Dashboard: React.FC = () => {
  const { user } = useAppSelector(state => state.auth);
  const { todos } = useAppSelector(state => state.todos);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const userTodos = user?.role === 'admin' 
    ? todos 
    : todos.filter(todo => todo.userId === user?.id);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-gray-800">
              {user?.role === 'admin' ? 'Admin' : 'User'} Dashboard
            </h1>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-gray-600">
              Welcome, {user?.username}
            </span>
            <button 
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-6 flex justify-center items-center">
        {user?.role === 'admin' ? (
          <AdminDashboard todos={userTodos} />
        ) : (
          <UserDashboard todos={userTodos} />
        )}
      </div>
    </div>
  );
};

export default Dashboard;