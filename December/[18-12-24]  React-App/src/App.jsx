import { useState } from 'react';
import { QueryClientProvider } from 'react-query';
import { queryClient } from './config/queryClient';
import Users from './components/Users';
import NewUserModal from './components/NewUserModal';

const App = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <QueryClientProvider client={queryClient}>
      <div className="container mx-auto px-4">
        <header className="flex justify-between items-center py-4">
          <h1 className="text-3xl font-bold">User Management</h1>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
          >
            + Create New User
          </button>
        </header>
        <Users />
        <NewUserModal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)}
        />
      </div>
    </QueryClientProvider>
  );
};

export default App;