import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Container, Paper, TextField, Button, Avatar, Tabs, Tab, Divider } from '@mui/material';
import { Person as PersonIcon, Lock as LockIcon, Google as GoogleIcon } from '@mui/icons-material';
import Navbar from '../components/Navbar';
import { useAuth } from '../context/AuthContext';

const Account = () => {
  const navigate = useNavigate();
  const { user, signInWithGoogle, logout, isAuthenticated } = useAuth();
  const [activeTab, setActiveTab] = useState(0);
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setName(user.name || '');
    }
  }, [user]);

  const handleGoogleSignIn = async () => {
    try {
      setLoading(true);
      await signInWithGoogle();
      navigate('/meetings');
    } catch (error) {
      console.error('Sign in error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  if (!isAuthenticated) {
    return (
      <Box
        sx={{
          minHeight: '100vh',
          background: 'linear-gradient(180deg, #0a0a0f 0%, #12121a 50%, #1a1a2e 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Paper
          elevation={0}
          sx={{
            p: 4,
            borderRadius: 3,
            backgroundColor: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.08)',
            maxWidth: 400,
            width: '100%',
            mx: 2,
          }}
        >
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Typography
              variant="h4"
              sx={{
                fontWeight: 800,
                background: 'linear-gradient(90deg, #6366f1, #8b5cf6)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              MeetX
            </Typography>
            <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.5)', mt: 1 }}>
              Sign in to your account
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <Button
              variant="contained"
              size="large"
              startIcon={<GoogleIcon />}
              onClick={handleGoogleSignIn}
              disabled={loading}
              sx={{
                py: 1.5,
                backgroundColor: '#fff',
                color: '#333',
                fontWeight: 600,
                '&:hover': {
                  backgroundColor: '#f0f0f0',
                  boxShadow: '0 4px 12px rgba(255,255,255,0.2)',
                },
              }}
            >
              {loading ? 'Signing in...' : 'Sign in with Google'}
            </Button>

            <Divider sx={{ borderColor: 'rgba(255,255,255,0.1)' }}>
              <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.4)', px: 2 }}>
                OR
              </Typography>
            </Divider>

            <TextField
              fullWidth
              label="Email"
              type="email"
              disabled
              sx={{
                '& .MuiOutlinedInput-root': {
                  color: 'rgba(255,255,255,0.3)',
                  '& fieldset': { borderColor: 'rgba(255,255,255,0.1)' },
                },
                '& .MuiInputLabel-root': { color: 'rgba(255,255,255,0.3)' },
              }}
            />
            <TextField
              fullWidth
              label="Password"
              type="password"
              disabled
              sx={{
                '& .MuiOutlinedInput-root': {
                  color: 'rgba(255,255,255,0.3)',
                  '& fieldset': { borderColor: 'rgba(255,255,255,0.1)' },
                },
                '& .MuiInputLabel-root': { color: 'rgba(255,255,255,0.3)' },
              }}
            />
            <Button
              variant="contained"
              size="large"
              disabled
              sx={{
                py: 1.5,
                background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                opacity: 0.5,
              }}
            >
              Sign In (Coming Soon)
            </Button>
          </Box>
        </Paper>
      </Box>
    );
  }

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
          Account
        </Typography>

        <Paper
          elevation={0}
          sx={{
            borderRadius: 3,
            backgroundColor: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.08)',
            overflow: 'hidden',
          }}
        >
          <Tabs
            value={activeTab}
            onChange={(e, newValue) => setActiveTab(newValue)}
            sx={{
              borderBottom: '1px solid rgba(255,255,255,0.1)',
              '& .MuiTab-root': { color: 'rgba(255,255,255,0.5)' },
              '& .MuiTab-root.Mui-selected': { color: '#6366f1' },
              '& .MuiTabs-indicator': { backgroundColor: '#6366f1' },
            }}
          >
            <Tab icon={<PersonIcon />} label="Profile" />
            <Tab icon={<LockIcon />} label="Security" />
          </Tabs>

          <Box sx={{ p: 4 }}>
            {activeTab === 0 && (
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, alignItems: 'center' }}>
                <Avatar
                  src={user?.photoURL}
                  sx={{
                    width: 100,
                    height: 100,
                    bgcolor: 'rgba(99,102,241,0.3)',
                    border: '3px solid rgba(99,102,241,0.5)',
                    fontSize: '2rem',
                  }}
                >
                  {user?.name?.charAt(0) || 'U'}
                </Avatar>
                <TextField
                  fullWidth
                  label="Display Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
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
                  label="Email"
                  value={user?.email || ''}
                  disabled
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      color: 'rgba(255,255,255,0.5)',
                    },
                  }}
                />
                <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.4)' }}>
                  Signed in with Google
                </Typography>
              </Box>
            )}

            {activeTab === 1 && (
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                <Button
                  variant="outlined"
                  disabled
                  sx={{
                    borderColor: 'rgba(255,255,255,0.2)',
                    color: 'white',
                    opacity: 0.5,
                  }}
                >
                  Change Password (Google Account)
                </Button>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={handleLogout}
                  sx={{
                    borderColor: 'rgba(220,38,38,0.5)',
                    '&:hover': { borderColor: '#dc2626', backgroundColor: 'rgba(220,38,38,0.1)' },
                  }}
                >
                  Sign Out
                </Button>
              </Box>
            )}
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default Account;
