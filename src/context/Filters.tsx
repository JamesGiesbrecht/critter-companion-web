import { useContext, createContext, FC } from 'react'

interface FormContextType {}

export const FiltersContext = createContext<FormContextType>({})

export const FiltersContextProvider: FC = ({ children }) => {
  const store = {}
  return <FiltersContext.Provider value={store}>{children}</FiltersContext.Provider>
}

export const useFilters = () => useContext(FiltersContext)
