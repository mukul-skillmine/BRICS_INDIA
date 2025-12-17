import express from 'express';
import { cancelRegistration, createUserProfile, deleteUserProfile, getEventRegistrations, getUserDetail, getUserList, getUserRegistrations, loginUser, registerEvent, updateUserProfile } from '../controllers/userController.js';

const router = express.Router();

router.post('/create', createUserProfile);
router.put('/update', updateUserProfile);
router.get('/list', getUserList);
router.get('/details', getUserDetail);
router.post('/delete', deleteUserProfile);
router.post('/login', loginUser);

// User Event Mapping Routes

router.post('/mapping/register',            registerEvent);
router.post('/mapping/cancel',              cancelRegistration);
router.get('/mapping/user-events',          getUserRegistrations);
router.get('/mapping/event-users',          getEventRegistrations);

export default router;
