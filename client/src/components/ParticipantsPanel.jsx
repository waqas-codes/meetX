import React from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Typography,
  Box,
  IconButton,
} from '@mui/material';
import { Person as PersonIcon, Mic as MicIcon, MicOff as MicOffIcon } from '@mui/icons-material';

const ParticipantsPanel = ({ participants, open, onClose, currentUserId }) => {
  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          width: 300,
          maxWidth: '100%',
          backgroundColor: 'rgba(30, 30, 30, 0.95)',
          backdropFilter: 'blur(15px)',
          boxShadow: '-4px 0 24px rgba(0, 0, 0, 0.4)',
        },
      }}
    >
      <Box sx={{ p: 3, borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
        <Typography variant="h6" color="white" fontWeight={600}>
          Participants ({participants.length + 1})
        </Typography>
        <Box
          sx={{
            mt: 1.5,
            height: 2,
            width: 60,
            background: 'linear-gradient(90deg, #6366f1, #8b5cf6)',
            borderRadius: 1,
          }}
        />
      </Box>

      <Box sx={{ p: 2 }}>
        <List sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          <ListItem
            sx={{
              px: 2,
              py: 1.5,
              borderRadius: 2,
              backgroundColor: 'rgba(99, 102, 241, 0.1)',
              border: '1px solid rgba(99, 102, 241, 0.2)',
              transition: 'all 0.3s ease',
            }}
          >
            <ListItemAvatar>
              <Avatar sx={{ bgcolor: '#6366f1', width: 40, height: 40 }}>
                <PersonIcon sx={{ fontSize: 20 }} />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={
                <Typography variant="body1" color="white" fontWeight={600}>
                  You (Host)
                </Typography>
              }
            />
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 28,
                height: 28,
                borderRadius: '50%',
                backgroundColor: 'rgba(34, 197, 94, 0.2)',
                boxShadow: '0 0 8px rgba(34, 197, 94, 0.3)',
              }}
            >
              <MicIcon sx={{ fontSize: 14, color: '#22c55e' }} />
            </Box>
          </ListItem>

          {participants.map((participant) => (
            <ListItem
              key={participant.userId}
              sx={{
                px: 2,
                py: 1.5,
                borderRadius: 2,
                backgroundColor: 'rgba(255, 255, 255, 0.03)',
                transition: 'all 0.3s ease',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.08)',
                },
              }}
            >
              <ListItemAvatar>
                <Avatar sx={{ bgcolor: '#8b5cf6', width: 40, height: 40 }}>
                  <PersonIcon sx={{ fontSize: 20 }} />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Typography variant="body1" color="white">
                    User {participant.userId.slice(-4)}
                  </Typography>
                }
              />
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 28,
                  height: 28,
                  borderRadius: '50%',
                  backgroundColor: 'rgba(34, 197, 94, 0.2)',
                  boxShadow: '0 0 8px rgba(34, 197, 94, 0.3)',
                }}
              >
                <MicIcon sx={{ fontSize: 14, color: '#22c55e' }} />
              </Box>
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  );
};

export default ParticipantsPanel;
