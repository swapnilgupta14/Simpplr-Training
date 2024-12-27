import { test, expect } from '@playwright/test';
import { Student } from '../src/types';

test.describe('Student API Tests', () => {
  const baseURL = 'http://localhost:3010/api';
  
  const mockStudent: Student = {
    full_name: 'Swap',
    email: 'swap@example.com',
    age: 20,
    major: 'Computer Science',
    campus: 'PSIT',
    college_degree: 'Bachelor',
    branch: 'Software Engineering',
    year: '2024'
  };

  let createdStudentId: number;

  test('should fetch all students', async ({ request }) => {
    const response = await request.get(`${baseURL}/`);
    expect(response.ok());
    const students = await response.json();
    expect(Array.isArray(students));
    students.forEach((student: Student) => {
      expect(student).toHaveProperty('id');
      expect(student).toHaveProperty('full_name');
      expect(student).toHaveProperty('email');
    });
  });

  test('should create a new student', async ({ request }) => {
    const response = await request.post(`${baseURL}/newStudent`, {
      data: mockStudent
    });
    expect(response.ok());
    const createdStudent = await response.json();
    expect(createdStudent).toHaveProperty('id');
    expect(createdStudent.full_name).toBe(mockStudent.full_name);
    expect(createdStudent.email).toBe(mockStudent.email);
    createdStudentId = createdStudent.id;
  });

  test('should update an existing student', async ({ request }) => {
    const updatedData = {
      ...mockStudent,
      full_name: 'John Updated Doe',
      age: 21
    };

    const response = await request.put(`${baseURL}/${createdStudentId}`, {
      data: updatedData
    });
    expect(response.ok());
    const updatedStudent = await response.json();
    expect(updatedStudent.full_name).toBe('John Updated Doe');
    expect(updatedStudent.age).toBe(21);
  });

  test('should delete a student', async ({ request }) => {
    const response = await request.delete(`${baseURL}/${createdStudentId}`);
    expect(response.ok());

    const getResponse = await request.get(`${baseURL}/${createdStudentId}`);
    expect(getResponse.status()).toBe(404);
  });

  test('should handle invalid student creation', async ({ request }) => {
    const invalidStudent = {
      full_name: '', 
      email: 'invalid-email', 
      age: 15 
    };

    const response = await request.post(`${baseURL}/newStudent`, {
      data: invalidStudent
    });
    expect(response.ok()).toBeFalsy();
    expect(response.status()).toBe(404);
  });
});