import express from 'express';
import {
  createEvent,
  updateEvent,
  deleteEvent,
  getEventList,
  getEventDetail,
  createEventsBulk
} from '../controllers/eventController.js';

const router = express.Router();

router.post('/create',        createEvent);
router.put('/update',         updateEvent);
router.get('/list',           getEventList);
router.get('/details',        getEventDetail);
router.post('/delete',        deleteEvent);
router.post('/bulk/create',   createEventsBulk);

export default router;
