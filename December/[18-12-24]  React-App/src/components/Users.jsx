import { UserIcon, Loader2 } from "lucide-react";
import { useUsers } from '../hooks/useUsers';

const Users = () => {
  const { data: users, isLoading, error } = useUsers();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="animate-spin text-blue-500" size={48} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Error! </strong>
          <span className="block sm:inline">
            {error.message || "Failed to load users"}
          </span>
        </div>
      </div>
    );
  }

  if (!users || users.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded relative">
          <span className="block sm:inline">No users found</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {users.map((user) => (
          <div
            key={user.id}
            className="group cursor-pointer"
          >
            <div
              className="bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden 
              transform transition-all duration-300 
              hover:-translate-y-2 hover:shadow-xl
              relative"
            >
              <div className="p-6">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-16 h-16 rounded-full object-cover border-2 bg-gray-100 border-gray-400 flex items-center justify-center">
                    <UserIcon className="text-gray-500" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-800">
                      {user.name}
                    </h2>
                    <p className="text-sm text-gray-500">{user.occupation}</p>
                  </div>
                </div>
                <div className="space-y-2 text-gray-600 text-xs">
                  <div className="flex justify-between border-b pb-1 border-gray-100">
                    <span className="font-medium text-gray-500">Email</span>
                    <span className="text-gray-700 truncate max-w-[200px]">
                      {user.email}
                    </span>
                  </div>
                  <div className="flex justify-between border-b pb-1 border-gray-100">
                    <span className="font-medium text-gray-500">Age</span>
                    <span className="text-gray-700">{user.age}</span>
                  </div>
                  <div className="flex justify-between border-b pb-1 border-gray-100">
                    <span className="font-medium text-gray-500">City</span>
                    <span className="text-gray-700">{user.city}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Users;