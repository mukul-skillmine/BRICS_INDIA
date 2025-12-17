import express from 'express';
import {
  createEvent,
  updateEvent,
  deleteEvent,
  getEventList,
  getEventDetail
} from '../controllers/eventController.js';

const router = express.Router();

router.post('/create', createEvent);
router.put('/update', updateEvent);
router.get('/list', getEventList);
router.get('/details', getEventDetail);
router.post('/delete', deleteEvent);

export default router;
