import { useState, useEffect, useContext, createContext, FC } from 'react'
import axios from 'axios'

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
  const API_KEY = process.env.REACT_APP_FIREBASE_API_KEY

  const login = async (email: string, password: string) =>
    axios.post(urls.login + API_KEY, { email, password, returnSecureToken: true })

  const signUp = async (email: string, password: string) =>
    axios.post(urls.signUp + API_KEY, { email, password, returnSecureToken: true })

  const resetPassword = async (email: string) =>
    axios.post(urls.resetPassword + API_KEY, { email, requestType: 'PASSWORD_RESET' })

  const store = {
    user,
    login,
    logout: () => console.log('logout'),
    signUp,
    resetPassword,
  }
  return <AuthContext.Provider value={store}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)
