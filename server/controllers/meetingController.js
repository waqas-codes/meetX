const { nanoid } = require('nanoid');
const Meeting = require('../models/Meeting');

exports.createMeeting = async (req, res) => {
  try {
    const meetingId = nanoid(10);
    
    const meeting = new Meeting({
      meetingId,
    });
    
    await meeting.save();
    
    res.status(201).json({
      success: true,
      data: {
        meetingId: meeting.meetingId,
        createdAt: meeting.createdAt,
      },
    });
  } catch (error) {
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
    
    const meeting = await Meeting.findOne({ meetingId: id });
    
    if (!meeting) {
      return res.status(404).json({
        success: false,
        message: 'Meeting not found',
      });
    }
    
    res.status(200).json({
      success: true,
      data: {
        meetingId: meeting.meetingId,
        createdAt: meeting.createdAt,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to get meeting',
      error: error.message,
    });
  }
};
