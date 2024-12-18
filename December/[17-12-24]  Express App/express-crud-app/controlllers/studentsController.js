const { readItem, writeItem } = require('../utils/fileUtils');

exports.getAllStudents = async (req, res) => {
  try {
    const students = await readItem();
    res.json(students);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve students' });
  }
};

exports.getStudentById = async (req, res) => {
  try {
    const students = await readItem();
    const student = students.find((s) => s.id === parseInt(req.params.id));
    
    if (student) {
      res.json(student);
    } else {
      res.status(404).json({ error: 'Student not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve student' });
  }
};

exports.createStudent = async (req, res) => {
  try {
    const students = await readItem();
    const newStudent = {
      id: students.length > 0 ? Math.max(...students.map((student) => student.id)) + 1 : 1,
      ...req.body,
    };
    
    students.push(newStudent);
    await writeItem(students);
    
    res.status(201).json({ message: 'New student added!', data: newStudent });
  } catch (error) {
    res.status(500).json({ error: 'Failed to add student' });
  }
};

exports.updateStudent = async (req, res) => {
  try {
    const students = await readItem();
    const index = students.findIndex((s) => s.id === parseInt(req.params.id));
    
    if (index !== -1) {
      students[index] = { id: students[index].id, ...req.body };
      await writeItem(students);
      res.json(students[index]);
    } else {
      res.status(404).json({ error: 'Student not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to update student' });
  }
};

exports.partialUpdateStudent = async (req, res) => {
  try {
    const students = await readItem();
    const index = students.findIndex((s) => s.id === parseInt(req.params.id));
    
    if (index !== -1) {
      students[index] = { ...students[index], ...req.body };
      await writeItem(students);
      res.json(students[index]);
    } else {
      res.status(404).json({ error: 'Student not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to update student' });
  }
};

exports.deleteStudent = async (req, res) => {
  try {
    const students = await readItem();
    const filteredStudents = students.filter((s) => s.id !== parseInt(req.params.id));
    
    if (filteredStudents.length < students.length) {
      await writeItem(filteredStudents);
      res.json({ message: 'Student deleted successfully' });
    } else {
      res.status(404).json({ error: 'Student not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete student' });
  }
};

exports.getStudentsByGrade = async (req, res) => {
  try {
    const students = await readItem();
    const grade = req.query.grade;
    const filteredStudents = students.filter((s) => s.grade === grade);
    res.json(filteredStudents);
  } catch (error) {
    res.status(500).json({ error: 'Failed to filter students by grade' });
  }
};

exports.getStudentsByAgeRange = async (req, res) => {
  try {
    const students = await readItem();
    const minAge = parseInt(req.query.minAge);
    const maxAge = parseInt(req.query.maxAge);

    const filteredStudents = students.filter((s) => s.age >= minAge && s.age <= maxAge);
    res.json(filteredStudents);
  } catch (error) {
    res.status(500).json({ error: 'Failed to filter students by age range' });
  }
};
