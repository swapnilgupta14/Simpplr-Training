const express = require("express");
const router = express.Router();
const studentController = require("../controlllers/studentsController");

router.get("/", studentController.getAllStudents);
router.get("/:id", studentController.getStudentById);
router.post("/newStudent", studentController.createStudent);
router.put("/:id", studentController.updateStudent);
router.patch("/:id", studentController.partialUpdateStudent);
router.delete("/:id", studentController.deleteStudent);

router.get("/filter/grade", studentController.getStudentsByGrade);
router.get("/filter/age", studentController.getStudentsByAgeRange);

module.exports = router;
