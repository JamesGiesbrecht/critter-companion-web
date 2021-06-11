import { useRef, useState } from 'react'
import clsx from 'clsx'
import useStore, { FormType, MainFilter } from 'store'
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
import { useAuth } from 'context/Auth'
import AccountButton from 'components/auth/AccountButton'

const logoWidth = 300

const useStyles = makeStyles(() => ({
  controls: {
    padding: '15px',
    textAlign: 'center',
    marginTop: 100,
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
  loginButton: {
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  },
  signUpButton: {
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
  },
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
  const setActiveFormName = useStore((state) => state.setActiveForm)
  const { user } = useAuth()

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

  const handleOpenLogin = () => {
    setActiveFormName(FormType.Login)
  }

  const handleOpenSignUp = () => {
    setActiveFormName(FormType.SignUp)
  }

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
              color="inherit"
              startIcon={<FilterIcon />}
              endIcon={<ExpandMoreIcon expand={filtersExpanded} />}
              onClick={handleToggleFilterExpand}>
              {currentFilter}
            </Button>
          </div>
          <div className={classes.logoPlaceholder} />
          <img className={classes.logo} src={logo} alt="Critter Companion" />
          <div className={clsx(classes.subControls, classes.rightControls)}>
            {user ? (
              <AccountButton />
            ) : (
              <div>
                <Button
                  variant="contained"
                  onClick={handleOpenLogin}
                  className={classes.loginButton}>
                  Login
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={handleOpenSignUp}
                  className={classes.signUpButton}>
                  Sign up
                </Button>
              </div>
            )}
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
