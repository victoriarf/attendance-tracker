import AccountCircle from '@mui/icons-material/AccountCircle';
import React, { SyntheticEvent, useContext } from 'react';
import { AppBar, Button, IconButton, Menu, MenuItem, Toolbar, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';

import { AuthContext } from '../AuthContext.jsx';

export const Navbar = () => {
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = React.useState<Element | null>(null);
  const { userValue, setUserValue } = useContext(AuthContext);

  const handleMenu = (event: SyntheticEvent) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const logout = () => {
    setUserValue(undefined);
    navigate('/login');
  };

  const openProfile = () => {
    navigate('/profile');
  };

  const navigateHome = () => {
    navigate('/classes');
  };

  return (
    <AppBar
      position={'fixed'}
      color="primary"
      enableColorOnDark
      sx={{ zIndex: theme => theme.zIndex.drawer + 1 }}>
      <Toolbar>
        <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <Button variant="text" color="inherit" onClick={navigateHome}>
            Attendance and Payment Tracker
          </Button>
        </Typography>

        {userValue && (
          <div>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={(event: SyntheticEvent) => handleMenu(event)}
              color="inherit">
              <AccountCircle />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}>
              <MenuItem onClick={openProfile}>Profile</MenuItem>
              <MenuItem onClick={logout}>Log out</MenuItem>
            </Menu>
          </div>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
