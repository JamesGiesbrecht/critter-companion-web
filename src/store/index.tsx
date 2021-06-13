import create from 'zustand'

export enum MainFilter {
  All = 'All',
  Available = 'Available',
  Custom = 'Custom',
}

export enum Statuses {
  New = 'New',
  Leaving = 'Leaving',
  Incoming = 'Incoming',
}

export enum FormType {
  Login = 'Login',
  SignUp = 'SignUp',
  ForgotPassword = 'ForgotPassword',
  VerificationEmail = 'VerificationEmail',
}

export interface StoreState {
  filters: {
    mainFilter: MainFilter
    setMainFilter: (newMainFilter: MainFilter) => void
    statusFilters: Array<Statuses>
    setStatusFilters: (newStatusFilters: Array<Statuses>) => void
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
  setActiveForm: (newActiveForm: FormType | undefined) => void
}

const useStore = create<StoreState>((set) => ({
  filters: {
    mainFilter: MainFilter.All,
    setMainFilter: (newMainFilter: MainFilter) =>
      set((state) => ({ filters: { ...state.filters, mainFilter: newMainFilter } })),
    statusFilters: [Statuses.New, Statuses.Leaving, Statuses.Incoming],
    setStatusFilters: (newStatusFilters: Array<Statuses>) =>
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
}))

export default useStore
