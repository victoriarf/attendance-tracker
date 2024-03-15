import React from 'react';
import { Drawer, List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const drawerWidth = 300;
const navbarHeightMargin = 8;

interface SidebarProps {
  sidebarItems: {
    text: string;
    page: string;
  }[];
}

export const Sidebar = (props: SidebarProps) => {
  const navigate = useNavigate();

  const navigateToItem = (page: string) => {
    navigate(page);
  };

  return (
    <Drawer
      variant="permanent"
      anchor="left"
      open={true}
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        marginTop: 8,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          marginTop: navbarHeightMargin,
        },
      }}>
      <List>
        {props.sidebarItems.map(({ text, page }) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemText primary={text} onClick={() => navigateToItem(page)}></ListItemText>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};
