import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import Course from '../models/Course.js';
import User from '../models/User.js';
import Notification from '../models/Notification.js';
import { sendEmail } from '../utils/emailSender.js';

// Create a new course (instructor only) with file upload
export const createCourse = async (req, res) => {
    const { name, code, description, schedule } = req.body;
    const instructorId = req.user._id; 
  
    try {
      const existingCourse = await Course.findOne({ code });
      if (existingCourse) {
        return res.status(400).json({ message: 'Course with this code already exists' });
      }
  
      // Handle file upload
      const lectureMaterials = req.files?.map((file) => file.path); // Save file paths
  
      // Create the course
      const course = await Course.create({
        name,
        code,
        description,
        schedule,
        instructor: instructorId,
        lectureMaterials, 
      });
  
      const users = await User.find();
      users.forEach(async (user) => {
        await Notification.create({
          userId: user._id,
          message: `New course: ${course.name} (${course.code}) has been created. Check it out now!`,
        });
      });
  
      res.status(201).json({ message: "A new Course has been created",course});
    } catch (error) {
      console.error('Error creating course:', error);
      res.status(500).json({ message: 'Something went wrong' });
    }
};

// Get all courses
export const getCourses = async (req, res) => {
    try {
      const courses = await Course.find().populate('instructor', 'name email');
      res.status(200).json(courses);
    } catch (error) {
      res.status(500).json({ message: 'Something went wrong' });
    }
  };