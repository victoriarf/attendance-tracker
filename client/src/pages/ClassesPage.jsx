import {Box, Button, Checkbox, FormControlLabel, Stack} from "@mui/material";
import React from "react";
import {useQuery} from "react-query";
import getUsers from "../api/getUsers";
import Calendar from "../components/Calendar";
import ClassButton from "../components/Class-button";
import './ClassesPage.scss';

function ClassesPage() {
  const {isLoading, data: users} = useQuery('users', getUsers);

  return (
      <>
        {isLoading ? (<p className="loading"> Loading... </p>) : (
            <div>
              <Stack
                  direction="row"
                  justifyContent="center"
                  alignItems="center"
                  spacing={0.5}
              >
                {users.map((user) => (
                    <div key={user.name}>
                      <Button variant='contained' size={"medium"}> {user.name}</Button>
                    </div>
                ))}
              </Stack>

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
                  {users.map((user) => (
                      <div key={user.name}> <ClassButton user={user}/></div>
                  ))}
                </Stack>

                <Box> <Calendar/> </Box>
                <Box> Info </Box>
              </Stack>

            </div>
        )}

      </>
  )
}

export default ClassesPage
