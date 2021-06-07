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
  Donated = 'Donated',
}

export enum FormType {
  Login = 'Login',
  SignUp = 'SignUp',
  ForgotPassword = 'ForgotPassword',
}

const useStore = create((set) => ({
  filters: {
    mainFilter: MainFilter.All,
    setMainFilter: (newMainFilter: MainFilter) =>
      set((state: any) => ({ filters: { ...state.filters, mainFilter: newMainFilter } })),
    statusFilters: [Statuses.New, Statuses.Leaving, Statuses.Incoming, Statuses.Donated],
    setStatusFilters: (newStatusFilters: Array<Statuses>) =>
      set((state: any) => ({ filters: { ...state.filters, statusFilters: newStatusFilters } })),
    isNorthern: true,
    toggleIsNorthern: () =>
      set((state: any) => ({
        filters: { ...state.filters, isNorthern: !state.filters.isNorthern },
      })),
    search: '',
    setSearch: (newSearch: string) =>
      set((state: any) => ({ filters: { ...state.filters, search: newSearch } })),
  },
  donated: {},
  setDonated: (newDonated: { [x: number]: boolean }) => set({ donated: newDonated }),
  toggleDonated: (critterId: number) => {
    let isDonated
    set((state: any) => {
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
