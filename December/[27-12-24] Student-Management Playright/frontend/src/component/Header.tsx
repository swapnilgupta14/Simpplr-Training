import React from 'react';
import { Plus } from 'lucide-react';

interface HeaderProps {
  onAddStudent: () => void;
}

const Header: React.FC<HeaderProps> = ({ onAddStudent }) => {
  return (
    <header className="flex justify-between items-center mb-6">
      <h1 className="text-2xl font-bold">Student Management</h1>
      <button 
        onClick={onAddStudent}
        className="flex items-center bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
      >
        <Plus className="mr-2" /> Add Student
      </button>
    </header>
  );
};

export default Header;