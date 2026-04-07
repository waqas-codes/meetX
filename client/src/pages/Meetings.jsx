import React from 'react';
import { Box, Typography, Container, Paper, Grid } from '@mui/material';
import { Videocam as VideocamIcon } from '@mui/icons-material';
import Navbar from '../components/Navbar';

const Meetings = () => {
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
          My Meetings
        </Typography>
        
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={4}>
            <Paper
              elevation={0}
              sx={{
                p: 3,
                borderRadius: 3,
                backgroundColor: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.08)',
                transition: 'all 0.3s ease',
                '&:hover': {
                  backgroundColor: 'rgba(255,255,255,0.05)',
                  borderColor: 'rgba(99,102,241,0.3)',
                },
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                <VideocamIcon sx={{ color: '#6366f1' }} />
                <Typography variant="h6" sx={{ color: 'white' }}>
                  Team Standup
                </Typography>
              </Box>
              <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.5)' }}>
                Today at 10:00 AM • 30 minutes
              </Typography>
            </Paper>
          </Grid>
          
          <Grid item xs={12} md={6} lg={4}>
            <Paper
              elevation={0}
              sx={{
                p: 3,
                borderRadius: 3,
                backgroundColor: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.08)',
                transition: 'all 0.3s ease',
                '&:hover': {
                  backgroundColor: 'rgba(255,255,255,0.05)',
                  borderColor: 'rgba(99,102,241,0.3)',
                },
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                <VideocamIcon sx={{ color: '#8b5cf6' }} />
                <Typography variant="h6" sx={{ color: 'white' }}>
                  Product Review
                </Typography>
              </Box>
              <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.5)' }}>
                Tomorrow at 2:00 PM • 1 hour
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Meetings;
