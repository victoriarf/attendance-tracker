import { Box, Stack, Tab } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { useQuery } from 'react-query';

import { getUserClasses } from '../api/classesApi';
import { getUsers } from '../api/usersApi';
import Calendar from '../components/Calendar';
import ClassButtonWithCheckbox from '../components/buttons/ClassButtonWithCheckbox';
import styles from './ClassesPage.module.scss';
import ClassInfo from '../components/ClassInfo';
import Navbar from '../components/Navbar';
import { UserClass } from '../interfaces/class.interface';

const CLASSES_CHECKED_KEY = 'classesChecked';

interface TabUser {
  _id: string;
  name: string;
}

/**
 * Tabs - experimental API https://mui.com/material-ui/react-tabs/
 * @returns {JSX.Element}
 * @constructor
 */
function ClassesPage() {
  const [activeUserId, setActiveUser] = useState<string | null>('');

  const { isLoading, data: users } = useQuery('users', () => getUsers());

  useEffect(() => {
    if (!activeUserId && users && users[0]) {
      setActiveUser(users[0]._id);
    }
  }, [activeUserId, users]);

  const { data: classes } = useQuery(
    ['classes', activeUserId],
    () => activeUserId && getUserClasses(activeUserId),
    {
      enabled: !!activeUserId,
    }
  );

  function onUserChanged(newValue: string) {
    setActiveUser(newValue);
  }

  const checkedClasses = localStorage.getItem(CLASSES_CHECKED_KEY);
  const initialCheckedState = (checkedClasses && JSON.parse(checkedClasses)) || {};
  const [checkedState, setCheckedState] = useState<Record<string, boolean>>(initialCheckedState);

  useEffect(() => {
    localStorage.setItem(CLASSES_CHECKED_KEY, JSON.stringify(checkedState));
  }, [checkedState]);

  const handleCheckboxChange = (classId: string) => {
    setCheckedState(prevState => {
      return {
        ...prevState,
        [classId]: !prevState[classId] || false,
      };
    });
  };

  return (
    <div>
      <Navbar />

      {isLoading ? (
        <p className={styles.loading}> Loading... </p>
      ) : (
        <div>
          <Stack direction="column" justifyContent="center" alignItems="center" spacing={0.5}>
            {activeUserId && (
              <TabContext value={activeUserId}>
                <TabList
                  onChange={(_, newValue) => onUserChanged(newValue)}
                  centered
                  color="primary">
                  {users?.map((user: TabUser) => (
                    <Tab key={user._id} label={user.name} value={user._id} />
                  ))}
                </TabList>

                <div>
                  {users?.map((user: TabUser) => (
                    <TabPanel key={user._id} value={user._id}>
                      <Stack
                        className={styles.classesPage}
                        direction="row"
                        justifyContent="start"
                        spacing={5}>
                        <Stack
                          className={styles.classesList}
                          direction="column"
                          justifyContent="start"
                          spacing={0}>
                          {classes?.map((userClass: UserClass) => (
                            <Box key={userClass.name}>
                              <ClassButtonWithCheckbox
                                userClass={userClass}
                                isChecked={checkedState[userClass._id] || false}
                                onCheckboxChange={() => handleCheckboxChange(userClass._id)}
                              />
                            </Box>
                          ))}
                        </Stack>

                        <Box>
                          {' '}
                          <Calendar />{' '}
                        </Box>
                        <Box>
                          {' '}
                          {classes?.map((userClass: UserClass) =>
                            checkedState[userClass._id] ? (
                              <ClassInfo key={userClass._id} userClass={userClass}></ClassInfo>
                            ) : (
                              ''
                            )
                          )}
                        </Box>
                      </Stack>
                    </TabPanel>
                  ))}
                </div>
              </TabContext>
            )}
          </Stack>
        </div>
      )}
    </div>
  );
}

export default ClassesPage;
