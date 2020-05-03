import React, { useEffect, useState } from 'react'
import CrittersTable from '../../components/Table/CrittersTable'
import { Collapse, Paper, makeStyles } from '@material-ui/core'

const useStyles = makeStyles({
  critters: {
    padding: '10px 0',
    margin: '20px auto'
  }
})

const CrittersContainer = ({ critters, setCritters, type }) => {
  const classes = useStyles()
  const [expanded, setExpanded] = useState(true)
  const [randomImg, setRandomImg] = useState('')

  useEffect(() => {
    setRandomImg(critters[Math.floor(Math.random() * critters.length)].image_path)
  }, [setRandomImg, critters])

  return (
    <Paper classes={{ root: classes.critters }}>
      <button onClick={() => setExpanded(!expanded)}>Collapsed</button>
      <img src={randomImg} alt={type} />
      <Collapse in={expanded}>
        <CrittersTable critters={critters} />
      </Collapse>
    </Paper>
  )
}

export default CrittersContainer
