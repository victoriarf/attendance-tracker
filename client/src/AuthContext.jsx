import React, { useEffect, useState } from 'react'

export const AuthContext = React.createContext({
  userValue: undefined,
  setUserValue: () => {}
})

export const AuthContextProvider = ({ children }) => {
  const [userValue, setUserValue] = useState(null)

  useEffect(() => {
    console.log('userValue', userValue)
  }, [userValue])

  return (
    <AuthContext.Provider value={{ userValue, setUserValue }}> {children}</AuthContext.Provider>
  )
}
