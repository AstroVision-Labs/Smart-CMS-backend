import Schedule from '../models/Schedule.js';

// Add Event to Schedule
export const addEventToSchedule = async (req, res) => {
    const studentId = req.user._id;
    const { title, description, date, location, type } = req.body;
  
    try {
        let schedule = await Schedule.findOne({ studentId });
    
        if (!schedule) {
            schedule = await Schedule.create({ studentId, events: [] });
        }
    
        schedule.events.push({ title, description, date, location, type });
        await schedule.save();
  
      res.status(201).json(schedule);
    } catch (error) {
        console.error('Error adding event to schedule:', error);
        res.status(500).json({ message: 'Something went wrong' });
    }
};

// Get student's schedule
export const getStudentSchedule = async (req, res) => {
    const studentId = req.user._id;
  
    try {
        const schedule = await Schedule.findOne({ studentId }).populate('studentId', 'name email');
        if (!schedule) {
            return res.status(404).json({ message: 'Schedule not found' });
        }
    
        res.status(200).json(schedule);
    } catch (error) {
        console.error('Error fetching schedule:', error);
        res.status(500).json({ message: 'Something went wrong' });
    }
};

