import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Box,
  Typography,
  Button,
  TextField,
  Paper,
  AppBar,
  Toolbar,
  IconButton,
  Avatar,
} from '@mui/material';
import {
  Videocam as VideocamIcon,
  Login as LoginIcon,
  HelpOutline as HelpIcon,
  Settings as SettingsIcon,
  Hd as HdIcon,
  Security as SecurityIcon,
  SurroundSound as AudioIcon,
} from '@mui/icons-material';
import { createMeeting } from '../services/meetingApi';

const Home = () => {
  const navigate = useNavigate();
  const [meetingId, setMeetingId] = useState('');
  const [loading, setLoading] = useState(false);

  const handleStartMeeting = async () => {
    setLoading(true);
    try {
      const response = await createMeeting();
      const newMeetingId = response.data.meetingId;
      navigate(`/meeting/${newMeetingId}`);
    } catch (error) {
      console.error('Error creating meeting:', error);
      alert('Failed to create meeting. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleJoinMeeting = () => {
    if (meetingId.trim()) {
      navigate(`/meeting/${meetingId.trim()}`);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(180deg, #0a0a0f 0%, #12121a 50%, #1a1a2e 100%)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background gradient orbs */}
      <Box
        sx={{
          position: 'absolute',
          top: '10%',
          left: '10%',
          width: 400,
          height: 400,
          background: 'radial-gradient(circle, rgba(99,102,241,0.2), transparent 70%)',
          filter: 'blur(60px)',
          pointerEvents: 'none',
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          top: '40%',
          right: '5%',
          width: 500,
          height: 500,
          background: 'radial-gradient(circle, rgba(139,92,246,0.15), transparent 70%)',
          filter: 'blur(80px)',
          pointerEvents: 'none',
        }}
      />

      {/* Navbar */}
      <AppBar
        position="static"
        elevation={0}
        sx={{
          backgroundColor: 'transparent',
          borderBottom: '1px solid rgba(255,255,255,0.05)',
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-between', px: { xs: 2, md: 4 } }}>
          {/* Logo */}
          <Typography
            variant="h5"
            sx={{
              fontWeight: 800,
              background: 'linear-gradient(90deg, #6366f1, #8b5cf6)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              cursor: 'pointer',
            }}
            onClick={() => navigate('/')}
          >
            MeetX
          </Typography>

          {/* Center Navigation */}
          <Box
            sx={{
              display: { xs: 'none', md: 'flex' },
              gap: 4,
              alignItems: 'center',
            }}
          >
            <Typography
              sx={{
                color: 'white',
                opacity: 0.9,
                fontWeight: 500,
                cursor: 'pointer',
                '&:hover': { opacity: 1 },
                transition: 'all 0.3s ease',
              }}
            >
              Meetings
            </Typography>
            <Typography
              sx={{
                color: 'white',
                opacity: 0.6,
                fontWeight: 500,
                cursor: 'pointer',
                '&:hover': { opacity: 1 },
                transition: 'all 0.3s ease',
              }}
            >
              Recordings
            </Typography>
            <Typography
              sx={{
                color: 'white',
                opacity: 0.6,
                fontWeight: 500,
                cursor: 'pointer',
                '&:hover': { opacity: 1 },
                transition: 'all 0.3s ease',
              }}
            >
              Schedule
            </Typography>
          </Box>

          {/* Right Icons */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <IconButton
              sx={{
                color: 'rgba(255,255,255,0.6)',
                '&:hover': { color: 'white', backgroundColor: 'rgba(255,255,255,0.1)' },
              }}
            >
              <HelpIcon />
            </IconButton>
            <IconButton
              sx={{
                color: 'rgba(255,255,255,0.6)',
                '&:hover': { color: 'white', backgroundColor: 'rgba(255,255,255,0.1)' },
              }}
            >
              <SettingsIcon />
            </IconButton>
            <Avatar
              sx={{
                ml: 1,
                width: 36,
                height: 36,
                bgcolor: 'rgba(99,102,241,0.3)',
                border: '2px solid rgba(99,102,241,0.5)',
                cursor: 'pointer',
                '&:hover': {
                  borderColor: '#6366f1',
                },
              }}
            >
              <Typography variant="caption" sx={{ color: 'white', fontWeight: 600 }}>
                U
              </Typography>
            </Avatar>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Hero Section */}
      <Container maxWidth="md">
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          pt={8}
          pb={6}
          textAlign="center"
        >
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: '2.5rem', md: '4rem' },
              fontWeight: 800,
              color: 'white',
              letterSpacing: '-0.02em',
              lineHeight: 1.1,
              mb: 2,
            }}
          >
            Connect beyond the pixels.
          </Typography>

          <Typography
            variant="h6"
            sx={{
              color: 'rgba(255,255,255,0.5)',
              maxWidth: 500,
              fontWeight: 400,
              lineHeight: 1.6,
            }}
          >
            Experience crystal-clear video meetings with enterprise-grade security
          </Typography>
        </Box>

        {/* CTA Section - Glass Container */}
        <Paper
          elevation={0}
          sx={{
            p: { xs: 3, md: 5 },
            width: '100%',
            maxWidth: 600,
            mx: 'auto',
            borderRadius: 4,
            backdropFilter: 'blur(20px)',
            backgroundColor: 'rgba(255, 255, 255, 0.03)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255,255,255,0.05)',
            mb: 8,
          }}
        >
          <Box display="flex" flexDirection="column" gap={3}>
            <Button
              variant="contained"
              size="large"
              startIcon={<VideocamIcon />}
              onClick={handleStartMeeting}
              disabled={loading}
              fullWidth
              sx={{
                py: 1.8,
                background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                fontSize: '1.1rem',
                fontWeight: 600,
                borderRadius: 3,
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: '0 8px 25px rgba(99, 102, 241, 0.5)',
                },
              }}
            >
              {loading ? 'Creating...' : 'Start Meeting'}
            </Button>

            <Box display="flex" gap={2} alignItems="center">
              <TextField
                fullWidth
                variant="outlined"
                value={meetingId}
                onChange={(e) => setMeetingId(e.target.value)}
                placeholder="Enter meeting ID"
                onKeyPress={(e) => e.key === 'Enter' && handleJoinMeeting()}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    color: 'white',
                    borderRadius: 3,
                    backgroundColor: 'rgba(255,255,255,0.05)',
                    transition: 'all 0.3s ease',
                    '& fieldset': {
                      borderColor: 'rgba(255,255,255,0.1)',
                    },
                    '&:hover fieldset': {
                      borderColor: 'rgba(99, 102, 241, 0.5)',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#6366f1',
                    },
                  },
                  '& .MuiInputBase-input::placeholder': {
                    color: 'rgba(255,255,255,0.4)',
                  },
                }}
              />
              <Button
                variant="outlined"
                size="large"
                startIcon={<LoginIcon />}
                onClick={handleJoinMeeting}
                disabled={!meetingId.trim()}
                sx={{
                  py: 1.8,
                  px: 4,
                  whiteSpace: 'nowrap',
                  borderRadius: 3,
                  borderColor: 'rgba(99, 102, 241, 0.5)',
                  color: 'white',
                  fontWeight: 600,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    borderColor: '#6366f1',
                    backgroundColor: 'rgba(99, 102, 241, 0.1)',
                    boxShadow: '0 4px 15px rgba(99, 102, 241, 0.3)',
                  },
                }}
              >
                Join
              </Button>
            </Box>
          </Box>
        </Paper>

        {/* Feature Section */}
        <Box
          display="grid"
          gridTemplateColumns={{ xs: '1fr', md: 'repeat(3, 1fr)' }}
          gap={3}
          pb={8}
        >
          {/* Feature Card 1 - Crystal Clarity */}
          <Paper
            elevation={0}
            sx={{
              p: 4,
              borderRadius: 3,
              backgroundColor: 'rgba(255,255,255,0.02)',
              border: '1px solid rgba(255,255,255,0.05)',
              transition: 'all 0.3s ease',
              '&:hover': {
                backgroundColor: 'rgba(255,255,255,0.05)',
                transform: 'translateY(-4px)',
                borderColor: 'rgba(99,102,241,0.2)',
              },
            }}
          >
            <Box
              sx={{
                width: 56,
                height: 56,
                borderRadius: 3,
                background: 'linear-gradient(135deg, rgba(99,102,241,0.2), rgba(99,102,241,0.1))',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mb: 2,
              }}
            >
              <HdIcon sx={{ fontSize: 28, color: '#6366f1' }} />
            </Box>
            <Typography variant="h6" sx={{ color: 'white', fontWeight: 600, mb: 1 }}>
              Crystal Clarity
            </Typography>
            <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.5)', lineHeight: 1.6 }}>
              4K video quality with adaptive bitrate streaming for smooth meetings anywhere
            </Typography>
          </Paper>

          {/* Feature Card 2 - Zero Trust Security */}
          <Paper
            elevation={0}
            sx={{
              p: 4,
              borderRadius: 3,
              backgroundColor: 'rgba(255,255,255,0.02)',
              border: '1px solid rgba(255,255,255,0.05)',
              transition: 'all 0.3s ease',
              '&:hover': {
                backgroundColor: 'rgba(255,255,255,0.05)',
                transform: 'translateY(-4px)',
                borderColor: 'rgba(99,102,241,0.2)',
              },
            }}
          >
            <Box
              sx={{
                width: 56,
                height: 56,
                borderRadius: 3,
                background: 'linear-gradient(135deg, rgba(139,92,246,0.2), rgba(139,92,246,0.1))',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mb: 2,
              }}
            >
              <SecurityIcon sx={{ fontSize: 28, color: '#8b5cf6' }} />
            </Box>
            <Typography variant="h6" sx={{ color: 'white', fontWeight: 600, mb: 1 }}>
              Zero Trust Security
            </Typography>
            <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.5)', lineHeight: 1.6 }}>
              End-to-end encryption with enterprise-grade security protocols
            </Typography>
          </Paper>

          {/* Feature Card 3 - Spatial Audio */}
          <Paper
            elevation={0}
            sx={{
              p: 4,
              borderRadius: 3,
              backgroundColor: 'rgba(255,255,255,0.02)',
              border: '1px solid rgba(255,255,255,0.05)',
              transition: 'all 0.3s ease',
              '&:hover': {
                backgroundColor: 'rgba(255,255,255,0.05)',
                transform: 'translateY(-4px)',
                borderColor: 'rgba(99,102,241,0.2)',
              },
            }}
          >
            <Box
              sx={{
                width: 56,
                height: 56,
                borderRadius: 3,
                background: 'linear-gradient(135deg, rgba(168,85,247,0.2), rgba(168,85,247,0.1))',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mb: 2,
              }}
            >
              <AudioIcon sx={{ fontSize: 28, color: '#a855f7' }} />
            </Box>
            <Typography variant="h6" sx={{ color: 'white', fontWeight: 600, mb: 1 }}>
              Spatial Audio
            </Typography>
            <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.5)', lineHeight: 1.6 }}>
              Immersive 3D audio that adapts to speaker position and reduces background noise
            </Typography>
          </Paper>
        </Box>
      </Container>
    </Box>
  );
};

export default Home;
