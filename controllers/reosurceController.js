import moment from 'moment-timezone';
import Resource from '../models/Resource.js';
import { getIO } from '../utils/socket.js';

// Add a new resource (admin only)
export const addResource = async (req, res) => {
    const { name, type } = req.body;
  
    try {
      const existingResource = await Resource.findOne({ name });
      if (existingResource) {
        return res.status(400).json({ message: 'Resource already exists' });
      }
  
      const resource = await Resource.create({ 
        name, 
        type,
      });
  
      res.status(201).json(resource);
    } catch (error) {
      console.error('Error adding resource:', error);
      res.status(500).json({ message: 'Something went wrong' });
    }
  };