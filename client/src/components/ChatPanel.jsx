import React, { useState, useEffect, useRef } from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Typography,
  Box,
  TextField,
  IconButton,
  Paper,
} from '@mui/material';
import { Send as SendIcon, Person as PersonIcon } from '@mui/icons-material';
import {
  sendChatMessage,
  onChatMessage,
  offChatMessage,
} from '../services/socketService';

const ChatPanel = ({ meetingId, open, onClose }) => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const messagesEndRef = useRef(null);

  useEffect(() => {
    onChatMessage((data) => {
      setMessages((prev) => [...prev, data]);
    });

    return () => {
      offChatMessage();
    };
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = () => {
    if (inputMessage.trim()) {
      const messageData = {
        sender: 'You',
        message: inputMessage.trim(),
        timestamp: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, messageData]);
      sendChatMessage(meetingId, inputMessage.trim());
      setInputMessage('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          width: 320,
          maxWidth: '100%',
          backgroundColor: 'rgba(30, 30, 30, 0.95)',
          backdropFilter: 'blur(15px)',
          boxShadow: '-4px 0 24px rgba(0, 0, 0, 0.4)',
        },
      }}
    >
      <Box sx={{ p: 3, borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
        <Typography variant="h6" color="white" fontWeight={600}>
          Chat
        </Typography>
        <Box
          sx={{
            mt: 1.5,
            height: 2,
            width: 40,
            background: 'linear-gradient(90deg, #6366f1, #8b5cf6)',
            borderRadius: 1,
          }}
        />
      </Box>

      <Box sx={{ flex: 1, overflow: 'auto', p: 2, height: { xs: 'calc(100vh - 140px)', md: 'calc(100vh - 180px)' } }}>
        <List sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          {messages.map((msg, index) => (
            <ListItem
              key={index}
              sx={{
                px: 2,
                py: 1.5,
                borderRadius: 2,
                backgroundColor: msg.sender === 'You' ? 'rgba(99, 102, 241, 0.1)' : 'rgba(255, 255, 255, 0.03)',
                border: msg.sender === 'You' ? '1px solid rgba(99, 102, 241, 0.15)' : 'none',
                transition: 'all 0.3s ease',
                '&:hover': {
                  backgroundColor: msg.sender === 'You' ? 'rgba(99, 102, 241, 0.15)' : 'rgba(255, 255, 255, 0.06)',
                },
              }}
            >
              <ListItemAvatar>
                <Avatar sx={{ bgcolor: msg.sender === 'You' ? '#6366f1' : '#8b5cf6', width: 36, height: 36 }}>
                  <PersonIcon sx={{ fontSize: 18 }} />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="body2" sx={{ color: '#6366f1', fontWeight: 600 }}>
                      {msg.sender === 'You' ? 'You' : `User ${msg.sender.slice(-4)}`}
                    </Typography>
                    <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.75rem' }}>
                      {formatTime(msg.timestamp)}
                    </Typography>
                  </Box>
                }
                secondary={
                  <Typography variant="body2" color="white" sx={{ mt: 0.5 }}>
                    {msg.message}
                  </Typography>
                }
              />
            </ListItem>
          ))}
          <div ref={messagesEndRef} />
        </List>
      </Box>

      <Paper
        component="form"
        sx={{
          p: 2,
          backgroundColor: 'transparent',
          borderTop: '1px solid rgba(255,255,255,0.1)',
          display: 'flex',
          gap: 1,
        }}
        onSubmit={(e) => {
          e.preventDefault();
          handleSendMessage();
        }}
      >
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Type a message..."
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          size="small"
          sx={{
            '& .MuiOutlinedInput-root': {
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              color: 'white',
              borderRadius: 2,
              transition: 'all 0.3s ease',
              '& fieldset': {
                borderColor: 'rgba(255, 255, 255, 0.1)',
              },
              '&:hover fieldset': {
                borderColor: 'rgba(99, 102, 241, 0.5)',
              },
              '&.Mui-focused fieldset': {
                borderColor: '#6366f1',
              },
            },
          }}
        />
        <IconButton
          type="submit"
          disabled={!inputMessage.trim()}
          sx={{
            backgroundColor: inputMessage.trim() ? '#6366f1' : 'rgba(255,255,255,0.1)',
            color: 'white',
            width: 40,
            height: 40,
            borderRadius: 2,
            transition: 'all 0.3s ease',
            '&:hover': {
              backgroundColor: inputMessage.trim() ? '#8b5cf6' : 'rgba(255,255,255,0.15)',
              transform: inputMessage.trim() ? 'scale(1.05)' : 'none',
              boxShadow: inputMessage.trim() ? '0 4px 15px rgba(99, 102, 241, 0.4)' : 'none',
            },
          }}
        >
          <SendIcon sx={{ fontSize: 20 }} />
        </IconButton>
      </Paper>
    </Drawer>
  );
};

export default ChatPanel;
