import { Router } from 'express';
import { searchUniversities } from '../controllers/university.controller';


const router = Router();

router.get('/', searchUniversities);

export default router