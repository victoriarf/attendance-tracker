import './App.css'
import {Button, Stack} from "@mui/material";
import React from "react";
import {useQuery} from "react-query";
import getUsers from "./api/getUsers";

function App() {
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
                  direction="column"
                  justifyContent="start"
                  spacing={1}
              >
                {users.map((user) => (
                    <div key={user.name}>
                      <Button variant='contained' size={"medium"}> {user.name}</Button>
                    </div>
                ))}
              </Stack>
            </div>
        )}

      </>
  )
}

export default App
