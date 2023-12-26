import {Box, Stack, Tab} from "@mui/material";
import {useEffect, useState} from "react";

import {QueryClient, useQuery, useQueryClient} from "react-query";
import {getUserClasses} from "../api/classesApi";
import {getUsers} from "../api/userApi";
import Calendar from "../components/Calendar";
import ClassButton from "../components/Class-button";
import './ClassesPage.scss';
import {TabContext, TabList, TabPanel} from '@mui/lab';
import ClassInfo from "../components/Class-info";

/**
 * Tabs - experimental API https://mui.com/material-ui/react-tabs/
 * @returns {JSX.Element}
 * @constructor
 */
function ClassesPage() {
  const queryClient = useQueryClient()
  let [activeUserId, setActiveUser] = useState(undefined);


  const {isLoading, data: users} = useQuery('users', () => getUsers());

  useEffect(() => {
    if (!activeUserId && users && users[0]) {
      setActiveUser(users[0]._id);
    }
  }, [activeUserId, users]);

  const {data: classes} = useQuery(['classes', activeUserId], () => getUserClasses(activeUserId), {
        enabled: !!activeUserId
      }
  )

  function onUserChanged($event, newValue) {
    setActiveUser(newValue);
  }

  return (
      <>
        {isLoading ? (<p className="loading"> Loading... </p>) : (
            <div>
              <Stack
                  direction="column"
                  justifyContent="center"
                  alignItems="center"
                  spacing={0.5}
              >

                {/*<div><strong> activeUser </strong> {JSON.stringify(activeUserId)}</div>*/}
                {/*<div><strong> Users: </strong> {JSON.stringify(users)}</div>*/}
                {/*<div><strong> Classes:</strong> {JSON.stringify(classes)}</div>*/}

                <TabContext value={activeUserId}>
                  <TabList onChange={onUserChanged} centered color='primary'>
                    {users?.map((user) => (
                        <Tab key={user._id} label={user.name} value={user._id}/>
                    ))}
                  </TabList>

                  <div>
                    {users?.map((user) => (
                        <TabPanel key={user._id} value={user._id} index={0}>

                          <Stack
                              className='classesPage'
                              direction="row"
                              justifyContent="start"
                              spacing={1}
                          >
                            <Stack
                                direction="column"
                                justifyContent="start"
                                spacing={1}
                            >
                              {classes?.map((user) => (
                                  <div key={user.name}><ClassButton user={user}/></div>
                              ))}
                            </Stack>

                            <Box> <Calendar/> </Box>
                            <Box> <ClassInfo></ClassInfo> </Box>
                          </Stack>

                        </TabPanel>
                    ))}
                  </div>
                </TabContext>

              < /Stack>
            </div>
        )}

      </>
  )
}

export default ClassesPage
