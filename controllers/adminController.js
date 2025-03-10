import User from '../models/User.js';
import Event from '../models/Event.js';
import Resource from '../models/Resource.js';

export const getAllUsers = async (req, res) => {
    try {
      const users = await User.find();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ message: 'Something went wrong' });
    }
  };

  export const getAllEvents = async (req, res) => {
    try {
      const events = await Event.find().populate('organizer', 'name email');
      res.status(200).json(events);
    } catch (error) {
      res.status(500).json({ message: 'Something went wrong' });
    }
  };