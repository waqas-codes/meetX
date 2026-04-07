import React from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Avatar,
  Button,
} from '@mui/material';
import {
  HelpOutline as HelpIcon,
  Settings as SettingsIcon,
} from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, isAuthenticated } = useAuth();

  const navItems = [
    { label: 'Meetings', path: '/meetings' },
    { label: 'Recordings', path: '/recordings' },
    { label: 'Schedule', path: '/schedules' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
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
          component={NavLink}
          to="/"
          sx={{
            fontWeight: 800,
            background: 'linear-gradient(90deg, #6366f1, #8b5cf6)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            cursor: 'pointer',
            textDecoration: 'none',
          }}
        >
          MeetX
        </Typography>

        {/* Center Navigation */}
        <Box
          sx={{
            display: { xs: 'none', md: 'flex' },
            gap: 1,
            alignItems: 'center',
          }}
        >
          {navItems.map((item) => (
            <Button
              key={item.path}
              component={NavLink}
              to={item.path}
              sx={{
                color: isActive(item.path) ? 'white' : 'rgba(255,255,255,0.6)',
                fontWeight: isActive(item.path) ? 600 : 500,
                px: 2,
                py: 1,
                borderRadius: 2,
                backgroundColor: isActive(item.path) ? 'rgba(99,102,241,0.2)' : 'transparent',
                border: isActive(item.path) ? '1px solid rgba(99,102,241,0.3)' : '1px solid transparent',
                transition: 'all 0.3s ease',
                textTransform: 'none',
                fontSize: '1rem',
                '&:hover': {
                  color: 'white',
                  backgroundColor: isActive(item.path) ? 'rgba(99,102,241,0.3)' : 'rgba(255,255,255,0.05)',
                },
              }}
            >
              {item.label}
            </Button>
          ))}
        </Box>

        {/* Right Icons */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <IconButton
            component={NavLink}
            to="/help"
            sx={{
              color: isActive('/help') ? '#6366f1' : 'rgba(255,255,255,0.6)',
              '&:hover': { color: 'white', backgroundColor: 'rgba(255,255,255,0.1)' },
            }}
          >
            <HelpIcon />
          </IconButton>
          <IconButton
            component={NavLink}
            to="/settings"
            sx={{
              color: isActive('/settings') ? '#6366f1' : 'rgba(255,255,255,0.6)',
              '&:hover': { color: 'white', backgroundColor: 'rgba(255,255,255,0.1)' },
            }}
          >
            <SettingsIcon />
          </IconButton>
          <Avatar
            component={NavLink}
            to="/account"
            src={user?.photoURL}
            sx={{
              ml: 1,
              width: 36,
              height: 36,
              bgcolor: isActive('/account') ? '#6366f1' : 'rgba(99,102,241,0.3)',
              border: isActive('/account') ? '2px solid #6366f1' : '2px solid rgba(99,102,241,0.5)',
              cursor: 'pointer',
              textDecoration: 'none',
              transition: 'all 0.3s ease',
              '&:hover': {
                borderColor: '#6366f1',
                backgroundColor: 'rgba(99,102,241,0.5)',
              },
            }}
          >
            {user?.photoURL ? null : (
              <Typography variant="caption" sx={{ color: 'white', fontWeight: 600, textDecoration: 'none' }}>
                {user?.name?.charAt(0) || 'U'}
              </Typography>
            )}
          </Avatar>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
