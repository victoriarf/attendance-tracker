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
import useCheckedClasses from '../hooks/useCheckedClasses';

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

  const [activeClass, setActiveClass] = useState<TabUser | null>(null);
  const [attendedThisMonth, setAttendedThisMonth] = useState<number>(0);

  const { checkedState, handleCheckboxChange } = useCheckedClasses();

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

  useEffect(() => {
    classes?.length > 0 && setActiveClass(classes[0]);
  }, [classes]);

  function onUserChanged(newValue: string) {
    setActiveUser(newValue);
  }

  const handleClassClicked = (userClass: TabUser) => {
    setActiveClass(userClass);
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
                          spacing={1}>
                          {classes?.map((userClass: UserClass) => (
                            <Box key={userClass.name}>
                              <ClassButtonWithCheckbox
                                isActive={userClass === activeClass}
                                userClass={userClass}
                                isChecked={checkedState[userClass._id] || false}
                                onCheckboxChange={() => handleCheckboxChange(userClass._id)}
                                onClick={() => handleClassClicked(userClass)}
                              />
                            </Box>
                          ))}
                        </Stack>

                        <Box>
                          {' '}
                          <Calendar
                            onAttendanceChange={(value: number) => setAttendedThisMonth(value)}
                          />{' '}
                        </Box>
                        <Box>
                          {' '}
                          {classes?.map((userClass: UserClass) =>
                            checkedState[userClass._id] ? (
                              <ClassInfo
                                key={userClass._id}
                                userClass={userClass}
                                attendedThisMonth={attendedThisMonth}></ClassInfo>
                            ) : (
                              <ClassInfo
                                key={userClass._id}
                                attendedThisMonth={attendedThisMonth}
                                userClass={userClass}>
                                <div>
                                  <p>
                                    {' '}
                                    This class is not checked! Please check to see the dates on the
                                    calendar{' '}
                                  </p>
                                </div>
                              </ClassInfo>
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
