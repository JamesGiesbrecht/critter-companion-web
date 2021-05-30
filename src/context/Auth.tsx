import { useState, useEffect, useContext, createContext, FC } from 'react'
import firebase from 'firebase'
import { firebaseAuth } from 'firebase/config'

interface AuthContextType {
  user: firebase.User | null | undefined
  login: typeof firebaseAuth.signInWithEmailAndPassword
  logout: typeof firebaseAuth.signOut
  signUp: typeof firebaseAuth.createUserWithEmailAndPassword
  resetPassword: typeof firebaseAuth.sendPasswordResetEmail
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
  const [user, setUser] = useState<AuthContextType['user']>()

  useEffect(() => {
    const unlisten = firebaseAuth.onAuthStateChanged((authUser) => setUser(authUser))
    return () => {
      unlisten()
    }
  })

  const store = {
    user,
    login: firebaseAuth.signInWithEmailAndPassword.bind(firebaseAuth),
    logout: firebaseAuth.signOut.bind(firebaseAuth),
    signUp: firebaseAuth.createUserWithEmailAndPassword.bind(firebaseAuth),
    resetPassword: firebaseAuth.sendPasswordResetEmail.bind(firebaseAuth),
  }
  return <AuthContext.Provider value={store}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)
