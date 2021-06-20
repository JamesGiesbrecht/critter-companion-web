import { Critter, JsonCritter, Month } from 'typescript/types'
import { Statuses } from 'typescript/enums'

const today = new Date()
const curMonth = (today.getMonth() + 1) as Month

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
    [Statuses.New]?: boolean
    [Statuses.Leaving]?: boolean
    [Statuses.Incoming]?: boolean
  } = {}

  if (isAvailableNow(months)) {
    availability.isAvailableNow = true
    if (!hasPrevMonth(months)) {
      availability[Statuses.New] = true
    }
    if (!hasNextMonth(months)) {
      availability[Statuses.Leaving] = true
    }
  } else if (hasNextMonth(months)) {
    availability[Statuses.Incoming] = true
  }

  return availability
}

// eslint-disable-next-line import/prefer-default-export
export const addProperties = (critters: JsonCritter[], isNorthern: boolean): Critter[] =>
  critters.map((critter) => {
    const critterMonths = isNorthern ? critter.northernMonths : critter.southernMonths
    return {
      ...critter,
      months: critterMonths,
      ...getAvailability(critterMonths),
    }
  })
