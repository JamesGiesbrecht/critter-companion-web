import React, { useEffect, useState, useCallback } from 'react'
import {
  Collapse, Paper, makeStyles, Typography,
} from '@material-ui/core'
import { ExpandMoreRounded } from '@material-ui/icons'
import CrittersTable from '../../components/Table/CrittersTable'
import { arraysAreEqual } from '../../assets/utility'

const useStyles = makeStyles({
  critters: {
    padding: '10px 0',
    margin: '20px auto',
  },
  headingWrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  },
})

const Critters = ({
  allCritters, type, showAll, show, isNorthern,
}) => {
  const classes = useStyles()
  const [critters, setCritters] = useState(allCritters)
  const [expanded, setExpanded] = useState(false)
  const [randomImg, setRandomImg] = useState('')
  const [obtainedCritters, setObtainedCritters] = useState([])
  const today = new Date()
  const curMonth = today.getMonth() + 1

  const getMonths = (critter) => (isNorthern ? critter.northern_months : critter.southern_months)

  const hasPrevMonth = (months) => {
    if (curMonth === 1) { // January
      return months.includes(12)
    }
    return months.includes(curMonth - 1)
  }

  const hasNextMonth = (months) => {
    if (curMonth === 12) { // December
      return months.includes(1)
    }
    return months.includes(curMonth + 1)
  }

  const isAvailableNow = (months) => months.includes(curMonth)

  const isNew = (months) => isAvailableNow(months) && !hasPrevMonth(months)

  const isLeaving = (months) => isAvailableNow(months) && !hasNextMonth(months)

  const isNotObtained = (critterName) => !obtainedCritters.includes(critterName)

  const filterCritters = () => {
    let filteredCritters = []

    if (showAll === 'showAll') {
      // Add all critters
      filteredCritters = allCritters
    } else if (showAll === 'isAvailable') {
      // add critters that are available now
      filteredCritters = allCritters.filter((critter) => isAvailableNow(getMonths(critter)))
    } else {
      //  If isAvailable or showAll are checked that would already include
      //  all new and leaving critters so we are skipping them
      if (show.includes('isNew')) {
        // add critters that are new
        filteredCritters = filteredCritters.concat(allCritters.filter((critter) => (
          isNew(getMonths(critter))
        )))
      }
      if (show.includes('isLeaving')) {
        // add critters that are leaving
        filteredCritters = filteredCritters.concat(allCritters.filter((critter) => (
          isLeaving(getMonths(critter))
        )))
      }
    }

    if (show.includes('isNotObtained')) {
      // remove critters that are not obtained
      filteredCritters = filteredCritters.filter((critter) => isNotObtained(critter.name))
    }
    console.log(filteredCritters)
    return filteredCritters
  }

  useEffect(() => {
    setRandomImg(allCritters[Math.floor(Math.random() * critters.length)].image_path)
  }, [setRandomImg])

  useEffect(() => {
    setCritters(filterCritters())
  }, [show, showAll, isNorthern])

  return (
    <Paper classes={{ root: classes.critters }} elevation={3}>
      <div
        className={classes.headingWrapper}
        onClick={() => setExpanded((prevExpanded) => !prevExpanded)}
        role="button"
        tabIndex={0}
        onKeyPress={() => setExpanded((prevExpanded) => !prevExpanded)}
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
        <CrittersTable
          critters={critters}
          isNorthern={isNorthern}
          obtainedCritters={obtainedCritters}
          setObtainedCritters={setObtainedCritters}
        />
      </Collapse>
    </Paper>
  )
}

export default Critters
