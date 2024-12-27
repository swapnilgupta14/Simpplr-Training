import React from 'react';
import { 
    Edit, 
    Trash2, 
    User, 
    Mail, 
    GraduationCap, 
    Building, 
    Calendar, 
    BookOpen 
} from 'lucide-react';
import { Student } from '../types';

interface StudentCardProps {
    student: Student;
    onEdit: (student: Student) => void;
    onDelete: (id: number) => void;
}

const StudentCard: React.FC<StudentCardProps> = ({
    student,
    onEdit,
    onDelete
}) => {
    return (
        <div className="bg-white shadow-lg rounded  transition-all duration-300 hover:shadow-xl">
            <div className="p-6 border-b border-gray-100 ">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <div className="bg-blue-100  p-3 rounded-full">
                            <User className="text-blue-500 " size={24} />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-gray-800">
                                {student.full_name}
                            </h2>
                            <p className="text-sm text-gray-500">
                                {student.college_degree} | {student.year} Year
                            </p>
                        </div>
                    </div>
                    <div className="flex space-x-2">
                        <button
                            onClick={() => onEdit(student)}
                            className="text-blue-500 hover:text-blue-700 transition"
                            aria-label="Edit Student"
                        >
                            <Edit size={22} />
                        </button>
                        <button
                            onClick={() => student.id && onDelete(student.id)}
                            className="text-red-500 hover:text-red-700 transition"
                            aria-label="Delete Student"
                        >
                            <Trash2 size={22} />
                        </button>
                    </div>
                </div>
            </div>
            <div className="p-6 grid grid-cols-2 gap-4">
                <div className="flex items-center space-x-3">
                    <Mail className="text-gray-400" size={20} />
                    <div>
                        <p className="text-xs text-gray-500">Email</p>
                        <p className="text-sm font-medium text-gray-800">
                            {student.email}
                        </p>
                    </div>
                </div>
                <div className="flex items-center space-x-3">
                    <Calendar className="text-gray-400" size={20} />
                    <div>
                        <p className="text-xs text-gray-500">Age</p>
                        <p className="text-sm font-medium text-gray-800">
                            {student.age} years
                        </p>
                    </div>
                </div>
                <div className="flex items-center space-x-3">
                    <BookOpen className="text-gray-400" size={20} />
                    <div>
                        <p className="text-xs text-gray-500">Major</p>
                        <p className="text-sm font-medium text-gray-800">
                            {student.major}
                        </p>
                    </div>
                </div>
                <div className="flex items-center space-x-3">
                    <Building className="text-gray-400" size={20} />
                    <div>
                        <p className="text-xs text-gray-500">Campus</p>
                        <p className="text-sm font-medium text-gray-800">
                            {student.campus}
                        </p>
                    </div>
                </div>
                <div className="flex items-center space-x-3">
                    <GraduationCap className="text-gray-400" size={20} />
                    <div>
                        <p className="text-xs text-gray-500">Branch</p>
                        <p className="text-sm font-medium text-gray-800">
                            {student.branch}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StudentCard;