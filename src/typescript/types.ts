type CritterType = 'Bug' | 'Fish' | 'Sea'
type CritterSize = 'Tiny' | 'Small' | 'Medium' | 'Large' | 'X-Large' | 'Huge' | 'Long'
type CritterSpeed = 'Stationary' | 'Very slow' | 'Slow' | 'Medium' | 'Fast' | 'Very fast'
// eslint-disable-next-line prettier/prettier
type Hour = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24
type Month = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12

export type JsonCritter = {
  id: string
  name: string
  type: CritterType
  location: string
  size?: CritterSize
  speed?: CritterSpeed
  startTime: Hour | Array<Hour>
  endTime: Hour | Array<Hour>
  value: number
  northernMonths: Array<Month>
  southernMonths: Array<Month>
  imagePath: string
}

// const butterfly = {
//   id: 'agrias-butterfly',
//   imagePath: '/assets/images/critters/bug/agrias-butterfly.png',
//   isAvailableNow: true,
//   Leaving: true,
//   New: true,
//   Incoming: true,
//   location: 'Flying',
//   months: [4, 5, 6, 7, 8, 9],
//   name: 'Agrias Butterfly',
//   northernMonths: [4, 5, 6, 7, 8, 9],
//   southernMonths: [1, 2, 3, 10, 11, 12],
//   startTime: 8,
//   endTime: 17,
//   type: 'Bugs',
//   value: 3000,
//   size: 1,
// }

export type Critter = {
  id: string
  imagePath: any
  isAvailableNow: any
  Leaving: any
  New: any
  Incoming: any
  location: any
  months: any
  name: any
  northernMonths: any
  southernMonths: any
  startTime: any
  endTime: any
  type: any
  value: any
}
