import { useRef, useState } from 'react'
import clsx from 'clsx'
import useStore, { MainFilter } from 'store'
import { useColorScheme } from 'context/Theme'
import { Paper, makeStyles, IconButton, Button, Collapse, Divider } from '@material-ui/core'
import {
  Brightness7 as LightModeIcon,
  Brightness3 as DarkModeIcon,
  FilterAlt as FilterIcon,
  Search as SearchIcon,
} from '@material-ui/icons'
import ExpandMoreIcon from 'components/ui/ExpandMoreIcon'
import Search from 'components/layout/controls/components/Search'
import FilterButtons from 'components/layout/controls/components/FilterButtons'
import logo from 'assets/images/app-logo.png'

const logoWidth = 300

const useStyles = makeStyles(() => ({
  controls: {
    padding: '15px',
    textAlign: 'center',
    marginTop: 40,
  },
  mainControls: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  subControls: {
    display: 'flex',
    justifyContent: 'space-around',
    width: `calc((100% - ${logoWidth}px) / 2)`,
  },
  leftControls: {},
  rightControls: {},
  logoPlaceholder: {
    width: logoWidth,
  },
  logo: {
    position: 'absolute',
    top: '-10%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: logoWidth,
  },
  divider: {
    marginTop: 55,
  },
}))

const Controls = () => {
  const classes = useStyles()
  const [filtersExpanded, setFiltersExpanded] = useState(false)
  const [searchExpanded, setSearchExpanded] = useState(false)
  const searchRef = useRef<HTMLInputElement>(null)
  const { colorScheme, toggleColorScheme } = useColorScheme()
  const mainFilter = useStore((state) => state.filters.mainFilter)

  const getFilterText = (filter: MainFilter) => {
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
        setTimeout(() => {
          if (searchRef.current !== null) {
            searchRef.current.focus()
          }
        }, 100)
      }
      return !prevExpanded
    })
    setFiltersExpanded(false)
  }

  return (
    <div>
      <Paper classes={{ root: classes.controls }} elevation={7}>
        <div className={classes.mainControls}>
          <div className={clsx(classes.subControls, classes.leftControls)}>
            <IconButton onClick={handleToggleSearchExpand}>
              <SearchIcon />
            </IconButton>
            <Button
              startIcon={<FilterIcon />}
              endIcon={<ExpandMoreIcon expand={filtersExpanded} />}
              onClick={handleToggleFilterExpand}>
              {currentFilter}
            </Button>
          </div>
          <div className={classes.logoPlaceholder} />
          <img className={classes.logo} src={logo} alt="Critter Companion" />
          <div className={clsx(classes.subControls, classes.rightControls)}>
            <IconButton onClick={toggleColorScheme}>
              {colorScheme === 'light' ? <DarkModeIcon /> : <LightModeIcon />}
            </IconButton>
          </div>
        </div>
        {/* Image smooth bottom margin */}
        <Collapse in={searchExpanded || filtersExpanded}>
          <Divider className={classes.divider} />
        </Collapse>
        <Collapse in={searchExpanded}>
          <Search inputRef={searchRef} />
        </Collapse>
        <Collapse in={filtersExpanded}>
          <FilterButtons />
        </Collapse>
      </Paper>
      {/* Smooth bottom margin */}
      <Collapse in={!searchExpanded && !filtersExpanded}>
        <div style={{ height: 24 }} />
      </Collapse>
    </div>
  )
}

export default Controls
