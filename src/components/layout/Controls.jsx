import clsx from 'clsx'
import useStore, { MainFilter, Statuses } from 'store'
import { useColorScheme } from 'context/Theme'
import { dot } from 'assets/cssClasses'
import { removeItem } from 'assets/utility'
import {
  Paper,
  InputBase,
  ToggleButtonGroup,
  ToggleButton,
  makeStyles,
  IconButton,
  Button,
  Collapse,
} from '@material-ui/core'
import LightModeIcon from '@material-ui/icons/Brightness7'
import DarkModeIcon from '@material-ui/icons/Brightness3'
import SearchIcon from '@material-ui/icons/Search'
import ClearIcon from '@material-ui/icons/ClearRounded'
import FilterIcon from '@material-ui/icons/FilterAlt'
import { useState } from 'react'
import ExpandMoreIcon from 'components/ui/ExpandMoreIcon'

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
  buttons: {
    display: 'flex',
    '& > *': {
      flexGrow: '1',
    },
  },
  buttonGroup: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    marginTop: theme.spacing(1),
    [theme.breakpoints.down('md')]: {
      '& > *': {
        marginBottom: '10px',
      },
    },
    [theme.breakpoints.up('md')]: {
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
      textAlign: 'center',
      '& > *:not(:last-child)': {
        marginRight: '10px',
      },
    },
  },
  search: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: `rgba(${theme.palette.mode === 'light' ? '0, 0, 0' : '255, 255, 255'}, 0.15)`,
    '&:hover': {
      backgroundColor: `rgba(${theme.palette.mode === 'light' ? '0, 0, 0' : '255, 255, 255'}, 0.2)`,
    },
    width: '100%',
    marginTop: theme.spacing(1),
  },
  collapse: {
    marginTop: theme.spacing(1),
  },
  disabled: {
    '& span': {
      color: theme.palette.text.disabled,
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 1),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: `rgba(${theme.palette.mode === 'light' ? '0, 0, 0' : '255, 255, 255'}, 0.54)`,
  },
  inputRoot: {
    color: 'inherit',
    width: '100%',
  },
  inputInput: {
    padding: theme.spacing(1, 0, 1, 0),
    transition: theme.transitions.create('width'),
    width: '100%',
  },
  dot,
  new: {
    backgroundColor: theme.palette.success.light,
  },
  leaving: {
    backgroundColor: theme.palette.error.light,
  },
  incoming: {
    backgroundColor: theme.palette.info.light,
  },
}))

const Controls = () => {
  const classes = useStyles()
  const [filtersExpanded, setFiltersExpanded] = useState(false)
  const [searchExpanded, setSearchExpanded] = useState(false)
  const { colorScheme, toggleColorScheme } = useColorScheme()
  const {
    mainFilter,
    setMainFilter,
    statusFilters,
    setStatusFilters,
    isNorthern,
    toggleIsNorthern,
    search,
    setSearch,
  } = useStore((state) => state.filters)

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

  const handleMainFilterChange = (e, newMainFilter) => {
    if (newMainFilter === null || newMainFilter === MainFilter.Custom) {
      setMainFilter(MainFilter.Custom)
    } else {
      let newStatusFilters = statusFilters
      if (!newStatusFilters.includes(Statuses.New)) newStatusFilters.push(Statuses.New)
      if (!newStatusFilters.includes(Statuses.Leaving)) newStatusFilters.push(Statuses.Leaving)
      if (newMainFilter === MainFilter.All) {
        if (!newStatusFilters.includes(Statuses.Incoming)) newStatusFilters.push(Statuses.Incoming)
      } else if (newMainFilter === MainFilter.Available) {
        if (newStatusFilters.includes(Statuses.Incoming))
          newStatusFilters = removeItem(newStatusFilters, Statuses.Incoming)
      }
      setStatusFilters(newStatusFilters)
      setMainFilter(newMainFilter)
    }
  }

  const handleToggleFilterExpand = () => {
    setFiltersExpanded((prevExpanded) => !prevExpanded)
    setSearchExpanded(false)
  }

  const handleToggleSearchExpand = () => {
    setSearchExpanded((prevExpanded) => !prevExpanded)
    setFiltersExpanded(false)
  }

  const handleStatusFiltersChange = (e, newStatusFilters) => setStatusFilters(newStatusFilters)

  const handleUpdateSearch = (e) => setSearch(e.target.value.toLowerCase())

  const handleClearSearch = () => setSearch('')

  let clearIcon = null
  if (search !== '') {
    clearIcon = (
      <div
        className={classes.searchIcons}
        onClick={handleClearSearch}
        onKeyPress={handleClearSearch}
        role="button"
        tabIndex={0}>
        <ClearIcon />
      </div>
    )
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
        <div className={classes.search}>
          <div className={classes.searchIcon}>
            <SearchIcon />
          </div>
          <InputBase
            placeholder="Search…"
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput,
            }}
            inputProps={{ 'aria-label': 'search' }}
            value={search}
            onChange={handleUpdateSearch}
          />
          {clearIcon}
        </div>
      </Collapse>
      <Collapse in={filtersExpanded}>
        <div className={classes.buttonGroup}>
          <ToggleButton value={isNorthern} selected onChange={toggleIsNorthern} size="small">
            {isNorthern ? 'Northern' : 'Southern'}
          </ToggleButton>
          <ToggleButtonGroup
            className={classes.buttons}
            value={mainFilter}
            size="small"
            exclusive
            onChange={handleMainFilterChange}>
            <ToggleButton value={MainFilter.All}>Show All</ToggleButton>
            <ToggleButton value={MainFilter.Available}>Available Now</ToggleButton>
            <ToggleButton value={MainFilter.Custom}>Custom</ToggleButton>
          </ToggleButtonGroup>
          <ToggleButtonGroup
            className={classes.buttons}
            value={statusFilters}
            onChange={handleStatusFiltersChange}
            size="small">
            <ToggleButton
              value={Statuses.New}
              classes={{ disabled: classes.disabled }}
              disabled={mainFilter !== MainFilter.Custom}>
              New
              <span className={clsx(classes.dot, classes.new)} />
            </ToggleButton>
            <ToggleButton
              value={Statuses.Leaving}
              classes={{ disabled: classes.disabled }}
              disabled={mainFilter !== MainFilter.Custom}>
              Leaving
              <span className={clsx(classes.dot, classes.leaving)} />
            </ToggleButton>
            <ToggleButton
              value={Statuses.Incoming}
              classes={{ disabled: classes.disabled }}
              disabled={mainFilter !== MainFilter.Custom}>
              Incoming
              <span className={clsx(classes.dot, classes.incoming)} />
            </ToggleButton>
            <ToggleButton value={Statuses.Donated}>Include Donated</ToggleButton>
          </ToggleButtonGroup>
        </div>
      </Collapse>
    </Paper>
  )
}

export default Controls
