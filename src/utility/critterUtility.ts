import { BaseCritter, Critter, Month, Status } from '@james-giesbrecht/critter-companion-utility'
import { MainFilter } from 'typescript/enums'

const today = new Date()
const curMonth = (today.getMonth() + 1) as Month

export const getCritterImagePath = (critterId: string) => `assets/images/critters/${critterId}.png`

const hasPrevMonth = (months: Month[]) => {
  // January
  if (curMonth === 1) {
    return months.includes(12)
  }
  return months.includes(((curMonth as number) - 1) as Month)
}

const hasNextMonth = (months: Month[]) => {
  // December
  if (curMonth === 12) {
    return months.includes(1)
  }
  return months.includes(((curMonth as number) + 1) as Month)
}

const isAvailableNow = (months: Month[]) => months.includes(curMonth)

const getAvailability = (months: Month[]) => {
  const availability: {
    isAvailableNow?: boolean
    isNew?: boolean
    isLeaving?: boolean
    isIncoming?: boolean
  } = {}

  if (isAvailableNow(months)) {
    availability.isAvailableNow = true
    if (!hasPrevMonth(months)) {
      availability.isNew = true
    }
    if (!hasNextMonth(months)) {
      availability.isLeaving = true
    }
  } else if (hasNextMonth(months)) {
    availability.isIncoming = true
  }

  return availability
}

export const filterCritters = (
  critters: BaseCritter[],
  filterConfig: {
    isNorthern: boolean
    mainFilter: MainFilter
    statusFilters: Status[]
    showDonated: boolean
    donated: { [id: string]: boolean }
  },
): Critter[] => {
  const { isNorthern, mainFilter, statusFilters, showDonated, donated } = filterConfig
  const filteredCritters = critters
    .map((critter) => {
      // remove critters that are donated
      if (!showDonated && donated[critter.id]) {
        return null
      }
      const critterMonths = isNorthern ? critter.northernMonths : critter.southernMonths
      const updatedCritter = {
        ...critter,
        months: critterMonths,
        ...getAvailability(critterMonths),
      }
      if (mainFilter === MainFilter.All) {
        return updatedCritter
      }
      if (mainFilter === MainFilter.Available && !updatedCritter.isAvailableNow) {
        // remove critters that are not available now
        return null
      }
      if (mainFilter === MainFilter.Custom) {
        //  Checking if any of the conditions in show are true properties on the critter
        if (
          (statusFilters.includes('new') && updatedCritter.isNew) ||
          (statusFilters.includes('leaving') && updatedCritter.isLeaving) ||
          (statusFilters.includes('incoming') && updatedCritter.isIncoming)
        ) {
          return updatedCritter
        }
        return null
      }

      return updatedCritter
    })
    .filter((critter): critter is Critter => critter !== null && critter !== undefined)

  return filteredCritters
}
