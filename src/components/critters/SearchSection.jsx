import { useEffect, useState } from 'react'
import { Paper, makeStyles, Typography } from '@material-ui/core'
import { Search as SearchIcon } from '@material-ui/icons'
import CrittersTable from 'components/critters/CrittersTable'
import useFiltersStore from 'store/filtersStore'

const useStyles = makeStyles(() => ({
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
  searchIcon: {
    height: '40px',
    width: '40px',
    marginRight: '15px',
  },
}))

const SearchSection = ({ allCritters }) => {
  const classes = useStyles()
  const search = useFiltersStore((state) => state.search)
  const [filteredCritters, setFilteredCritters] = useState(allCritters)

  useEffect(() => {
    setFilteredCritters(
      allCritters.filter((critter) => critter.name.toLowerCase().search(search) !== -1),
    )
  }, [allCritters, search])

  let content
  if (filteredCritters.length === 0) {
    content = 'No search results'
  } else {
    content = <CrittersTable critters={filteredCritters} />
  }

  return (
    <Paper classes={{ root: classes.critters }} elevation={7}>
      <div className={classes.headingWrapper}>
        <div className={classes.heading}>
          <SearchIcon className={classes.searchIcon} />
          <Typography variant="h4">Search</Typography>
        </div>
      </div>
      {content}
    </Paper>
  )
}

export default SearchSection
