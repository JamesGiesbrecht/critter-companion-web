import React, { useEffect, useState } from 'react'
import CrittersTable from '../../components/Table/CrittersTable'
import { Collapse } from '@material-ui/core'

const CrittersContainer = ({ critters, setCritters, type }) => {
  const [expanded, setExpanded] = useState(false)
  const [randomImg, setRandomImg] = useState('')

  useEffect(() => {
    setRandomImg(critters[Math.floor(Math.random() * critters.length)].image_path)
  }, [setRandomImg, critters])

  return (
    <>
      <button onClick={() => setExpanded(!expanded)}>Collapsed</button>
      <img src={randomImg} alt={type} />
      <Collapse in={expanded}>
        <CrittersTable critters={critters} />
      </Collapse>
    </>
  )
}

export default CrittersContainer
