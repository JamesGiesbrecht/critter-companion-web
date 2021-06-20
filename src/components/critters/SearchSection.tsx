import { FC, useEffect, useState } from 'react'

import useStore from 'store'
import { Critter } from 'typescript/types'

import { makeStyles, Typography } from '@material-ui/core'
import { Search as SearchIcon } from '@material-ui/icons'
import CrittersTable from 'components/critters/CrittersTable'
import CustomPaper from 'components/ui/CustomPaper'

interface Props {
  critters: Critter[]
}

const useStyles = makeStyles(() => ({
  search: {
    padding: '10px 0',
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

const SearchSection: FC<Props> = ({ critters }) => {
  const classes = useStyles()
  const search = useStore((state) => state.filters.search)
  const [filteredCritters, setFilteredCritters] = useState(critters)

  useEffect(() => {
    setFilteredCritters(
      critters.filter((critter) => critter.name.toLowerCase().search(search) !== -1),
    )
  }, [critters, search])

  let content
  if (filteredCritters.length === 0) {
    content = 'No search results'
  } else {
    content = <CrittersTable critters={filteredCritters} />
  }

  return (
    <CustomPaper classes={{ root: classes.search }}>
      <div className={classes.headingWrapper}>
        <div className={classes.heading}>
          <SearchIcon className={classes.searchIcon} />
          <Typography variant="h4">Search</Typography>
        </div>
      </div>
      {content}
    </CustomPaper>
  )
}

export default SearchSection
