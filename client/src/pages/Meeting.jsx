import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Grid, Typography, Fab, Zoom } from '@mui/material';
import { Chat as ChatIcon } from '@mui/icons-material';
import VideoCard from '../components/VideoCard';
import ControlBar from '../components/ControlBar';
import ChatPanel from '../components/ChatPanel';
import ParticipantsPanel from '../components/ParticipantsPanel';
import { useWebRTC } from '../hooks/useWebRTC';

const Meeting = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isParticipantsOpen, setIsParticipantsOpen] = useState(false);

  const {
    localStream,
    screenStream,
    peers,
    toggleAudio,
    toggleVideo,
    toggleScreenShare,
    isAudioEnabled,
    isVideoEnabled,
    isScreenSharing,
  } = useWebRTC(id);

  const handleEndCall = () => {
    navigate('/');
  };

  const getGridColumns = (count) => {
    if (count <= 1) return 12;
    if (count === 2) return 6;
    if (count <= 4) return 6;
    return 4;
  };

  const totalParticipants = 1 + peers.length;
  const gridSize = getGridColumns(totalParticipants);

  return (
    <Box
      sx={{
        minHeight: '100vh',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#121212',
        overflow: 'hidden',
      }}
    >
      {/* Main Content Area with max-width container */}
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          maxWidth: '1400px',
          width: '100%',
          mx: 'auto',
          p: { xs: 1.5, md: 2 },
          pb: { xs: '80px', md: 2 },
          overflow: 'auto',
        }}
      >
        <Typography 
          variant="h6" 
          sx={{ 
            mb: { xs: 1.5, md: 2 }, 
            color: 'white', 
            fontSize: { xs: '0.9rem', md: '1.1rem' },
            flexShrink: 0,
          }}
        >
          Meeting: {id} ({totalParticipants} participants)
        </Typography>

        <Grid 
          container 
          spacing={{ xs: 1.5, md: 2 }} 
          sx={{ 
            flex: 1,
            alignContent: 'flex-start',
            justifyContent: 'center',
          }}
        >
          <Grid item xs={12} md={gridSize} sx={{ maxWidth: { md: '720px' } }}>
            <VideoCard stream={isScreenSharing ? screenStream : localStream} username="You" />
          </Grid>
          {peers.map((peer) => (
            <Grid key={peer.userId} item xs={12} md={gridSize} sx={{ maxWidth: { md: '720px' } }}>
              <VideoCard stream={peer.stream} username={`User ${peer.userId.slice(-4)}`} />
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Control Bar - Fixed on mobile, relative on desktop */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          pb: { xs: 2, md: 3 },
          px: { xs: 1, md: 0 },
          position: { xs: 'fixed', md: 'relative' },
          bottom: { xs: 0, md: 'auto' },
          left: { xs: 0, md: 'auto' },
          right: { xs: 0, md: 'auto' },
          zIndex: 1000,
          background: { 
            xs: 'linear-gradient(to top, rgba(18,18,18,1) 0%, rgba(18,18,18,0.95) 50%, transparent 100%)', 
            md: 'transparent' 
          },
          pt: { xs: 2, md: 0 },
          pointerEvents: 'none',
          '& > *': {
            pointerEvents: 'auto',
          },
        }}
      >
        <ControlBar
          onEndCall={handleEndCall}
          onToggleAudio={toggleAudio}
          onToggleVideo={toggleVideo}
          onToggleScreenShare={toggleScreenShare}
          onToggleChat={() => setIsChatOpen(true)}
          onToggleParticipants={() => setIsParticipantsOpen(true)}
          isAudioEnabled={isAudioEnabled}
          isVideoEnabled={isVideoEnabled}
          isScreenSharing={isScreenSharing}
          meetingId={id}
        />
      </Box>

      <ChatPanel
        meetingId={id}
        open={isChatOpen}
        onClose={() => setIsChatOpen(false)}
      />

      {/* Mobile Floating Chat Button */}
      <Zoom in={true}>
        <Fab
          color="primary"
          aria-label="chat"
          onClick={() => setIsChatOpen(true)}
          sx={{
            position: 'fixed',
            bottom: { xs: 90, md: 24 },
            right: { xs: 16, md: 24 },
            display: { xs: 'flex', md: 'none' },
            background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
            boxShadow: '0 4px 20px rgba(99, 102, 241, 0.4)',
            width: 56,
            height: 56,
            '&:hover': {
              background: 'linear-gradient(135deg, #8b5cf6, #6366f1)',
              transform: 'scale(1.1)',
              boxShadow: '0 6px 24px rgba(99, 102, 241, 0.5)',
            },
            transition: 'all 0.3s ease',
            zIndex: 1001,
          }}
        >
          <ChatIcon sx={{ fontSize: 24 }} />
        </Fab>
      </Zoom>

      <ParticipantsPanel
        participants={peers}
        open={isParticipantsOpen}
        onClose={() => setIsParticipantsOpen(false)}
      />
    </Box>
  );
};

export default Meeting;
