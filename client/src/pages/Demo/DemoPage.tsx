import React from 'react';
import { EmailForm } from './components/EmailForm';
import Navbar from '../../components/Navbar';
import { Box, Container, Typography } from '@mui/material';

export const DemoPage = () => {
  return (
    <>
      <Navbar></Navbar>

      <Container component="main" maxWidth="xs" sx={{ mt: 4 }}>
        <Typography component="h2" variant="h5">
          UseId()
        </Typography>

        <EmailForm />

        <Box sx={{ mt: 3 }}> Other content would probably go there on any typicl landing page </Box>
        <Box> And somewhere at the bottom there will be Email form again </Box>
        <Box sx={{ mt: 3, mb: 2 }}>
          {' '}
          s The useId hook is used to prevent a problem with repeating ids if the component was
          reused{' '}
        </Box>

        <EmailForm></EmailForm>
      </Container>
    </>
  );
};
