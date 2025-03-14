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

//Real-time search for resources
export const searchResources = async (req, res) => {
    const { query } = req.query; 
  
    try {
      const resources = await Resource.find({
        availability: true, 
        name: { $regex: query, $options: 'i' }, 
      }).limit(10);
  
      res.status(200).json(resources);
    } catch (error) {
      console.error('Error searching resources:', error);
      res.status(500).json({ message: 'Something went wrong' });
    }
};

// Get resources with reservedBy details
export const getResources = async (req, res) => {
    try {
      const resources = await Resource.find().populate('reservedBy', 'name email'); // Populate reservedBy
      res.status(200).json(resources);
    } catch (error) {
      console.error('Error fetching resources:', error);
      res.status(500).json({ message: 'Something went wrong' });
    }
};

// Get all available resources
export const getAvailableResources = async (req, res) => {
    try {
      const limit = parseInt(req.params.limit) || 100;
  
      const resources = await Resource.find({ availability: true }).limit(limit);
  
      res.status(200).json(resources);
    } catch (error) {
      console.error('Error fetching available resources:', error);
      res.status(500).json({ message: 'Something went wrong' });
    }
  };