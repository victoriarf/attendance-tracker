import { Box, Stack, Tab } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { TabContext, TabList, TabPanel } from '@mui/lab'
import { useQuery } from 'react-query'

import { getUserClasses } from '../api/classesApi'
import { getUsers } from '../api/usersApi'
import Calendar from '../components/Calendar'
import ClassButton from '../components/Class-button'
import './ClassesPage.scss'
import ClassInfo from '../components/Class-info'
import Navbar from '../components/Navbar'

const CLASSES_CHECKED_KEY = 'classesChecked'

/**
 * Tabs - experimental API https://mui.com/material-ui/react-tabs/
 * @returns {JSX.Element}
 * @constructor
 */
function ClassesPage() {
  let [activeUserId, setActiveUser] = useState(undefined)

  const { isLoading, data: users } = useQuery('users', () => getUsers())

  useEffect(() => {
    if (!activeUserId && users && users[0]) {
      setActiveUser(users[0]._id)
    }
  }, [activeUserId, users])

  const { data: classes } = useQuery(
    ['classes', activeUserId],
    () => getUserClasses(activeUserId),
    {
      enabled: !!activeUserId
    }
  )

  function onUserChanged($event, newValue) {
    setActiveUser(newValue)
  }

  const initialCheckedState = JSON.parse(localStorage.getItem(CLASSES_CHECKED_KEY)) || {}
  const [checkedState, setCheckedState] = useState(initialCheckedState)

  useEffect(() => {
    localStorage.setItem(CLASSES_CHECKED_KEY, JSON.stringify(checkedState))
  }, [checkedState])

  const handleCheckboxChange = classId => {
    setCheckedState(prevState => ({
      ...prevState,
      [classId]: !prevState[classId] || false
    }))
  }

  return (
    <div>
      <Navbar />

      {isLoading ? (
        <p className="loading"> Loading... </p>
      ) : (
        <div>
          <Stack direction="column" justifyContent="center" alignItems="center" spacing={0.5}>
            <TabContext value={activeUserId}>
              <TabList onChange={onUserChanged} centered color="primary">
                {users?.map(user => (
                  <Tab key={user._id} label={user.name} value={user._id} />
                ))}
              </TabList>

              <div>
                {users?.map(user => (
                  <TabPanel key={user._id} value={user._id} index={0}>
                    <Stack
                      className="classesPage"
                      direction="row"
                      justifyContent="start"
                      spacing={5}
                    >
                      <Stack
                        className="classesList"
                        direction="column"
                        justifyContent="start"
                        spacing={0}
                      >
                        {classes?.map(userClass => (
                          <Box key={userClass.name}>
                            <ClassButton
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
                        {classes?.map(userClass =>
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
          </Stack>
        </div>
      )}
    </div>
  )
}

export default ClassesPage
