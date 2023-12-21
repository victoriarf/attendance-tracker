import {Box, Stack, Tab} from "@mui/material";
import {useEffect, useState} from "react";

import {QueryClient, useQuery, useQueryClient} from "react-query";
import {getUserClasses} from "../api/classesApi";
import {getUsers} from "../api/userApi";
import Calendar from "../components/Calendar";
import ClassButton from "../components/Class-button";
import './ClassesPage.scss';
import {TabContext, TabList, TabPanel} from '@mui/lab';

/**
 * Tabs - experimental API https://mui.com/material-ui/react-tabs/
 * @returns {JSX.Element}
 * @constructor
 */
function ClassesPage() {
  const queryClient = useQueryClient()
  let [activeUser, setActiveUser] = useState(undefined);


  const {isLoading, data: users} = useQuery('users', () => getUsers());

  users && users[0] && (activeUser = users[0]);

  const {data: classes} = useQuery(['classes', activeUser], () => {
        console.log('activeUser', activeUser);
        return getUserClasses(activeUser._id)
      }, {
        enabled: !!activeUser
      }
  )


  function onUserChanged($event, newValue) {
    activeUser = newValue;
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

                <div>activeUser {JSON.stringify(activeUser)}</div>
                <div>Us8ers: {JSON.stringify(users)}</div>
                <div>Classes: {JSON.stringify(classes)}</div>

                <TabContext value={activeUser?._id}>
                  <TabList  onChange={onUserChanged} centered color='primary'>
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
                            <Box> Info </Box>
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
