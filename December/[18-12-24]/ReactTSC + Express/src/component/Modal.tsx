import React, { useState, useEffect } from 'react';
import { 
  User, 
  Mail, 
  GraduationCap, 
  Calendar, 
  Building, 
  BookOpen, 
  X, 
  Save 
} from 'lucide-react';
import { Student } from '../types';

interface ModalProps {
    student?: Student | null;
    onClose: () => void;
    onSubmit: (student: Student) => Promise<void>;
}

const Modal: React.FC<ModalProps> = ({ student, onClose, onSubmit }) => {
    const [formData, setFormData] = useState<Student>({
        full_name: '',
        email: '',
        age: 0,
        major: '',
        campus: '',
        college_degree: '',
        branch: '',
        year: ''
    });

    useEffect(() => {
        if (student) {
            setFormData(student);
        }
    }, [student]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await onSubmit(formData);
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-white bg-opacity-50 flex justify-center items-center z-50 p-4">
            <div className="bg-white p-6 rounded-xl w-full max-w-md shadow-2xl">
                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-black flex items-center">
                        <GraduationCap className="mr-3 text-blue-500" size={32} />
                        {student ? 'Edit Student' : 'Add New Student'}
                    </h2>
                    <button 
                        onClick={onClose} 
                        className="text-gray-500 transition"
                    >
                        <X size={28} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <User className="text-gray-400" size={20} />
                        </div>
                        <input
                            type="text"
                            name="full_name"
                            placeholder="Full Name"
                            value={formData.full_name}
                            onChange={handleChange}
                            className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            required
                        />
                    </div>

                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Mail className="text-gray-400" size={20} />
                        </div>
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent "
                            required
                        />
                    </div>

                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Calendar className="text-gray-400" size={20} />
                        </div>
                        <input
                            type="number"
                            name="age"
                            placeholder="Age"
                            value={formData.age}
                            onChange={handleChange}
                            min={16}
                            max={100}
                            className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent "
                            required
                        />
                    </div>

                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <BookOpen className="text-gray-400" size={20} />
                        </div>
                        <input
                            type="text"
                            name="major"
                            placeholder="Major"
                            value={formData.major}
                            onChange={handleChange}
                            className="w-full p-3 pl-10 border border-gray-300  rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent "
                            required
                        />
                    </div>

                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Building className="text-gray-400" size={20} />
                        </div>
                        <input
                            type="text"
                            name="campus"
                            placeholder="Campus"
                            value={formData.campus}
                            onChange={handleChange}
                            className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent "
                            required
                        />
                    </div>

                    <div className="pt-4">
                        <button
                            type="submit"
                            className="w-full flex items-center justify-center bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition duration-300 ease-in-out transform hover:scale-101 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                        >
                            <Save className="mr-2" size={20} />
                            {student ? 'Update Student' : 'Add Student'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Modal;