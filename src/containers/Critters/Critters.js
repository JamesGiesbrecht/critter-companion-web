import React, { useState } from 'react'
import crittersData from '../../assets/data/critters.json'
import CrittersTable from '../../components/Table/CrittersTable'

const CrittersContainer = () => {
  const [bugs, setBugs] = useState(crittersData.filter((critter) => critter.type === "Bugs"))
  const [fish, setFish] = useState(crittersData.filter((critter) => critter.type === "Fish"))

  return (
    <>
      <CrittersTable critters={bugs} />
      <CrittersTable critters={fish} />
    </>
  )
}

export default CrittersContainer
