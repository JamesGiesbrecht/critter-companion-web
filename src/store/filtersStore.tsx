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

const useFiltersStore = create((set) => ({
  mainFilter: MainFilter.All,
  setMainFilter: (newMainFilter: MainFilter) => set({ mainFilter: newMainFilter }),
  statusFilters: [Statuses.New, Statuses.Leaving, Statuses.Incoming, Statuses.Donated],
  setStatusFilters: (newStatusFilters: Array<Statuses>) => set({ statusFilters: newStatusFilters }),
  isNorthern: true,
  toggleIsNorthern: () => set((state: any) => ({ isNorthern: !state.isNorthern })),
  search: '',
  setSearch: (newSearch: string) => set({ search: newSearch }),
  donated: [],
  toggleDonated: (critterName: string) => {
    let isDonated
    set((state: any) => {
      const critterIndex = state.donated.indexOf(critterName)
      isDonated = critterIndex > -1
      let newDonated
      if (isDonated) {
        newDonated = [...state.donated]
        newDonated.splice(critterIndex, 1)
      } else {
        newDonated = state.donated.concat([critterName])
      }
      return { donated: newDonated }
    })
    return !isDonated
  },
}))

export default useFiltersStore
