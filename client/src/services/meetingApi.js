const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Timeout duration for requests (in ms)
// Local: 8s is plenty (no cold start)
// Production: 25s for Render cold start
const REQUEST_TIMEOUT = 8000;
const MAX_RETRIES = 1; // Fewer retries for local
const RETRY_DELAY = 1000; // 1 second between retries

// Helper function for fetch with timeout
const fetchWithTimeout = async (url, options, timeout) => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);
  
  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    });
    clearTimeout(timeoutId);
    return response;
  } catch (error) {
    clearTimeout(timeoutId);
    if (error.name === 'AbortError') {
      throw new Error('Request timed out. Server may be starting up, please try again.');
    }
    throw error;
  }
};

// Helper function for retry logic
const fetchWithRetry = async (url, options, retries = MAX_RETRIES) => {
  let lastError;
  
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const response = await fetchWithTimeout(url, options, REQUEST_TIMEOUT);
      return response;
    } catch (error) {
      lastError = error;
      console.warn(`Request attempt ${attempt + 1} failed:`, error.message);
      
      // Don't retry on 4xx errors (client errors)
      if (error.message && error.message.includes('4')) {
        throw error;
      }
      
      // Wait before retrying (with exponential backoff)
      if (attempt < retries) {
        const delay = RETRY_DELAY * Math.pow(2, attempt);
        console.log(`Retrying in ${delay}ms...`);
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
  }
  
  throw lastError;
};

export const createMeeting = async () => {
  try {
    const response = await fetchWithRetry(`${API_URL}/meeting/create`, {
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
    // Provide user-friendly error messages
    if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
      throw new Error('Cannot connect to server. Please check your internet connection or try again in a moment.');
    }
    throw error;
  }
};

export const getMeeting = async (meetingId) => {
  try {
    const response = await fetchWithRetry(`${API_URL}/meeting/${meetingId}`, {
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
    if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
      throw new Error('Cannot connect to server. Please check your internet connection.');
    }
    throw error;
  }
};

// Health check function to wake up Render server
export const checkServerHealth = async () => {
  try {
    const response = await fetchWithTimeout(
      API_URL.replace('/api', ''),
      { method: 'GET' },
      30000 // 30 second timeout for health check
    );
    return response.ok;
  } catch (error) {
    console.warn('Health check failed:', error.message);
    return false;
  }
};
