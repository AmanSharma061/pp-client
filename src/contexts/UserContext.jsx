import { createContext, useState } from 'react'

export const UserContext = createContext()
export const UserContextProvider = ({ children }) => {
  const [userDetails, setUserDetails] = useState({})
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  return (
    <UserContext.Provider
      value={{
        userDetails,
        setUserDetails,
        isAuthenticated,
        setIsAuthenticated
      }}
    >
      {children}
    </UserContext.Provider>
  )
}
