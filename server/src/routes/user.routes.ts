import { Router } from 'express';
import {
    createUser,
    loginUser
} from '../controllers/user.controller';

//import auth from '../auth'

const router = Router();
router.post('/register', createUser);
router.post('/login', loginUser);

export default router;