import CritterSection from 'components/critters/CritterSection'
import Controls from 'components/layout/Controls'
import bugsData from 'assets/data/bugs.json'
import fishData from 'assets/data/fish.json'
import seaData from 'assets/data/sea.json'
import SearchSection from 'components/critters/SearchSection'
import useFiltersStore, { Statuses } from 'store/filtersStore'
import { useEffect } from 'react'
import { useApi } from 'context/Api'

const today = new Date()
const curMonth = today.getMonth() + 1

const hasPrevMonth = (months) => {
  // January
  if (curMonth === 1) {
    return months.includes(12)
  }
  return months.includes(curMonth - 1)
}

const hasNextMonth = (months) => {
  // December
  if (curMonth === 12) {
    return months.includes(1)
  }
  return months.includes(curMonth + 1)
}

const isAvailableNow = (months) => months.includes(curMonth)

const Critters = () => {
  const isNorthern = useFiltersStore((state) => state.isNorthern)
  const search = useFiltersStore((state) => state.search)
  const setDonated = useFiltersStore((state) => state.setDonated)
  const { db } = useApi()

  useEffect(() => {
    const data = db.on('value', (snapshot) => snapshot).val()
    setDonated(data.donated)
    return () => db.off()
  }, [db, setDonated])

  const getAvailability = (months) => {
    const availability = {}

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

  const addProperties = (critters) =>
    critters.map((critter) => {
      const critterMonths = isNorthern ? critter.northern_months : critter.southern_months
      return {
        ...critter,
        months: critterMonths,
        ...getAvailability(critterMonths),
        [Statuses.Donated]: false,
      }
    })

  const bugs = addProperties(bugsData)
  const fish = addProperties(fishData)
  const seaCreatures = addProperties(seaData)

  if (search) {
    return (
      <>
        <Controls />
        <SearchSection allCritters={bugs.concat(fish, seaCreatures)} />
      </>
    )
  }
  return (
    <>
      <Controls />
      <CritterSection allCritters={bugs} type="Bugs" />
      <CritterSection allCritters={fish} type="Fish" />
      <CritterSection allCritters={seaCreatures} type="Sea Creatures" />
    </>
  )
}

export default Critters
