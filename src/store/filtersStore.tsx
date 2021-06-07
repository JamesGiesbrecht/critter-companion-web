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

const useFiltersStore = create((set) => ({
  mainFilter: MainFilter.All,
  setMainFilter: (newMainFilter: MainFilter) => set({ mainFilter: newMainFilter }),
  statusFilters: [Statuses.New, Statuses.Leaving, Statuses.Incoming, Statuses.Donated],
  setStatusFilters: (newStatusFilters: Array<Statuses>) => set({ statusFilters: newStatusFilters }),
  isNorthern: true,
  toggleIsNorthern: () => set((state: any) => ({ isNorthern: !state.isNorthern })),
  search: '',
  setSearch: (newSearch: string) => set({ search: newSearch }),
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

export default useFiltersStore
