import React from 'react';
import { Box, CircularProgress } from '@mui/material';

const Loading = () => {
  return (
    <Box
      style={{
        display: 'flex',
        justifyContent: 'center',
        verticalAlign: 'center',
        alignItems: 'center',
        height: '100%',
      }}>
      <CircularProgress />
    </Box>
  );
};

export default Loading;
