import { useState, useEffect, useContext, createContext, FC } from 'react'
import firebase from 'firebase'
import { firebaseAuth } from 'firebase/config'
import { noProvider } from 'utility/context'
import useStore from 'store'

interface AuthContextType {
  user: firebase.User | null | undefined
  login: typeof firebaseAuth.signInWithEmailAndPassword
  logout: typeof firebaseAuth.signOut
  signUp: typeof firebaseAuth.createUserWithEmailAndPassword
  resetPassword: typeof firebaseAuth.sendPasswordResetEmail
  signInWithGoogle: () => Promise<firebase.auth.UserCredential>
}

const noAuthProvider = () => noProvider('Auth')

export const AuthContext = createContext<AuthContextType>({
  user: null,
  login: noAuthProvider,
  logout: noAuthProvider,
  signUp: noAuthProvider,
  resetPassword: noAuthProvider,
  signInWithGoogle: noAuthProvider,
})

export const AuthContextProvider: FC = ({ children }) => {
  const [user, setUser] = useState<AuthContextType['user']>()
  const setDonated = useStore((state) => state.setDonated)
  const googleAuthProvider = new firebase.auth.GoogleAuthProvider()

  useEffect(() => {
    const unsubscribe = firebaseAuth.onAuthStateChanged((authUser) => setUser(authUser))
    return () => {
      unsubscribe()
    }
  })

  const store = {
    user,
    login: firebaseAuth.signInWithEmailAndPassword.bind(firebaseAuth),
    logout: () => {
      setDonated({})
      return firebaseAuth.signOut()
    },
    signUp: firebaseAuth.createUserWithEmailAndPassword.bind(firebaseAuth),
    resetPassword: firebaseAuth.sendPasswordResetEmail.bind(firebaseAuth),
    signInWithGoogle: async () => firebaseAuth.signInWithPopup(googleAuthProvider),
  }
  return <AuthContext.Provider value={store}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)
