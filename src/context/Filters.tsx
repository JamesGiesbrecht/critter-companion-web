import { useState, useContext, createContext, FC, Dispatch, SetStateAction } from 'react'
import { noProvider } from 'utility/contex'

export enum MainFilters {
  All = 'All',
  Available = 'Available',
  Custom = 'Custom',
}

export enum Statuses {
  New = 'New',
  Leaving = 'Leaving',
  Incoming = 'Incoming',
  Donated = 'Donated',
}

interface FormContextType {
  mainFilter: MainFilters
  setMainFilter: Dispatch<SetStateAction<MainFilters>>
  status: Array<Statuses>
  setStatus: Dispatch<SetStateAction<Array<Statuses>>>
  isNorthern: boolean
  setIsNorthern: Dispatch<SetStateAction<boolean>>
  search: string
  setSearch: Dispatch<SetStateAction<string>>
}

const noFiltersProvider = () => noProvider('Filters')

export const FiltersContext = createContext<FormContextType>({
  mainFilter: noFiltersProvider(),
  setMainFilter: noFiltersProvider,
  status: noFiltersProvider(),
  setStatus: noFiltersProvider,
  isNorthern: noFiltersProvider(),
  setIsNorthern: noFiltersProvider,
  search: noFiltersProvider(),
  setSearch: noFiltersProvider,
})

export const FiltersContextProvider: FC = ({ children }) => {
  const [mainFilter, setMainFilter] = useState<MainFilters>(MainFilters.All)
  const [status, setStatus] = useState<Array<Statuses>>([
    Statuses.New,
    Statuses.Leaving,
    Statuses.Incoming,
    Statuses.Donated,
  ])
  const [isNorthern, setIsNorthern] = useState<boolean>(true)
  const [search, setSearch] = useState<string>('')

  const store = {
    mainFilter,
    setMainFilter,
    status,
    setStatus,
    isNorthern,
    setIsNorthern,
    search,
    setSearch,
  }
  return <FiltersContext.Provider value={store}>{children}</FiltersContext.Provider>
}

export const useFilters = () => useContext(FiltersContext)
