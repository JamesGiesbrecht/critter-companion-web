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
  setMainFilter: (filter: MainFilter) => set({ mainFilter: filter }),
  status: [Statuses.New, Statuses.Leaving, Statuses.Incoming, Statuses.Donated],
  setStatus: (statuses: Array<Statuses>) => set({ status: statuses }),
  isNorthern: true,
  toggleIsNorthern: () => set((state: any) => ({ isNorthern: !state.isNorthern })),
  search: '',
  setSearch: (newSearch: string) => set({ search: newSearch }),
  donated: [],
  setDonated: (newDonated: Array<string>) => set({ donated: newDonated }),
}))

export default useFiltersStore
