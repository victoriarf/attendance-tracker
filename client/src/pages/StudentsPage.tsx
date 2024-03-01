import styles from './ClassesPage.module.scss';
import { Box, Drawer, List, ListItem, ListItemButton, ListItemText, Tab } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { getUsers } from '../api/usersApi';
import { Search as SearchIcon } from '@mui/icons-material';
import { Search, SearchIconWrapper, StyledInputBase } from '../components/search/SearchComponent';
import WrapperWithNavbar from '../components/WrapperWithNavbar';

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

            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase placeholder="Search…" inputProps={{ 'aria-label': 'search' }} />
            </Search>
          </Box>
          <Box>
            {activeUserId && (
              <TabContext value={activeUserId}>
                <TabList
                  orientation="vertical"
                  onChange={(_, newValue) => onUserChanged(newValue)}
                  centered
                  color="primary"
                  sx={{
                    flexGrow: 2,
                    bgcolor: 'background.paper',
                    display: 'inline-flex',
                    minWidth: 200,
                  }}>
                  {users?.map((user: TabUser) => (
                    <Tab
                      key={user._id}
                      label={user.name}
                      value={user._id}
                      sx={{ borderRight: 1, borderColor: 'divider' }}
                    />
                  ))}
                </TabList>

                <Box sx={{ display: 'inline-flex', flex: 1 }}>
                  {users?.map((user: TabUser) => (
                    <TabPanel key={user._id} value={user._id}>
                      <p> {user.name} </p>
                    </TabPanel>
                  ))}
                </Box>
              </TabContext>
            )}
          </Box>
        </>
      )}
    </WrapperWithNavbar>
  );
};

export default StudentsPage;
