import Navbar from './Navbar';
import React, { ReactNode } from 'react';
import { Box } from '@mui/material';

const navbarHeightMargin = 8;

interface AppWrapperProps {
  children: ReactNode;
}
const WrapperWithNavbar: React.FC<AppWrapperProps> = ({ children }) => {
  return (
    <Box
      component="main"
      sx={{
        marginTop: navbarHeightMargin,
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
      }}>
      <Navbar />

      {children}
    </Box>
  );
};

export default WrapperWithNavbar;
