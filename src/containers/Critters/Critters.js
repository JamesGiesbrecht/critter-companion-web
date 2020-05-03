import React, { useEffect, useState } from 'react'
import CrittersTable from '../../components/Table/CrittersTable'
import { Collapse, Paper, makeStyles, Typography } from '@material-ui/core'
import { ExpandMoreRounded } from '@material-ui/icons'

const useStyles = makeStyles({
  critters: {
    padding: '10px 0',
    margin: '20px auto'
  },
  heading: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: '15px',
  },
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
      <div className={classes.heading} onClick={() => setExpanded((prevExpanded) => !prevExpanded)}>
        <div>
          <img src={randomImg} alt={type} />
          <Typography>{type}</Typography>
        </div>
        <ExpandMoreRounded fontSize="large"/>
      </div>
      <Collapse in={expanded}>
        <CrittersTable critters={critters} />
      </Collapse>
    </Paper>
  )
}

export default CrittersContainer
