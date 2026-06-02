import {Schema, model, Document} from 'mongoose';

export interface IUser extends Document {
    googleId: string;
    name: string;
    email: string;
    avatar?: string;
    role: 'user' | 'admin';
}

const userSchema = new Schema<IUser>({
    googleId: { 
        type: String, 
        required: true, 
        unique: true,
     },
    name: { 
        type: String, 
        required: true,
        trim: true,
    },
    email: { 
        type: String, 
        required: true, 
        unique: true,
        lowercase: true,
        trim: true,
    },
    avatar: { 
        type: String,
     },
    role: { 
        type: String, 
        enum: ['user', 'admin'], 
        default: 'user' },
},
{
    timestamps: true,
}

);

export const User = model<IUser>('User', userSchema);