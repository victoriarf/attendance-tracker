import styles from './ClassesPage.module.scss';
import {
  Box,
  Drawer,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Paper,
} from '@mui/material';
import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { getUsers } from '../api/usersApi';
import { Search as SearchIcon } from '@mui/icons-material';
import { Search, SearchIconWrapper, StyledInputBase } from '../components/search/SearchComponent';
import WrapperWithNavbar from '../components/WrapperWithNavbar';
import StudentsExpirations from '../components/StudentsExpirations';

interface TabUser {
  _id: string;
  name: string;
}

const drawerWidth = 300; // TODO: move
const navbarHeightMargin = 8;
const sidebarItems = ['Attendance', 'Expirations', 'Reminders'];

const StudentsPage = () => {
  const [activeUserId, setActiveUser] = useState<string | null>('');
  const { isLoading, data: users } = useQuery('users', () => getUsers(), {
    onSuccess: users => {
      setActiveUser(users[0]._id);
    },
  });

  function onUserChanged(newValue: string) {
    setActiveUser(newValue);
  }

  return (
    <WrapperWithNavbar>
      {isLoading ? (
        <p className={styles.loading}> Loading... </p>
      ) : (
        <>
          <Box sx={{ display: 'flex' }}>
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
                {sidebarItems.map(text => (
                  <ListItem key={text} disablePadding>
                    <ListItemButton>
                      <ListItemText primary={text} />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            </Drawer>

            <Box>
              <Search>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase placeholder="Search…" inputProps={{ 'aria-label': 'search' }} />
              </Search>
            </Box>

            <Grid item xs={12}>
              <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                <StudentsExpirations></StudentsExpirations>
              </Paper>
            </Grid>
          </Box>
        </>
      )}
    </WrapperWithNavbar>
  );
};

export default StudentsPage;
