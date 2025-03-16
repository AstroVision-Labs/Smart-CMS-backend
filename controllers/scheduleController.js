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