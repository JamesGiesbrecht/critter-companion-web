import { useState, useEffect, useContext, createContext, FC } from 'react'
import firebase from 'firebase'
import { firebaseDb } from 'firebase/config'
import { noProvider } from 'utility/contex'

interface ApiContextType {}

const noApiProvider = () => noProvider('API')

export const ApiContext = createContext<ApiContextType>({})

export const ApiContextProvider: FC = ({ children }) => {
  const store = {}
  return <ApiContext.Provider value={store}>{children}</ApiContext.Provider>
}

export const useApi = () => useContext(ApiContext)
