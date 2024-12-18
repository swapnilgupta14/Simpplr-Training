import { useState, useEffect } from "react";
import { useCreateUser } from "../hooks/useUsers";
import { AlertCircle, Check } from "lucide-react";

export const NewUserModal = ({ isOpen, onClose }) => {
  const createUserMutation = useCreateUser();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    age: "",
    occupation: "",
    city: "",
  });
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    if (isOpen) {
      setFormData({
        name: "",
        email: "",
        age: "",
        occupation: "",
        city: "",
      });
      setFormErrors({});
    }
  }, [isOpen]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    if (formErrors[name]) {
      setFormErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.name.trim()) {
      errors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Email is invalid";
    }

    if (!formData.age.trim()) {
      errors.age = "Age is required";
    } else if (isNaN(Number(formData.age)) || Number(formData.age) <= 0) {
      errors.age = "Age must be a positive number";
    }

    if (!formData.occupation.trim()) {
      errors.occupation = "Occupation is required";
    }

    if (!formData.city.trim()) {
      errors.city = "City is required";
    }

    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const errors = validateForm();

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    // Convert age to number
    const userData = {
      ...formData,
      age: parseInt(formData.age),
    };

    createUserMutation.mutate(userData, {
      onSuccess: () => {
        // Reset form and close modal
        setFormData({
          name: "",
          email: "",
          age: "",
          occupation: "",
          city: "",
        });
        onClose();
      },
      onError: (error) => {
        // Handle API errors
        console.error("Error creating user:", error);
      },
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-xl mx-4 max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800">Create New User</h2>
          <p className="text-gray-600 mt-2">
            Fill out the form to create a new user
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {["name", "email", "age", "occupation", "city"].map((field) => (
            <div key={field} className="space-y-2">
              <label
                htmlFor={field}
                className="block text-sm font-medium text-gray-700 capitalize"
              >
                {field}
              </label>
              <input
                type={
                  field === "email"
                    ? "email"
                    : field === "age"
                    ? "number"
                    : "text"
                }
                id={field}
                name={field}
                value={formData[field]}
                onChange={handleInputChange}
                className={`mt-1 block w-full px-3 py-2 bg-white border rounded-md shadow-sm focus:outline-none focus:ring-2 
                  ${
                    formErrors[field]
                      ? "border-red-500 focus:ring-red-500"
                      : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                  }`}
              />
              {formErrors[field] && (
                <p className="mt-1 text-xs text-red-500 flex items-center">
                  <AlertCircle className="mr-1 inline-block" size={14} />
                  {formErrors[field]}
                </p>
              )}
            </div>
          ))}

          <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
            >
              Close
            </button>
            <button
              type="submit"
              disabled={createUserMutation.isLoading}
              className={`px-4 py-2 rounded-md transition-colors flex items-center
                ${
                  createUserMutation.isLoading
                    ? "bg-blue-300 text-white cursor-not-allowed"
                    : "bg-blue-600 text-white hover:bg-blue-700"
                }`}
            >
              {createUserMutation.isLoading ? (
                <span className="mr-2 animate-spin">⏳</span>
              ) : (
                <Check className="mr-2" size={20} />
              )}
              {createUserMutation.isLoading ? "Creating..." : "Create User"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewUserModal;
