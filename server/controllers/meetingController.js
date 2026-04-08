const { nanoid } = require('nanoid');
const Meeting = require('../models/Meeting');
const { checkDBConnection } = require('../config/db');

exports.createMeeting = async (req, res) => {
  try {
    // Check if MongoDB is connected
    if (!checkDBConnection()) {
      console.error('Cannot create meeting: MongoDB not connected');
      return res.status(503).json({
        success: false,
        message: 'Database not available. Please try again later.',
        error: 'MongoDB connection failed',
      });
    }
    
    console.log('Creating new meeting...');
    
    const meetingId = nanoid(10);
    console.log('Generated meeting ID:', meetingId);
    
    const meeting = new Meeting({
      meetingId,
    });
    
    console.log('Saving meeting to database...');
    await meeting.save();
    console.log('Meeting saved successfully');
    
    res.status(201).json({
      success: true,
      data: {
        meetingId: meeting.meetingId,
        createdAt: meeting.createdAt,
      },
    });
  } catch (error) {
    console.error('=== CREATE MEETING ERROR ===');
    console.error('Error:', error.message);
    console.error('Stack:', error.stack);
    
    res.status(500).json({
      success: false,
      message: 'Failed to create meeting',
      error: error.message,
    });
  }
};

exports.getMeetingById = async (req, res) => {
  try {
    const { id } = req.params;
    console.log('Looking for meeting:', id);
    
    const meeting = await Meeting.findOne({ meetingId: id });
    
    if (!meeting) {
      console.log('Meeting not found:', id);
      return res.status(404).json({
        success: false,
        message: 'Meeting not found',
      });
    }
    
    console.log('Meeting found:', meeting.meetingId);
    res.status(200).json({
      success: true,
      data: {
        meetingId: meeting.meetingId,
        createdAt: meeting.createdAt,
      },
    });
  } catch (error) {
    console.error('=== GET MEETING ERROR ===');
    console.error('Error:', error.message);
    
    res.status(500).json({
      success: false,
      message: 'Failed to get meeting',
      error: error.message,
    });
  }
};
