import { Schema, model, Document } from 'mongoose';

export interface IStudent extends Document {
    name: string;
    rollNumber: string;
    age: number;
    grade: string;
}

const studentSchema = new Schema<IStudent>({
    name: { type: String, required: true, trim: true },
    rollNumber: { type: String, required: true, unique: true, trim: true },
    age: { type: Number, required: true },
    grade: { type: String, required: true, trim: true }
},{
    timestamps: true
});

export const Student = model<IStudent>('Student', studentSchema);