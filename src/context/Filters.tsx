import { useState, useContext, createContext, FC, Dispatch, SetStateAction, useEffect } from 'react'
import { noProvider } from 'utility/contex'

export enum MainFilter {
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

interface FiltersContextType {
  mainFilter: MainFilter
  setMainFilter: Dispatch<SetStateAction<MainFilter>>
  status: Array<Statuses>
  setStatus: Dispatch<SetStateAction<Array<Statuses>>>
  isNorthern: boolean
  setIsNorthern: Dispatch<SetStateAction<boolean>>
  search: string
  setSearch: Dispatch<SetStateAction<string>>
  donated: Array<string>
  setDonated: Dispatch<SetStateAction<Array<string>>>
}

const noFiltersProvider = () => noProvider('Filters')

export const FiltersContext = createContext<FiltersContextType>({
  mainFilter: MainFilter.All,
  setMainFilter: noFiltersProvider,
  status: [],
  setStatus: noFiltersProvider,
  isNorthern: true,
  setIsNorthern: noFiltersProvider,
  search: '',
  setSearch: noFiltersProvider,
  donated: [],
  setDonated: noFiltersProvider,
})

export const FiltersContextProvider: FC = ({ children }) => {
  const [mainFilter, setMainFilter] = useState<MainFilter>(MainFilter.All)
  const [status, setStatus] = useState<Array<Statuses>>([
    Statuses.New,
    Statuses.Leaving,
    Statuses.Incoming,
    Statuses.Donated,
  ])
  const [isNorthern, setIsNorthern] = useState<boolean>(true)
  const [search, setSearch] = useState<string>('')
  const [donated, setDonated] = useState<Array<string>>([])

  useEffect(() => {
    const crittersLs = localStorage.getItem('donatedCritters')
    if (crittersLs) setDonated(JSON.parse(crittersLs))
  }, [])

  useEffect(() => {
    localStorage.setItem('donatedCritters', JSON.stringify(donated))
  }, [donated])

  const store = {
    mainFilter,
    setMainFilter,
    status,
    setStatus,
    isNorthern,
    setIsNorthern,
    search,
    setSearch,
    donated,
    setDonated,
  }
  return <FiltersContext.Provider value={store}>{children}</FiltersContext.Provider>
}

export const useFilters = () => useContext(FiltersContext)
