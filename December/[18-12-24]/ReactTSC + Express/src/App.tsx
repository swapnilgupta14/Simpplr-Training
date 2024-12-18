import { useState, useEffect } from 'react';
import Header from './component/Header';
import StudentCard from './component/StudentCard';
import Modal from './component/Modal';
import {
  fetchStudents,
  createStudent,
  updateStudent,
  deleteStudent
} from './api/fetch';
import { Student } from './types';

function App() {
  const [students, setStudents] = useState<Student[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

  const loadStudents = async () => {
    try {
      const fetchedStudents = await fetchStudents();
      setStudents(fetchedStudents);
    } catch (error) {
      console.error('Failed to load students', error);
    }
  };

  const handleSubmit = async (student: Student) => {
    try {
      if (student.id) {
        await updateStudent(student.id, student);
      } else {
        await createStudent(student);
      }
      await loadStudents();
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error saving student', error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteStudent(id);
      await loadStudents();
    } catch (error) {
      console.error('Error deleting student', error);
    }
  };

  const handleEdit = (student: Student) => {
    setSelectedStudent(student);
    setIsModalOpen(true);
  };

  const handleAddStudent = () => {
    setSelectedStudent(null);
    setIsModalOpen(true);
  };

  useEffect(() => {
    loadStudents();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <Header onAddStudent={handleAddStudent} />

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {students.map((student) => (
          <StudentCard
            key={student.id}
            student={student}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </div>

      {isModalOpen && (
        <Modal
          student={selectedStudent}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleSubmit}
        />
      )}
    </div>
  );
}

export default App;