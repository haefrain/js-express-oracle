import express from 'express';

import {getUser, createUser, updateUser, deleteUser} from '../controllers/users.js';

const router = express.Router();

router.post('/', createUser);

router.put('/:id', updateUser);

router.get('/:id', getUser);

router.delete('/:id', deleteUser);

export default router;