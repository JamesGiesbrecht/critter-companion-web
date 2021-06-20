import { useRef, useState } from 'react'

import logo from 'assets/images/app-logo.png'
import { useAuth } from 'context/Auth'
import { useColorScheme } from 'context/Theme'
import useStore from 'store'
import { FormType, MainFilter } from 'typescript/enums'

import { makeStyles, IconButton, Button, Collapse, Divider } from '@material-ui/core'
import {
  Brightness7 as LightModeIcon,
  Brightness3 as DarkModeIcon,
  FilterAlt as FilterIcon,
  Search as SearchIcon,
} from '@material-ui/icons'
import AccountButton from 'components/auth/AccountButton'
import FilterButtons from 'components/layout/controls/components/FilterButtons'
import Search from 'components/layout/controls/components/Search'
import ExpandMoreIcon from 'components/ui/ExpandMoreIcon'
import CustomPaper from 'components/ui/CustomPaper'

const logoWidth = 300

const useStyles = makeStyles((theme) => ({
  controls: {
    padding: '15px!important',
    textAlign: 'center',
    marginTop: 100,
    [theme.breakpoints.down('md')]: {
      marginTop: 190,
    },
  },
  mainControls: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap-reverse',
    [theme.breakpoints.down('md')]: {
      paddingTop: 5,
    },
  },
  subControls: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: `calc((100% - ${logoWidth}px) / 2)`,
    [theme.breakpoints.down('md')]: {
      flexGrow: 1,
      minWidth: 250,
    },
  },
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
    [theme.breakpoints.down('md')]: {
      display: 'none',
    },
  },
  logo: {
    position: 'absolute',
    top: 5,
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: logoWidth,
    [theme.breakpoints.down('md')]: {
      top: -90,
    },
  },
  divider: {
    marginTop: 65,
    [theme.breakpoints.down('md')]: {
      marginTop: theme.spacing(1),
    },
  },
  smoothBottomMargin: {
    height: 30,
    [theme.breakpoints.down('md')]: {
      height: 0,
    },
  },
}))

const Controls = () => {
  const classes = useStyles()
  const [filtersExpanded, setFiltersExpanded] = useState(false)
  const [searchExpanded, setSearchExpanded] = useState(false)
  const searchRef = useRef<HTMLInputElement>(null)
  const { colorScheme, toggleColorScheme } = useColorScheme()
  const search = useStore((state) => state.filters.search)
  const mainFilter = useStore((state) => state.filters.mainFilter)
  const setActiveFormName = useStore((state) => state.setActiveForm)
  const { user } = useAuth()

  const handleCloseSearch = () => {
    if (search) return
    setSearchExpanded(false)
  }

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
    handleCloseSearch()
  }

  const handleToggleSearchExpand = () => {
    setSearchExpanded((prevExpanded) => {
      if (!prevExpanded || search) {
        setTimeout(() => {
          if (searchRef.current !== null) {
            searchRef.current.focus()
          }
        }, 100)
      }
      if (search) return true
      return !prevExpanded
    })
    if (!search) setFiltersExpanded(false)
  }

  return (
    <div>
      <CustomPaper classes={{ root: classes.controls }}>
        <div className={classes.mainControls}>
          <div className={classes.subControls}>
            <Button color="inherit" startIcon={<SearchIcon />} onClick={handleToggleSearchExpand}>
              Search
            </Button>
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
          <div className={classes.subControls}>
            <IconButton onClick={toggleColorScheme}>
              {colorScheme === 'light' ? <DarkModeIcon /> : <LightModeIcon />}
            </IconButton>
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
      </CustomPaper>
      <Collapse in={!searchExpanded && !filtersExpanded}>
        <div className={classes.smoothBottomMargin} />
      </Collapse>
    </div>
  )
}

export default Controls
