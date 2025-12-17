import express from 'express';
import { createUserProfile, deleteUserProfile, getUserDetail, getUserList, loginUser, updateUserProfile } from '../controllers/userController.js';

const router = express.Router();

router.post('/create', createUserProfile);
router.put('/update', updateUserProfile);
router.get('/list', getUserList);
router.get('/details', getUserDetail);
router.post('/delete', deleteUserProfile);
router.post('/login', loginUser);

export default router;
