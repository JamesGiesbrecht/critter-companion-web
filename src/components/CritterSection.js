import React, { useEffect, useState, useCallback } from 'react'
import { Collapse, Paper, makeStyles, Typography } from '@material-ui/core'
import { ExpandMoreRounded } from '@material-ui/icons'
import CrittersTable from './CrittersTable'

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

const CritterSection = ({ allCritters, type, showAll, show, isNorthern, search }) => {
  const classes = useStyles()
  const [expanded, setExpanded] = useState(true)
  // eslint-disable-next-line max-len
  const [randomImg] = useState(allCritters[Math.floor(Math.random() * allCritters.length)].image_path)
  const [critters, setCritters] = useState([])
  const [donatedCritters, setDonatedCritters] = useState(
    localStorage.getItem('donatedCritters') ? localStorage.getItem('donatedCritters').split(',') : [],
  )
  const [isLoading, setIsLoading] = useState(true)

  const filterCritters = useCallback(() => {
    let filteredCritters = []
    if (search) {
      return allCritters.filter((critter) => critter.name.toLowerCase().search(search) !== -1)
    }

    if (showAll === 'showAll') {
      // Add all critters
      filteredCritters = allCritters
    } else if (showAll === 'isAvailable') {
      // add critters that are available now
      filteredCritters = allCritters.filter((critter) => critter.isAvailableNow)
    } else if (show.includes('isNew') && show.includes('isLeaving')) {
      filteredCritters = allCritters.filter((critter) => critter.isNew || critter.isLeaving)
    } else {
      if (show.includes('isNew')) {
        // add critters that are new
        filteredCritters = filteredCritters.concat(allCritters.filter((critter) => (
          critter.isNew
        )))
      }
      if (show.includes('isLeaving')) {
        // add critters that are leaving
        filteredCritters = filteredCritters.concat(allCritters.filter((critter) => (
          critter.isLeaving
        )))
      }
    }

    if (!show.includes('isDonated')) {
      // remove critters that are not donated
      filteredCritters = filteredCritters.filter((critter) => (
        !donatedCritters.includes(critter.name)
      ))
    }

    return filteredCritters
  }, [allCritters, show, showAll, donatedCritters, search])

  useEffect(() => {
    localStorage.setItem('donatedCritters', donatedCritters)
  }, [donatedCritters])

  useEffect(() => {
    setIsLoading(true)
    setCritters(filterCritters())
    setIsLoading(false)
  }, [filterCritters])

  let content
  if (isLoading) {
    content = <div className="loader" />
  } else if (critters.length === 0) {
    content = `No ${type.toLowerCase()} to show`
  } else {
    content = (
      <CrittersTable
        critters={critters}
        isNorthern={isNorthern}
        donatedCritters={donatedCritters}
        setDonatedCritters={setDonatedCritters}
      />
    )
  }

  return (
    <Paper classes={{ root: classes.critters }} elevation={3}>
      {/* eslint-disable-next-line jsx-a11y/interactive-supports-focus */}
      <div
        className={classes.headingWrapper}
        onClick={() => setExpanded((prevExpanded) => !prevExpanded)}
        role="button"
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
        {content}
      </Collapse>
    </Paper>
  )
}

export default CritterSection
