const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const createMeeting = async () => {
  const response = await fetch(`${API_URL}/meeting/create`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  
  if (!response.ok) {
    throw new Error('Failed to create meeting');
  }
  
  return response.json();
};

export const getMeeting = async (meetingId) => {
  const response = await fetch(`${API_URL}/meeting/${meetingId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  
  if (!response.ok) {
    throw new Error('Meeting not found');
  }
  
  return response.json();
};
