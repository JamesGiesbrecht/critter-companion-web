import useStore, { MainFilter } from 'store'
import { useColorScheme } from 'context/Theme'
import { Paper, makeStyles, IconButton, Button, Collapse } from '@material-ui/core'
import {
  Brightness7 as LightModeIcon,
  Brightness3 as DarkModeIcon,
  FilterAlt as FilterIcon,
  Search as SearchIcon,
} from '@material-ui/icons'
import { useRef, useState } from 'react'
import ExpandMoreIcon from 'components/ui/ExpandMoreIcon'
import Search from 'components/layout/controls/components/Search'
import FilterButtons from 'components/layout/controls/components/FilterButtons'

const useStyles = makeStyles((theme) => ({
  controls: {
    padding: '15px',
    textAlign: 'center',
    [theme.breakpoints.down('sm')]: {
      marginTop: '-20px',
      paddingTop: '35px',
      borderRadius: 0,
    },
    [theme.breakpoints.up('sm')]: {
      marginTop: '-25px',
      paddingTop: '40px',
    },
    [theme.breakpoints.up('md')]: {
      marginTop: '-30px',
      paddingTop: '45px',
    },
  },
  mainControls: {},
}))

const Controls = () => {
  const classes = useStyles()
  const [filtersExpanded, setFiltersExpanded] = useState(false)
  const [searchExpanded, setSearchExpanded] = useState(false)
  const searchRef = useRef()
  const { colorScheme, toggleColorScheme } = useColorScheme()
  const mainFilter = useStore((state) => state.filters.mainFilter)

  const getFilterText = (filter) => {
    switch (filter) {
      case MainFilter.All:
        return 'Show All'
      case MainFilter.Available:
        return 'Available Now'
      case MainFilter.Custom:
        return 'Custom'
      default:
        return null
    }
  }
  const currentFilter = getFilterText(mainFilter)

  const handleToggleFilterExpand = () => {
    setFiltersExpanded((prevExpanded) => !prevExpanded)
    setSearchExpanded(false)
  }

  const handleToggleSearchExpand = () => {
    setSearchExpanded((prevExpanded) => {
      if (!prevExpanded) {
        setTimeout(() => searchRef.current.focus(), 100)
      }
      return !prevExpanded
    })
    setFiltersExpanded(false)
  }

  return (
    <Paper classes={{ root: classes.controls }} elevation={7}>
      <div className={classes.mainControls}>
        <IconButton onClick={handleToggleSearchExpand}>
          <SearchIcon />
        </IconButton>
        <Button
          startIcon={<FilterIcon />}
          endIcon={<ExpandMoreIcon expand={filtersExpanded} />}
          onClick={handleToggleFilterExpand}>
          {currentFilter}
        </Button>
        <IconButton onClick={toggleColorScheme}>
          {colorScheme === 'light' ? <DarkModeIcon /> : <LightModeIcon />}
        </IconButton>
      </div>
      <Collapse in={searchExpanded}>
        <Search inputRef={searchRef} />
      </Collapse>
      <Collapse in={filtersExpanded}>
        <FilterButtons />
      </Collapse>
    </Paper>
  )
}

export default Controls
