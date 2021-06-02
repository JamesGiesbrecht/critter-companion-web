import { useState, useEffect, useContext, createContext, FC } from 'react'
import firebase from 'firebase'
import { firebaseDb } from 'firebase/config'
import { noProvider } from 'utility/contex'
import { useAuth } from './Auth'

interface ApiContextType {
  db: firebase.database.Reference | undefined
  write: (data: any) => Promise<any> | undefined
  on: (
    cb: any,
  ) =>
    | ((a: firebase.database.DataSnapshot | null, b?: string | null | undefined) => any)
    | undefined
}

const noApiProvider = () => noProvider('API')

export const ApiContext = createContext<ApiContextType>({
  db: undefined,
  write: noApiProvider,
  on: noApiProvider,
})

export const ApiContextProvider: FC = ({ children }) => {
  const { user } = useAuth()
  let userRef: firebase.database.Reference | undefined
  let write
  let on
  if (user) {
    userRef = firebaseDb.ref(`users/${user.uid}`)
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
    db: userRef,
    write,
    on,
  }
  return <ApiContext.Provider value={store}>{children}</ApiContext.Provider>
}

export const useApi = () => useContext(ApiContext)
