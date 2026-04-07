import React, { useState } from 'react';
import { Box, Typography, Container, Paper, TextField, Button, Grid } from '@mui/material';
import { CalendarToday as CalendarIcon, AccessTime as TimeIcon } from '@mui/icons-material';
import Navbar from '../components/Navbar';

const Schedules = () => {
  const [meetingName, setMeetingName] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  const handleSchedule = () => {
    alert(`Meeting "${meetingName}" scheduled for ${date} at ${time}`);
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(180deg, #0a0a0f 0%, #12121a 50%, #1a1a2e 100%)',
      }}
    >
      <Navbar />
      <Container maxWidth="lg" sx={{ maxWidth: '1200px !important', pt: 4 }}>
        <Typography variant="h4" sx={{ color: 'white', mb: 4, fontWeight: 600 }}>
          Schedule Meeting
        </Typography>
        
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Paper
              elevation={0}
              sx={{
                p: 4,
                borderRadius: 3,
                backgroundColor: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.08)',
              }}
            >
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                <TextField
                  fullWidth
                  label="Meeting Name"
                  value={meetingName}
                  onChange={(e) => setMeetingName(e.target.value)}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      color: 'white',
                      '& fieldset': { borderColor: 'rgba(255,255,255,0.2)' },
                      '&:hover fieldset': { borderColor: 'rgba(99,102,241,0.5)' },
                    },
                    '& .MuiInputLabel-root': { color: 'rgba(255,255,255,0.5)' },
                  }}
                />
                <TextField
                  fullWidth
                  label="Date"
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  InputLabelProps={{ shrink: true }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      color: 'white',
                      '& fieldset': { borderColor: 'rgba(255,255,255,0.2)' },
                      '&:hover fieldset': { borderColor: 'rgba(99,102,241,0.5)' },
                    },
                    '& .MuiInputLabel-root': { color: 'rgba(255,255,255,0.5)' },
                  }}
                />
                <TextField
                  fullWidth
                  label="Time"
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  InputLabelProps={{ shrink: true }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      color: 'white',
                      '& fieldset': { borderColor: 'rgba(255,255,255,0.2)' },
                      '&:hover fieldset': { borderColor: 'rgba(99,102,241,0.5)' },
                    },
                    '& .MuiInputLabel-root': { color: 'rgba(255,255,255,0.5)' },
                  }}
                />
                <Button
                  variant="contained"
                  size="large"
                  onClick={handleSchedule}
                  disabled={!meetingName || !date || !time}
                  sx={{
                    py: 1.5,
                    background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                    '&:hover': {
                      boxShadow: '0 8px 25px rgba(99, 102, 241, 0.4)',
                    },
                  }}
                >
                  Schedule Meeting
                </Button>
              </Box>
            </Paper>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Typography variant="h6" sx={{ color: 'white', mb: 2 }}>
              Upcoming Meetings
            </Typography>
            <Paper
              elevation={0}
              sx={{
                p: 3,
                borderRadius: 3,
                backgroundColor: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.08)',
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                <CalendarIcon sx={{ color: '#6366f1' }} />
                <Typography variant="body1" sx={{ color: 'white' }}>
                  No upcoming meetings scheduled
                </Typography>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Schedules;
