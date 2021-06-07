import { useContext, createContext, FC } from 'react'
import firebase from 'firebase'
import { firebaseDb } from 'firebase/config'
import { noProvider } from 'utility/contex'
import { useAuth } from './Auth'

interface ApiContextType {
  userRef: firebase.database.Reference | undefined
  donatedRef: firebase.database.Reference | undefined
  write: (data: any) => Promise<any> | undefined
  on: (
    cb: any,
  ) =>
    | ((a: firebase.database.DataSnapshot | null, b?: string | null | undefined) => any)
    | undefined
}

const noApiProvider = () => noProvider('API')

export const ApiContext = createContext<ApiContextType>({
  userRef: undefined,
  donatedRef: undefined,
  write: noApiProvider,
  on: noApiProvider,
})

export const ApiContextProvider: FC = ({ children }) => {
  const { user } = useAuth()
  let userRef: firebase.database.Reference | undefined
  let donatedRef: firebase.database.Reference | undefined
  let write
  let on
  if (user) {
    userRef = firebaseDb.ref(`users/${user.uid}`)
    donatedRef = firebaseDb.ref(`users/${user.uid}/donated`)
    write = (data: any) => userRef?.set(data)
    on = (cb: any) => userRef?.on('value', cb)
  } else {
    write = () => {
      throw new Error('User not authenticated')
    }
    on = () => {
      throw new Error('User not authenticated')
    }
  }
  const store = {
    userRef,
    donatedRef,
    write,
    on,
  }
  return <ApiContext.Provider value={store}>{children}</ApiContext.Provider>
}

export const useApi = () => useContext(ApiContext)
