import { useState } from 'react'
import CritterSection from 'components/critters/CritterSection'
import Controls from 'components/layout/Controls'
import bugsData from 'assets/data/bugs.json'
import fishData from 'assets/data/fish.json'
import seaData from 'assets/data/sea.json'

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
  const [showAll, setShowAll] = useState('showAll')
  const [show, setShow] = useState(['isNew', 'isLeaving', 'isIncoming', 'isDonated'])
  const [isNorthern, setIsNorthern] = useState(true)
  const [search, setSearch] = useState('')

  const getAvailability = (months) => {
    const availability = {}

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

  const addProperties = (critters) =>
    critters.map((critter) => {
      const critterMonths = isNorthern ? critter.northern_months : critter.southern_months
      return {
        ...critter,
        months: critterMonths,
        ...getAvailability(critterMonths),
        isDonated: false,
      }
    })

  const bugs = addProperties(bugsData)
  const fish = addProperties(fishData)
  const seaCreatures = addProperties(seaData)

  const getTables = () => {
    if (search === '') {
      return (
        <>
          <CritterSection allCritters={bugs} type="Bugs" showAll={showAll} show={show} />
          <CritterSection allCritters={fish} type="Fish" showAll={showAll} show={show} />
          <CritterSection
            allCritters={seaCreatures}
            type="Sea Creatures"
            showAll={showAll}
            show={show}
          />
        </>
      )
    }
    return (
      <CritterSection
        allCritters={bugs.concat(fish, seaCreatures)}
        type="Search"
        showAll={showAll}
        show={show}
        search={search}
      />
    )
  }
  const tables = getTables()

  return (
    <>
      <Controls
        showAll={showAll}
        setShowAll={setShowAll}
        show={show}
        setShow={setShow}
        isNorthern={isNorthern}
        setIsNorthern={setIsNorthern}
        search={search}
        setSearch={setSearch}
      />
      {tables}
    </>
  )
}

export default Critters
