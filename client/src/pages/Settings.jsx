import React from 'react';
import { Box, Typography, Container, Paper, List, ListItem, ListItemText, Switch, Divider } from '@mui/material';
import { Notifications as NotificationIcon, Videocam as VideoIcon, Mic as MicIcon, Security as SecurityIcon } from '@mui/icons-material';
import Navbar from '../components/Navbar';

const Settings = () => {
  const [settings, setSettings] = React.useState({
    notifications: true,
    autoJoinVideo: true,
    autoJoinAudio: true,
    waitingRoom: false,
  });

  const handleToggle = (setting) => {
    setSettings((prev) => ({ ...prev, [setting]: !prev[setting] }));
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
          Settings
        </Typography>
        
        <Paper
          elevation={0}
          sx={{
            borderRadius: 3,
            backgroundColor: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.08)',
          }}
        >
          <List>
            <ListItem>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flex: 1 }}>
                <NotificationIcon sx={{ color: '#6366f1' }} />
                <ListItemText
                  primary={<Typography sx={{ color: 'white' }}>Notifications</Typography>}
                  secondary={<Typography sx={{ color: 'rgba(255,255,255,0.5)' }}>Receive meeting reminders</Typography>}
                />
              </Box>
              <Switch
                checked={settings.notifications}
                onChange={() => handleToggle('notifications')}
                sx={{
                  '& .MuiSwitch-switchBase.Mui-checked': {
                    color: '#6366f1',
                  },
                  '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                    backgroundColor: '#6366f1',
                  },
                }}
              />
            </ListItem>
            <Divider sx={{ backgroundColor: 'rgba(255,255,255,0.1)' }} />
            
            <ListItem>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flex: 1 }}>
                <VideoIcon sx={{ color: '#8b5cf6' }} />
                <ListItemText
                  primary={<Typography sx={{ color: 'white' }}>Auto-join Video</Typography>}
                  secondary={<Typography sx={{ color: 'rgba(255,255,255,0.5)' }}>Turn on camera when joining</Typography>}
                />
              </Box>
              <Switch
                checked={settings.autoJoinVideo}
                onChange={() => handleToggle('autoJoinVideo')}
                sx={{
                  '& .MuiSwitch-switchBase.Mui-checked': {
                    color: '#6366f1',
                  },
                  '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                    backgroundColor: '#6366f1',
                  },
                }}
              />
            </ListItem>
            <Divider sx={{ backgroundColor: 'rgba(255,255,255,0.1)' }} />
            
            <ListItem>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flex: 1 }}>
                <MicIcon sx={{ color: '#a855f7' }} />
                <ListItemText
                  primary={<Typography sx={{ color: 'white' }}>Auto-join Audio</Typography>}
                  secondary={<Typography sx={{ color: 'rgba(255,255,255,0.5)' }}>Turn on microphone when joining</Typography>}
                />
              </Box>
              <Switch
                checked={settings.autoJoinAudio}
                onChange={() => handleToggle('autoJoinAudio')}
                sx={{
                  '& .MuiSwitch-switchBase.Mui-checked': {
                    color: '#6366f1',
                  },
                  '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                    backgroundColor: '#6366f1',
                  },
                }}
              />
            </ListItem>
            <Divider sx={{ backgroundColor: 'rgba(255,255,255,0.1)' }} />
            
            <ListItem>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flex: 1 }}>
                <SecurityIcon sx={{ color: '#22c55e' }} />
                <ListItemText
                  primary={<Typography sx={{ color: 'white' }}>Waiting Room</Typography>}
                  secondary={<Typography sx={{ color: 'rgba(255,255,255,0.5)' }}>Host must admit participants</Typography>}
                />
              </Box>
              <Switch
                checked={settings.waitingRoom}
                onChange={() => handleToggle('waitingRoom')}
                sx={{
                  '& .MuiSwitch-switchBase.Mui-checked': {
                    color: '#6366f1',
                  },
                  '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                    backgroundColor: '#6366f1',
                  },
                }}
              />
            </ListItem>
          </List>
        </Paper>
      </Container>
    </Box>
  );
};

export default Settings;
