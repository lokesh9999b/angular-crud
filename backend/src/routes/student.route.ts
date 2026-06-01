import { Router } from "express";
import { createStudent, deleteStudentByRollNumber, getStudentByRollNumber, getStudents, updateStudent } from "../controllers/student.controller";

const router = Router();

router.post('/', createStudent);
router.get('/', getStudents);
router.get('/:rollNumber', getStudentByRollNumber);
router.put('/:rollNumber', updateStudent);
router.delete('/:rollNumber', deleteStudentByRollNumber);

export default router;