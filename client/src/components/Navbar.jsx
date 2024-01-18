import AccountCircle from "@mui/icons-material/AccountCircle";
import React from "react";
import {
  AppBar,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography
} from "@mui/material";
import './Class-button.css';
import MenuIcon from '@mui/icons-material/Menu';

export const Navbar = (props) => {
  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenu = () => {
    console.log('handle menu');
  };

  const handleClose = () => {
    setAnchorEl(null);
  };


  return (
   <AppBar position={'static'} color="primary" enableColorOnDark>
     <Toolbar>
       <IconButton
         size="large"
         edge="start"
         color="inherit"
         aria-label="menu"
         sx={{ mr: 2 }}
       >
         <MenuIcon />
       </IconButton>
       <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
         Attendance and Payment Tracker
       </Typography>

       {auth && (
         <div>
           <IconButton
             size="large"
             aria-label="account of current user"
             aria-controls="menu-appbar"
             aria-haspopup="true"
             onClick={handleMenu}
             color="inherit"
           >
             <AccountCircle />
           </IconButton>
           <Menu
             id="menu-appbar"
             anchorEl={anchorEl}
             anchorOrigin={{
               vertical: 'top',
               horizontal: 'right',
             }}
             keepMounted
             transformOrigin={{
               vertical: 'top',
               horizontal: 'right',
             }}
             open={Boolean(anchorEl)}
             onClose={handleClose}
           >
             <MenuItem onClick={handleClose}>Profile</MenuItem>
             <MenuItem onClick={handleClose}>My account</MenuItem>
           </Menu>
         </div>
       )}
     </Toolbar>

   </AppBar>
  )
}

export default Navbar
