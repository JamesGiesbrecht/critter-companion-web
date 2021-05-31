import clsx from 'clsx'
import { Paper, InputBase, ToggleButtonGroup, ToggleButton, makeStyles } from '@material-ui/core'
import LightModeIcon from '@material-ui/icons/Brightness7'
import DarkModeIcon from '@material-ui/icons/Brightness3'
import SearchIcon from '@material-ui/icons/Search'
import ClearIcon from '@material-ui/icons/ClearRounded'
import { useColorScheme } from 'context/Theme'
import { dot } from 'assets/cssClasses'
import { removeItem } from 'assets/utility'
import { MainFilter, useFilters } from 'context/Filters'

const useStyles = makeStyles((theme) => ({
  controls: {
    padding: '15px',
    textAlign: 'center',
    [theme.breakpoints.down('sm')]: {
      marginTop: '-20px',
      paddingTop: '35px',
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
    '& > *': {
      marginBottom: '10px',
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
  searchRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
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
    marginRight: '10px',
  },
  searchIcons: {
    padding: theme.spacing(0, 1),
    height: '100%',
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
  const { colorScheme, toggleColorScheme } = useColorScheme()
  const {
    mainFilter,
    setMainFilter,
    status,
    setStatus,
    isNorthern,
    setIsNorthern,
    search,
    setSearch,
  } = useFilters()

  const handleShowAllChange = (e, curShowAll) => {
    if (curShowAll === null || curShowAll === MainFilter.Custom) {
      setMainFilter(MainFilter.Custom)
    } else {
      let newShow = status
      if (!newShow.includes('isNew')) newShow.push('isNew')
      if (!newShow.includes('isLeaving')) newShow.push('isLeaving')
      if (curShowAll === MainFilter.All) {
        if (!newShow.includes('isIncoming')) newShow.push('isIncoming')
      } else if (curShowAll === MainFilter.Available) {
        if (newShow.includes('isIncoming')) newShow = removeItem(newShow, 'isIncoming')
      }
      setStatus(newShow)
      setMainFilter(curShowAll)
    }
  }

  const handleShowChange = (e, newShow) => setStatus(newShow)

  const handleThemeChange = (e, newTheme) => {
    if (newTheme !== colorScheme && newTheme !== null) toggleColorScheme()
  }

  let clearIcon = null
  if (search !== '') {
    clearIcon = (
      <div
        className={classes.searchIcons}
        onClick={() => setSearch('')}
        onKeyPress={() => setSearch('')}
        role="button"
        tabIndex={0}>
        <ClearIcon />
      </div>
    )
  }

  return (
    <Paper classes={{ root: classes.controls }} elevation={7}>
      <div className={classes.buttonGroup}>
        <ToggleButton
          value={isNorthern}
          selected
          onChange={() => setIsNorthern((prevIsNorthern) => !prevIsNorthern)}
          size="small">
          {isNorthern ? 'Northern' : 'Southern'}
        </ToggleButton>
        <ToggleButtonGroup
          className={classes.buttons}
          value={mainFilter}
          size="small"
          exclusive
          onChange={handleShowAllChange}>
          <ToggleButton value={MainFilter.All}>Show All</ToggleButton>
          <ToggleButton value={MainFilter.Available}>Available Now</ToggleButton>
          <ToggleButton value={MainFilter.Custom}>Custom</ToggleButton>
        </ToggleButtonGroup>
        <ToggleButtonGroup
          className={classes.buttons}
          value={status}
          onChange={handleShowChange}
          size="small">
          <ToggleButton value="isNew" disabled={mainFilter !== MainFilter.Custom}>
            New
            <span className={clsx(classes.dot, classes.new)} />
          </ToggleButton>
          <ToggleButton value="isLeaving" disabled={mainFilter !== MainFilter.Custom}>
            Leaving
            <span className={clsx(classes.dot, classes.leaving)} />
          </ToggleButton>
          <ToggleButton value="isIncoming" disabled={mainFilter !== MainFilter.Custom}>
            Incoming
            <span className={clsx(classes.dot, classes.incoming)} />
          </ToggleButton>
          <ToggleButton value="isDonated">Donated</ToggleButton>
        </ToggleButtonGroup>
      </div>
      <div className={classes.searchRow}>
        <div className={classes.search}>
          <div className={classes.searchIcons}>
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
            onChange={(e) => setSearch(e.target.value.toLowerCase())}
          />
          {clearIcon}
        </div>
        <ToggleButtonGroup value={colorScheme} size="small" exclusive onChange={handleThemeChange}>
          <ToggleButton value="light">
            <LightModeIcon />
          </ToggleButton>
          <ToggleButton value="dark">
            <DarkModeIcon />
          </ToggleButton>
        </ToggleButtonGroup>
      </div>
    </Paper>
  )
}

export default Controls
