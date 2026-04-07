import React, { useState } from 'react';
import { Box, IconButton, Tooltip, Snackbar } from '@mui/material';
import {
  Mic as MicIcon,
  MicOff as MicOffIcon,
  Videocam as VideocamIcon,
  VideocamOff as VideocamOffIcon,
  CallEnd as CallEndIcon,
  ScreenShare as ScreenShareIcon,
  StopScreenShare as StopScreenShareIcon,
  Link as LinkIcon,
  Chat as ChatIcon,
  People as PeopleIcon,
} from '@mui/icons-material';

const ControlBar = ({
  onEndCall,
  onToggleAudio,
  onToggleVideo,
  onToggleScreenShare,
  onToggleChat,
  onToggleParticipants,
  isAudioEnabled = true,
  isVideoEnabled = true,
  isScreenSharing = false,
  meetingId,
}) => {
  const [copySuccess, setCopySuccess] = useState(false);

  const toggleMic = () => {
    onToggleAudio?.();
  };

  const toggleCamera = () => {
    onToggleVideo?.();
  };

  const handleCopyLink = () => {
    const link = `${window.location.origin}/meeting/${meetingId}`;
    navigator.clipboard.writeText(link);
    setCopySuccess(true);
  };

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: { xs: 1.5, md: 2 },
          py: { xs: 2, md: 2.5 },
          px: { xs: 3, md: 5 },
          backgroundColor: 'rgba(20, 20, 20, 0.7)',
          backdropFilter: 'blur(25px)',
          borderRadius: 50,
          border: '1px solid rgba(255, 255, 255, 0.08)',
          boxShadow: '0 12px 40px rgba(0, 0, 0, 0.5)',
          mx: { xs: 1, md: 0 },
        }}
      >
        <Tooltip title={isAudioEnabled ? 'Mute' : 'Unmute'}>
          <IconButton
            onClick={toggleMic}
            sx={{
              backgroundColor: isAudioEnabled ? '#22c55e' : '#dc2626',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              '&:hover': {
                backgroundColor: isAudioEnabled ? '#16a34a' : '#b91c1c',
                transform: 'scale(1.1)',
                boxShadow: isAudioEnabled 
                  ? '0 0 20px rgba(34, 197, 94, 0.5)' 
                  : '0 0 20px rgba(220, 38, 38, 0.5)',
              },
              width: { xs: 56, md: 52 },
              height: { xs: 56, md: 52 },
            }}
          >
            {isAudioEnabled ? (
              <MicIcon sx={{ color: 'white', transition: 'all 0.3s ease', fontSize: { xs: 24, md: 20 } }} />
            ) : (
              <MicOffIcon sx={{ color: 'white', transition: 'all 0.3s ease', fontSize: { xs: 24, md: 20 } }} />
            )}
          </IconButton>
        </Tooltip>

        <Tooltip title={isVideoEnabled ? 'Turn off camera' : 'Turn on camera'}>
          <IconButton
            onClick={toggleCamera}
            sx={{
              backgroundColor: isVideoEnabled ? 'rgba(60, 64, 67, 0.9)' : '#dc2626',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              '&:hover': {
                backgroundColor: isVideoEnabled ? 'rgba(80, 84, 87, 0.9)' : '#b91c1c',
                transform: 'scale(1.1)',
                boxShadow: isVideoEnabled 
                  ? '0 0 20px rgba(99, 102, 241, 0.4)' 
                  : '0 0 20px rgba(220, 38, 38, 0.5)',
              },
              width: { xs: 56, md: 52 },
              height: { xs: 56, md: 52 },
            }}
          >
            {isVideoEnabled ? (
              <VideocamIcon sx={{ color: 'white', transition: 'all 0.3s ease', fontSize: { xs: 24, md: 20 } }} />
            ) : (
              <VideocamOffIcon sx={{ color: 'white', transition: 'all 0.3s ease', fontSize: { xs: 24, md: 20 } }} />
            )}
          </IconButton>
        </Tooltip>

        <Tooltip title={isScreenSharing ? 'Stop sharing' : 'Share screen'}>
          <IconButton
            onClick={onToggleScreenShare}
            sx={{
              backgroundColor: isScreenSharing ? '#1a73e8' : 'rgba(60, 64, 67, 0.9)',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              '&:hover': {
                backgroundColor: isScreenSharing ? '#1557b0' : 'rgba(80, 84, 87, 0.9)',
                transform: 'scale(1.1)',
                boxShadow: isScreenSharing 
                  ? '0 0 20px rgba(26, 115, 232, 0.5)' 
                  : '0 0 20px rgba(99, 102, 241, 0.4)',
              },
              width: { xs: 56, md: 52 },
              height: { xs: 56, md: 52 },
            }}
          >
            {isScreenSharing ? (
              <StopScreenShareIcon sx={{ color: 'white', transition: 'all 0.3s ease', fontSize: { xs: 24, md: 20 } }} />
            ) : (
              <ScreenShareIcon sx={{ color: 'white', transition: 'all 0.3s ease', fontSize: { xs: 24, md: 20 } }} />
            )}
          </IconButton>
        </Tooltip>

        <Tooltip title="End call">
          <IconButton
            onClick={onEndCall}
            sx={{
              backgroundColor: '#dc2626',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              '&:hover': {
                backgroundColor: '#b91c1c',
                transform: 'scale(1.1)',
                boxShadow: '0 0 25px rgba(220, 38, 38, 0.6)',
              },
              width: { xs: 56, md: 52 },
              height: { xs: 56, md: 52 },
            }}
          >
            <CallEndIcon sx={{ color: 'white', transition: 'all 0.3s ease', fontSize: { xs: 24, md: 20 } }} />
          </IconButton>
        </Tooltip>
      </Box>

      <Snackbar
        open={copySuccess}
        autoHideDuration={2000}
        onClose={() => setCopySuccess(false)}
        message="Meeting link copied to clipboard"
      />
    </>
  );
};

export default ControlBar;
