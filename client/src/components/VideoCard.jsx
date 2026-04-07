import React, { useEffect, useRef } from 'react';
import { Paper, Typography, Box, Avatar, IconButton } from '@mui/material';
import { Person as PersonIcon, Mic as MicIcon, MicOff as MicOffIcon } from '@mui/icons-material';

const VideoCard = ({ stream, username = 'User', isActiveSpeaker = false, isMuted = false, isMobile = false }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);

  return (
    <Paper
      elevation={2}
      sx={{
        aspectRatio: '16/9',
        backgroundColor: '#1e1e1e',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: { xs: 3, md: 2 },
        position: 'relative',
        overflow: 'hidden',
        boxShadow: isActiveSpeaker
          ? '0 0 0 2px rgba(99,102,241,0.6), 0 0 20px rgba(99,102,241,0.4)'
          : '0 0 0 1px rgba(99,102,241,0.2)',
        transform: isActiveSpeaker ? 'scale(1.02)' : 'scale(1)',
        transition: 'all 0.3s ease',
        '&:hover': {
          transform: isActiveSpeaker ? 'scale(1.02)' : 'scale(1.02)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(99,102,241,0.3)',
          zIndex: 10,
        },
      }}
    >
      {stream ? (
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted={username === 'You'}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
      ) : (
        <Avatar
          sx={{
            width: 80,
            height: 80,
            bgcolor: 'primary.main',
          }}
        >
          <PersonIcon sx={{ fontSize: 40 }} />
        </Avatar>
      )}

      {/* Mic Icon */}
      <Box
        sx={{
          position: 'absolute',
          top: { xs: 12, md: 8 },
          right: { xs: 12, md: 8 },
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: { xs: 36, md: 28 },
          height: { xs: 36, md: 28 },
          borderRadius: '50%',
          backgroundColor: isMuted ? 'rgba(0,0,0,0.5)' : 'rgba(34,197,94,0.2)',
          transition: 'all 0.3s ease',
          boxShadow: isMuted ? 'none' : '0 0 8px rgba(34,197,94,0.5)',
        }}
      >
        {isMuted ? (
          <MicOffIcon sx={{ fontSize: { xs: 18, md: 16 }, color: 'rgba(255,255,255,0.5)' }} />
        ) : (
          <MicIcon sx={{ fontSize: { xs: 18, md: 16 }, color: '#22c55e' }} />
        )}
      </Box>

      {/* Name Tag */}
      <Typography
        variant="body2"
        sx={{
          position: 'absolute',
          bottom: { xs: 16, md: 12 },
          left: { xs: 16, md: 12 },
          color: 'white',
          backgroundColor: 'rgba(0, 0, 0, 0.4)',
          backdropFilter: 'blur(10px)',
          px: { xs: 2, md: 1.5 },
          py: { xs: 0.75, md: 0.5 },
          borderRadius: 20,
          fontSize: { xs: '1rem', md: '0.85rem' },
          fontWeight: 500,
          border: '1px solid rgba(255,255,255,0.1)',
        }}
      >
        {username}
      </Typography>
    </Paper>
  );
};

export default VideoCard;
