const { readItem, writeItem } = require('../utils/fileUtils');

// Helper function to validate and parse JSON
const validateResponse = (data) => {
  if (!data || typeof data !== 'object') {
    throw new Error('Invalid data format');
  }
  return data;
};

// Helper function to validate ID
const validateId = (id) => {
  const parsedId = parseInt(id);
  if (isNaN(parsedId)) {
    throw new Error('Invalid ID format');
  }
  return parsedId;
};

exports.getAllStudents = async (req, res) => {
  try {
    const students = await readItem();
    if (!Array.isArray(students)) {
      throw new Error('Invalid data format');
    }
    res.setHeader('Content-Type', 'application/json');
    res.json(students);
  } catch (error) {
    console.error('getAllStudents error:', error);
    res.status(500).json({ 
      error: 'Failed to retrieve students',
      details: error.message 
    });
  }
};

exports.getStudentById = async (req, res) => {
  try {
    const id = validateId(req.params.id);
    const students = await readItem();
    
    if (!Array.isArray(students)) {
      throw new Error('Invalid data format');
    }

    const student = students.find((s) => s.id === id);
    
    if (student) {
      res.setHeader('Content-Type', 'application/json');
      res.json(student);
    } else {
      res.status(404).json({ error: 'Student not found' });
    }
  } catch (error) {
    console.error('getStudentById error:', error);
    res.status(500).json({ 
      error: 'Failed to retrieve student',
      details: error.message 
    });
  }
};

exports.createStudent = async (req, res) => {
  try {
    const students = await readItem();
    if (!Array.isArray(students)) {
      throw new Error('Invalid data format');
    }

    // Validate request body
    if (!req.body || !req.body.full_name || !req.body.email) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const newStudent = {
      id: students.length > 0 ? Math.max(...students.map((student) => student.id)) + 1 : 1,
      ...req.body,
    };
    
    students.push(newStudent);
    await writeItem(students);
    
    res.setHeader('Content-Type', 'application/json');
    res.status(201).json({ 
      message: 'New student added!', 
      data: newStudent 
    });
  } catch (error) {
    console.error('createStudent error:', error);
    res.status(500).json({ 
      error: 'Failed to add student',
      details: error.message 
    });
  }
};

exports.updateStudent = async (req, res) => {
  try {
    const id = validateId(req.params.id);
    const students = await readItem();
    
    if (!Array.isArray(students)) {
      throw new Error('Invalid data format');
    }

    const index = students.findIndex((s) => s.id === id);
    
    if (index !== -1) {
      students[index] = { id: students[index].id, ...req.body };
      await writeItem(students);
      res.setHeader('Content-Type', 'application/json');
      res.json(students[index]);
    } else {
      res.status(404).json({ error: 'Student not found' });
    }
  } catch (error) {
    console.error('updateStudent error:', error);
    res.status(500).json({ 
      error: 'Failed to update student',
      details: error.message 
    });
  }
};

exports.partialUpdateStudent = async (req, res) => {
  try {
    const id = validateId(req.params.id);
    const students = await readItem();
    
    if (!Array.isArray(students)) {
      throw new Error('Invalid data format');
    }

    const index = students.findIndex((s) => s.id === id);
    
    if (index !== -1) {
      students[index] = { ...students[index], ...req.body };
      await writeItem(students);
      res.setHeader('Content-Type', 'application/json');
      res.json(students[index]);
    } else {
      res.status(404).json({ error: 'Student not found' });
    }
  } catch (error) {
    console.error('partialUpdateStudent error:', error);
    res.status(500).json({ 
      error: 'Failed to update student',
      details: error.message 
    });
  }
};

exports.deleteStudent = async (req, res) => {
  try {
    const id = validateId(req.params.id);
    const students = await readItem();
    
    if (!Array.isArray(students)) {
      throw new Error('Invalid data format');
    }

    const filteredStudents = students.filter((s) => s.id !== id);
    
    if (filteredStudents.length < students.length) {
      await writeItem(filteredStudents);
      res.setHeader('Content-Type', 'application/json');
      res.json({ message: 'Student deleted successfully' });
    } else {
      res.status(404).json({ error: 'Student not found' });
    }
  } catch (error) {
    console.error('deleteStudent error:', error);
    res.status(500).json({ 
      error: 'Failed to delete student',
      details: error.message 
    });
  }
};

exports.getStudentsByGrade = async (req, res) => {
  try {
    const students = await readItem();
    
    if (!Array.isArray(students)) {
      throw new Error('Invalid data format');
    }

    const { grade } = req.query;
    if (!grade) {
      return res.status(400).json({ error: 'Grade parameter is required' });
    }

    const filteredStudents = students.filter((s) => s.grade === grade);
    res.setHeader('Content-Type', 'application/json');
    res.json(filteredStudents);
  } catch (error) {
    console.error('getStudentsByGrade error:', error);
    res.status(500).json({ 
      error: 'Failed to filter students by grade',
      details: error.message 
    });
  }
};

exports.getStudentsByAgeRange = async (req, res) => {
  try {
    const students = await readItem();
    
    if (!Array.isArray(students)) {
      throw new Error('Invalid data format');
    }

    const minAge = parseInt(req.query.minAge);
    const maxAge = parseInt(req.query.maxAge);

    if (isNaN(minAge) || isNaN(maxAge)) {
      return res.status(400).json({ error: 'Invalid age range parameters' });
    }

    const filteredStudents = students.filter((s) => s.age >= minAge && s.age <= maxAge);
    res.setHeader('Content-Type', 'application/json');
    res.json(filteredStudents);
  } catch (error) {
    console.error('getStudentsByAgeRange error:', error);
    res.status(500).json({ 
      error: 'Failed to filter students by age range',
      details: error.message 
    });
  }
};