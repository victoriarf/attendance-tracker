import {Box, Button, Checkbox, FormControlLabel, Stack} from "@mui/material";
import React from "react";
import {useQuery} from "react-query";
import getUsers from "../api/getUsers";
import './ClassesPage.scss';
import Calendar from "../components/Calendar";

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
                      <div key={user.name}>
                        <Button className="classButton" variant='contained' size={"medium"}> {user.name}</Button>
                        <FormControlLabel control={<Checkbox color='default' className='classCheckbox' size={"large"}/>}
                            label=''/>
                      </div>
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
