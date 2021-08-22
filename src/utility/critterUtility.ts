import { BaseCritter, Critter, Month } from '@james-giesbrecht/critter-companion-utility'

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

// eslint-disable-next-line import/prefer-default-export
export const addProperties = (critters: BaseCritter[], isNorthern: boolean): Critter[] =>
  critters.map((critter) => {
    const critterMonths = isNorthern ? critter.northernMonths : critter.southernMonths
    return {
      ...critter,
      months: critterMonths,
      ...getAvailability(critterMonths),
    }
  })
