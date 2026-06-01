import express, {Application} from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { connectDB } from './config/db';
import studentRoutes from './routes/student.route';

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 3000;
connectDB();

app.use(cors({origin: 'http://localhost:4200'}));
app.use(express.json());

app.use('/students', studentRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});