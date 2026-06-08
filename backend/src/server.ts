import express, {Application} from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { connectDB } from './config/db';
import studentRoutes from './routes/student.route';
import cookieParser from 'cookie-parser';
import passport from 'passport';
import './config/passport';
import authRoutes from './routes/auth.route';
import universityRoutes from './routes/university.route';
import { requireAuth } from './middleware/auth.middleware';
dotenv.config();

const app: Application = express();
app.use(cookieParser());
app.use(passport.initialize());
const PORT = process.env.PORT || 3000;
connectDB();

app.use(cors({origin: 'http://localhost:4200', 
    credentials: true,
}));
app.use(express.json());

app.use('/students', requireAuth, studentRoutes);
app.use('/api/universities', requireAuth, universityRoutes);
app.use('/auth', authRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});