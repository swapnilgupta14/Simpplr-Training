import React, { useEffect } from 'react';
import { useAppSelector } from '../redux/store';
// import { logout } from '../redux/authSlice';
import { useNavigate } from 'react-router-dom';
import AdminDashboard from './AdminDashboard';
import UserDashboard from './UserDashboard';

const Dashboard: React.FC = () => {
  const { user } = useAppSelector(state => state.auth);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userCurrent");
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-zinc-200">
      <div className="w-full overflow-x-hidden">
        {user?.role === 'Admin' ? (
          <AdminDashboard />
        ) : (
          <UserDashboard />
        )}
      </div>
    </div>
  );
};

export default Dashboard;
