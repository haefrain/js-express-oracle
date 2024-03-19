import express from 'express';

import {login, logout} from '../controllers/authentication.js';

const router = express.Router();

router.post('/login', login);

router.get('/logout/:id', logout);

export default router;