import './App.css'
import {useEffect, useState} from "react";
import getUsers from "./api/getUsers";

function App() {
  // const { isLoading, data: users } = useQuery('users', getUsers)
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsers()
        .then(users => setUsers(users))
        .catch((error) => console.error('Error fetching users:', error));
  }, []);

  return (
      <>
        <h1> USERS</h1>
        {users.map((user) => (
            <div key={user.name}><p> {user.name} </p></div>
        ))}

      </>
  )
}

export default App
