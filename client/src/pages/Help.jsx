import React from 'react';
import { Box, Typography, Container, Paper, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import { ExpandMore as ExpandMoreIcon, Help as HelpIcon } from '@mui/icons-material';
import Navbar from '../components/Navbar';

const Help = () => {
  const faqs = [
    {
      question: 'How do I start a meeting?',
      answer: 'Click the "Start Meeting" button on the home page. A new meeting room will be created automatically with a unique meeting ID.',
    },
    {
      question: 'How do I join an existing meeting?',
      answer: 'Enter the meeting ID in the input field on the home page and click "Join". You can also join by clicking a meeting link shared by the host.',
    },
    {
      question: 'Can I record meetings?',
      answer: 'Yes, recordings are available for all meetings. Access them from the "Recordings" page in the navigation menu.',
    },
    {
      question: 'Is MeetX secure?',
      answer: 'Yes, MeetX uses end-to-end encryption for all video and audio streams. Meetings are also protected with unique IDs and optional waiting rooms.',
    },
    {
      question: 'How many participants can join?',
      answer: 'MeetX supports up to 100 participants per meeting with crystal clear 4K video quality.',
    },
  ];

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(180deg, #0a0a0f 0%, #12121a 50%, #1a1a2e 100%)',
      }}
    >
      <Navbar />
      <Container maxWidth="lg" sx={{ maxWidth: '1200px !important', pt: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 4 }}>
          <HelpIcon sx={{ fontSize: 40, color: '#6366f1' }} />
          <Typography variant="h4" sx={{ color: 'white', fontWeight: 600 }}>
            Help Center
          </Typography>
        </Box>

        <Paper
          elevation={0}
          sx={{
            borderRadius: 3,
            backgroundColor: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.08)',
            overflow: 'hidden',
          }}
        >
          {faqs.map((faq, index) => (
            <Accordion
              key={index}
              elevation={0}
              sx={{
                backgroundColor: 'transparent',
                borderBottom: index < faqs.length - 1 ? '1px solid rgba(255,255,255,0.1)' : 'none',
                '&:before': { display: 'none' },
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon sx={{ color: 'rgba(255,255,255,0.5)' }} />}
                sx={{
                  '&:hover': {
                    backgroundColor: 'rgba(255,255,255,0.02)',
                  },
                }}
              >
                <Typography sx={{ color: 'white', fontWeight: 500 }}>
                  {faq.question}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography sx={{ color: 'rgba(255,255,255,0.7)' }}>
                  {faq.answer}
                </Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </Paper>
      </Container>
    </Box>
  );
};

export default Help;
