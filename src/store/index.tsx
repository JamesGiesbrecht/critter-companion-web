import { ReactNode } from 'react'
import { Status } from '@james-giesbrecht/critter-companion-utility'
import create from 'zustand'

import { FormType, MainFilter } from 'typescript/enums'

import { Color } from '@material-ui/lab'

export interface StoreState {
  filters: {
    mainFilter: MainFilter
    setMainFilter: (newMainFilter: MainFilter) => void
    statusFilters: Status[]
    setStatusFilters: (newStatusFilters: Status[]) => void
    isNorthern: boolean
    toggleIsNorthern: () => void
    showDonated: boolean
    toggleShowDonated: () => void
    search: string
    setSearch: (newSearch: string) => void
  }
  donated: { [id: string]: boolean }
  setDonated: (newDonated: { [id: string]: boolean }) => void
  toggleDonated: (id: string) => boolean
  activeForm: FormType | undefined
  setActiveForm: (newActiveForm?: FormType) => void
  snackbar: { open: boolean; text: ReactNode; severity: Color }
  setSnackbar: (newError?: StoreState['snackbar']) => void
}

const useStore = create<StoreState>((set) => ({
  filters: {
    mainFilter: MainFilter.All,
    setMainFilter: (newMainFilter: MainFilter) =>
      set((state) => ({ filters: { ...state.filters, mainFilter: newMainFilter } })),
    statusFilters: ['new', 'leaving', 'incoming'],
    setStatusFilters: (newStatusFilters: Status[]) =>
      set((state) => ({ filters: { ...state.filters, statusFilters: newStatusFilters } })),
    isNorthern: true,
    toggleIsNorthern: () =>
      set((state) => ({
        filters: { ...state.filters, isNorthern: !state.filters.isNorthern },
      })),
    showDonated: true,
    toggleShowDonated: () =>
      set((state) => ({
        filters: { ...state.filters, showDonated: !state.filters.showDonated },
      })),
    search: '',
    setSearch: (newSearch: string) =>
      set((state) => ({ filters: { ...state.filters, search: newSearch } })),
  },
  donated: {},
  setDonated: (newDonated: { [id: string]: boolean }) => set({ donated: newDonated }),
  toggleDonated: (critterId: string) => {
    let isDonated = false
    set((state) => {
      const tempDonated = { ...state.donated }
      isDonated = !tempDonated[critterId]
      tempDonated[critterId] = isDonated
      return { donated: tempDonated }
    })
    return isDonated
  },
  activeForm: undefined,
  setActiveForm: (newActiveForm: FormType | undefined) => set({ activeForm: newActiveForm }),
  snackbar: { open: false, text: '', severity: 'success' },
  setSnackbar: (newSnackbar) =>
    set((state) => ({ snackbar: newSnackbar || { ...state.snackbar, open: false } })),
}))

export default useStore
