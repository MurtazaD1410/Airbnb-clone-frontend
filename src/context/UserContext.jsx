import axios from 'axios'
import React, { createContext, useEffect, useState } from 'react'

export const UserContext = createContext({})

export function UserContextProvider({ children }) {
  const [user, setUser] = useState(null)

  return (
    <UserContext.Provider value={{
      user, setUser, login: () => {
        axios.get('/auth/login/success').then(({ data }) => {

          setUser(data)
        })
      }
    }}>
      {children}
    </UserContext.Provider>

  );
}