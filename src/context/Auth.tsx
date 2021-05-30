import { useState, useEffect, useContext, createContext, FC } from 'react'

const urls = {
  login: 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=',
  signUp: 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=',
  resetPassword: 'https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=[API_KEY]',
}

interface AuthContextType {
  user: any
  login: any
  logout: any
  signUp: any
  resetPassword: any
}

const noContextError = () => {
  throw new Error('This component has not been wrapper with a Auth Context Provider.')
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  login: noContextError,
  logout: noContextError,
  signUp: noContextError,
  resetPassword: noContextError,
})

export const AuthContextProvider: FC = ({ children }) => {
  const [user, setUser] = useState<any>(null)

  const store = {
    user,
    login: () => console.log('login'),
    logout: () => console.log('logout'),
    signUp: () => console.log('signUp'),
    resetPassword: () => console.log('resetPassword'),
  }
  return <AuthContext.Provider value={store}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)
