import { useState } from 'react'
import { AppBar, IconButton, Toolbar, Typography, makeStyles, Theme } from '@material-ui/core'
import {
  Menu as MenuIcon,
  Brightness7 as SunIcon,
  Brightness3 as MoonIcon,
} from '@material-ui/icons'
import NavigationDrawer from 'components/layout/NavigationDrawer'
import { useColorScheme } from 'context/Theme'

const useStyles = makeStyles((theme: Theme) => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    display: 'flex',
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.mixins.drawer.visibleBreakpoint]: {
      display: 'none',
    },
  },
}))

const Header = () => {
  const classes = useStyles()
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const { colorScheme, toggleColorScheme } = useColorScheme()

  const themeButton = (
    <IconButton color="inherit" onClick={toggleColorScheme}>
      {colorScheme === 'dark' ? <SunIcon /> : <MoonIcon />}
    </IconButton>
  )

  const handleDrawerToggle = () => {
    setIsDrawerOpen(!isDrawerOpen)
  }

  return (
    <>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Header
          </Typography>
          <div className={classes.grow} />
          {themeButton}
        </Toolbar>
      </AppBar>
      <NavigationDrawer
        DrawerProps={{
          open: isDrawerOpen,
          onClose: () => setIsDrawerOpen(false),
        }}
      />
    </>
  )
}

export default Header
