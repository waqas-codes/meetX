const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const createMeeting = async () => {
  try {
    const response = await fetch(`${API_URL}/meeting/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || data.error || `HTTP error! status: ${response.status}`);
    }
    
    return data;
  } catch (error) {
    console.error('createMeeting error:', error);
    throw error;
  }
};

export const getMeeting = async (meetingId) => {
  try {
    const response = await fetch(`${API_URL}/meeting/${meetingId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || data.error || `HTTP error! status: ${response.status}`);
    }
    
    return data;
  } catch (error) {
    console.error('getMeeting error:', error);
    throw error;
  }
};
