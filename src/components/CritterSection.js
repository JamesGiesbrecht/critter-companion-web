import { useEffect, useState, useCallback } from 'react'
import { Collapse, Paper, makeStyles, Typography } from '@material-ui/core'
import { ExpandMoreRounded } from '@material-ui/icons'
import SearchIcon from '@material-ui/icons/Search'
import CrittersTable from './CrittersTable'
import { removeItem } from '../assets/utility'

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
    width: '55px',
    marginRight: '20px',
  },
  searchIcon: {
    height: '40px',
    width: '40px',
    marginRight: '15px',
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
  const isSearch = search && search.length > 0
  const [expanded, setExpanded] = useState(isSearch)
  // eslint-disable-next-line max-len
  const [randomImg] = useState(
    isSearch
      ? <SearchIcon className={classes.searchIcon} />
      : (
        <img
          className={classes.headingImg}
          src={allCritters[Math.floor(Math.random() * allCritters.length)].image_path}
          alt={type}
        />
      ),
  )
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
    } else {
      //  Checking if any of the conditions in show are true properties on the critter
      const tempShow = removeItem([...show], 'isDonated')

      filteredCritters = allCritters.filter((critter) => (
        tempShow.some((condition) => critter[condition])
      ))
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
    content = isSearch ? 'No search results' : `No ${type.toLowerCase()} to show`
  } else {
    content = (
      <CrittersTable
        critters={critters}
        isNorthern={isNorthern}
        donatedCritters={donatedCritters}
        setDonatedCritters={setDonatedCritters}
        isFish={type === 'Fish'}
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
          {randomImg}
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
