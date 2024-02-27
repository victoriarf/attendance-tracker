import Navbar from '../components/Navbar';
import styles from './ClassesPage.module.scss';
import { Box, Tab, TextField } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { getUsers } from '../api/usersApi';

interface TabUser {
  _id: string;
  name: string;
}

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
    <div>
      <Navbar />

      {isLoading ? (
        <p className={styles.loading}> Loading... </p>
      ) : (
        <>
          <Box>
            <TextField></TextField>
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
    </div>
  );
};

export default StudentsPage;
