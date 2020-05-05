import React, { useEffect, useState } from 'react'
import CrittersTable from '../../components/Table/CrittersTable'
import { Collapse, Paper, makeStyles, Typography } from '@material-ui/core'
import { ExpandMoreRounded } from '@material-ui/icons'

const useStyles = makeStyles({
  critters: {
    padding: '10px 0',
    margin: '20px auto'
  },
  headingWrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: "center",
    padding: '0 10px',
  },
  heading: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  headingImg: {
    width: '60px',
    marginRight: '20px',
  },
  expandArrow: {
    transform: 'rotate(0deg)',
    transition: 'transform 0.2s linear',
  },  
  open: {
    transform: 'rotate(180deg)',
    transition: 'transform 0.2s linear',
  }
})

const Critters = ({ critters, setCritters, type, show, isNorthern }) => {
  const classes = useStyles()
  const [expanded, setExpanded] = useState(false)
  const [randomImg, setRandomImg] = useState('')

  useEffect(() => {
    setRandomImg(critters[Math.floor(Math.random() * critters.length)].image_path)
  }, [setRandomImg, critters])

  return (
    <Paper classes={{ root: classes.critters }} elevation={3}>
      <div
        className={classes.headingWrapper}
        onClick={() => setExpanded((prevExpanded) => !prevExpanded)}
      >
        <div className={classes.heading}>
          <img
            className={classes.headingImg}
            src={randomImg}
            alt={type}
          />
          <Typography variant="h4">{type}</Typography>
        </div>
        <ExpandMoreRounded
          fontSize="large"
          className={[classes.expandArrow, !expanded && classes.open].join(' ')}
        />
      </div>
      <Collapse in={expanded}>
        <CrittersTable critters={critters} isNorthern={isNorthern}/>
      </Collapse>
    </Paper>
  )
}

export default Critters
