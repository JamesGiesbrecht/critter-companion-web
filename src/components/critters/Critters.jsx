import { useEffect, useState } from 'react'
import { useApi } from 'context/Api'
import useFiltersStore, { Statuses } from 'store/filtersStore'
import bugsData from 'assets/data/bugs.json'
import fishData from 'assets/data/fish.json'
import seaData from 'assets/data/sea.json'
import Controls from 'components/layout/Controls'
import CritterSection from 'components/critters/CritterSection'
import SearchSection from 'components/critters/SearchSection'
import Loading from 'components/ui/Loading'
import Centered from 'components/ui/Centered'

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

const Critters = () => {
  const isNorthern = useFiltersStore((state) => state.isNorthern)
  const search = useFiltersStore((state) => state.search)
  const donated = useFiltersStore((state) => state.donated)
  const setDonated = useFiltersStore((state) => state.setDonated)
  const { donatedRef } = useApi()
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (donatedRef) {
      setIsLoading(true)
      donatedRef.on('value', (snapshot) => {
        const data = snapshot.val() || donated
        setDonated(data)
        setIsLoading(false)
      })
    }
    return () => donatedRef?.off()
  }, [donatedRef, setDonated])

  const addProperties = (critters) =>
    critters.map((critter) => {
      const critterMonths = isNorthern ? critter.northern_months : critter.southern_months
      return {
        ...critter,
        months: critterMonths,
        ...getAvailability(critterMonths),
      }
    })

  const bugs = addProperties(bugsData)
  const fish = addProperties(fishData)
  const seaCreatures = addProperties(seaData)

  let content

  if (isLoading) {
    content = (
      <Centered relative>
        <Loading />
      </Centered>
    )
  } else if (search) {
    content = <SearchSection allCritters={bugs.concat(fish, seaCreatures)} />
  } else {
    content = (
      <>
        <CritterSection allCritters={bugs} type="Bugs" />
        <CritterSection allCritters={fish} type="Fish" />
        <CritterSection allCritters={seaCreatures} type="Sea Creatures" />
      </>
    )
  }

  return (
    <>
      <Controls />
      {content}
    </>
  )
}

export default Critters
