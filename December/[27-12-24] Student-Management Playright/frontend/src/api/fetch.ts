import api from "./AxiosInstance";
import { Student } from "../types";

export const fetchStudents = async () => {
  try {
    const response = await api.get<Student[]>("/");
    return response.data;
  } catch (error) {
    console.error("Error fetching students:", error);
    throw error;
  }
};

export const createStudent = async (student: Student) => {
  try {
    const response = await api.post<Student>("/newStudent", student);
    return response.data;
  } catch (error) {
    console.error("Error creating student:", error);
    throw error;
  }
};

export const updateStudent = async (id: number, student: Student) => {
  try {
    const response = await api.put<Student>(`/${id}`, student);
    return response.data;
  } catch (error) {
    console.error("Error updating student:", error);
    throw error;
  }
};

export const deleteStudent = async (id: number) => {
  try {
    await api.delete(`/${id}`);
  } catch (error) {
    console.error("Error deleting student:", error);
    throw error;
  }
};
