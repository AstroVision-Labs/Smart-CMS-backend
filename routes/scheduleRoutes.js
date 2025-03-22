import express from 'express';
import { getStudentSchedule, addEventToSchedule, updateEventInSchedule, deleteEventFromSchedule, addEventToStudentSchedule, getStudentScheduleById, addEventToScheduleByAdmin, getStudentScheduleByAdmin, deleteEventFromScheduleByAdmin, deleteEventFromScheduleCompletely } from '../controllers/scheduleController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';
import { roleMiddleware } from '../middleware/roleMiddleware.js';

const router = express.Router();


// Student routes
router.get('/', authMiddleware, roleMiddleware(['student']), getStudentSchedule);
router.post('/events', authMiddleware, roleMiddleware(['student']), addEventToSchedule);
router.put('/events/:eventId', authMiddleware, roleMiddleware(['student']), updateEventInSchedule);
router.delete('/events/:eventId', authMiddleware, roleMiddleware(['student']), deleteEventFromSchedule);

// Admin routes
router.get('/event', authMiddleware, roleMiddleware(['admin']), getStudentScheduleByAdmin);
router.post('/event', authMiddleware, roleMiddleware(['admin']), addEventToScheduleByAdmin);
router.put('/events/:eventId', authMiddleware, roleMiddleware(['admin']), updateEventInSchedule);
router.delete('/events/complete/:eventId', authMiddleware, roleMiddleware(['admin']), deleteEventFromScheduleCompletely);
router.delete('/events/event/:studentId/:eventId', authMiddleware, roleMiddleware(['admin']), deleteEventFromScheduleByAdmin);

// Shared admin/lecturer routes
router.post('/:stuId', authMiddleware, roleMiddleware(['admin', 'lecturer']), addEventToStudentSchedule);
router.get('/:stuId', authMiddleware, roleMiddleware(['admin', 'lecturer']), getStudentScheduleById);

export default router;