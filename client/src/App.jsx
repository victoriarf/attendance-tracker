import './App.css'
import {useQuery} from "react-query";
import getUsers from "./api/getUsers";

function App() {
  const {isLoading, data: users} = useQuery('users', getUsers);
    return (
      <>
        {isLoading ? (<p className="loading"> Loading... </p>) : (
            users.map((user) => (
                <div key={user.name}><p> {user.name} </p></div>
            ))
        )}

      </>
  )
}

export default App
