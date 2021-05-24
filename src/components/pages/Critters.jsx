import { useState } from 'react'
import Controls from '../Controls'
import CritterSection from '../CritterSection'
import bugsData from '../../assets/data/bugs.json'
import fishData from '../../assets/data/fish.json'
import seaData from '../../assets/data/sea.json'

const Critters = () => {
  const [showAll, setShowAll] = useState('showAll')
  const [show, setShow] = useState(['isNew', 'isLeaving', 'isIncoming', 'isDonated'])
  const [isNorthern, setIsNorthern] = useState(true)
  const [search, setSearch] = useState('')
  const today = new Date()
  const curMonth = today.getMonth() + 1

  const getMonths = (critter) => (isNorthern ? critter.northern_months : critter.southern_months)

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

  const isNew = (months) => isAvailableNow(months) && !hasPrevMonth(months)

  const isLeaving = (months) => isAvailableNow(months) && !hasNextMonth(months)

  const isIncoming = (months) => !isAvailableNow(months) && hasNextMonth(months)

  const addProperties = (critters) =>
    critters.map((critter) => {
      const critterMonths = getMonths(critter)
      return {
        ...critter,
        isAvailableNow: isAvailableNow(critterMonths),
        isNew: isNew(critterMonths),
        isLeaving: isLeaving(critterMonths),
        isIncoming: isIncoming(critterMonths),
        isDonated: false,
      }
    })

  const getTables = () => {
    if (search === '') {
      return (
        <>
          <CritterSection
            allCritters={addProperties(bugsData)}
            type="Bugs"
            showAll={showAll}
            show={show}
            isNorthern={isNorthern}
          />
          <CritterSection
            allCritters={addProperties(fishData)}
            type="Fish"
            showAll={showAll}
            show={show}
            isNorthern={isNorthern}
          />
          <CritterSection
            allCritters={addProperties(seaData)}
            type="Sea Creatures"
            showAll={showAll}
            show={show}
            isNorthern={isNorthern}
          />
        </>
      )
    }
    return (
      <CritterSection
        allCritters={addProperties(bugsData).concat(addProperties(fishData))}
        type="Search"
        showAll={showAll}
        show={show}
        isNorthern={isNorthern}
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