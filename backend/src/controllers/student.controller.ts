import { Request, Response } from 'express';
import {Student} from '../models/Student';
import mongoose from 'mongoose';


export const createStudent = async (req: Request, res: Response): Promise<any> => {
    try{
        const { name, rollNumber, age, grade } = req.body;

        const exiasstingStudent = await Student.findOne({rollNumber});
        if(exiasstingStudent){
            const dbName = mongoose.connection.name;
            const collectionName = Student.collection.name;
            return res.status(400).json({message: `Student with this roll number already exists inside the database '${dbName}' in the '${collectionName}' collection!`});
        }
        const newStudent = new Student({ name, rollNumber, age, grade });
        const savedStudent = await newStudent.save();
        return res.status(201).json({message: 'Student added successfully!',student: savedStudent});
    } catch (error) {
        console.error('Error creating student:', error);
        return res.status(500).json({message: 'Internal server error'});
    }
};

export const getStudents = async (req: Request, res: Response): Promise<any> => {
    try {
        const students = await Student.find().sort({ createdAt: -1 });
        return res.status(200).json(students);
    } catch (error) {
        console.error('Error fetching students:', error);
        return res.status(500).json({message: 'Internal server error'});
    }   
};

export const getStudentByRollNumber = async (req: Request, res: Response): Promise<any> => {
    try {
        const { rollNumber } = req.params;
        const student = await Student.findOne({ rollNumber });
        if (!student) {
            return res.status(404).json({message: 'Student not found'});
        }
        return res.status(200).json(student);
    } catch (error) {
        console.error('Error fetching student:', error);
        return res.status(500).json({message: 'Internal server error'});
    }
};

export const updateStudent = async (req: Request, res: Response): Promise<any> => {
    try {
        const { rollNumber } = req.params;
        const updateStudent = await Student.findOneAndUpdate({ rollNumber }, req.body, { new: true, runValidators: true });
        if (!updateStudent) {
            return res.status(404).json({message: 'Student not found'});
        }   
        return res.status(200).json({message: 'Student updated successfully!', student: updateStudent});
    } catch (error: any) {
        console.error('Error updating student:', error);
        return res.status(500).json({message: 'Internal server error'});
    }   
};

export const deleteStudentByRollNumber = async (req: Request, res: Response): Promise<any> => {
    try {
        const { rollNumber } = req.params;
        const deletedStudent = await Student.findOneAndDelete({ rollNumber: rollNumber });
        if (!deletedStudent) {
            return res.status(404).json({message: 'Student not found'});
        }
        return res.status(200).json({message: 'Student deleted successfully!'});
    } catch (error: any) {
        console.error('Error deleting student:', error);
        return res.status(500).json({message: 'Internal server error'});
    }   
};