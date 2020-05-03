import React from 'react'
import { makeStyles, Paper, Typography } from '@material-ui/core'
import { ToggleButton, ToggleButtonGroup } from '@material-ui/lab'
import LightModeIcon from '@material-ui/icons/Brightness7'
import DarkModeIcon from '@material-ui/icons/Brightness3'


const titleHeight = 60

const useStyles = makeStyles({
  layout: {
    width: '80%',
    maxWidth: '800px',
    margin: '40px auto 0 auto',
    textAlign: 'center',
  },
  title: {
    display: 'inline-block',
    padding: '0 10px',
    height: `${titleHeight}px`,
    lineHeight: `${titleHeight}px`,
    backgroundColor: 'var(--green)',
    color: 'white',
  },
  controls: {
    marginTop: `-${titleHeight/2}px`,
    padding: '20px',
    paddingTop: `${titleHeight/2 + 20}px`,
    marginBottom: '20px',
  },
})

const Layout = ({ children, theme, toggleTheme }) => {
  const classes = useStyles()

  const handleThemeChange = (e, newTheme) => {
    if (newTheme !== theme && newTheme !== null)
      toggleTheme()
  }

  return (
    <div className={classes.layout}>
      <Paper classes={{ root: classes.title }} square>
        <Typography classes={{ h3: classes.title }} variant="h3">ACNH: Critter Companion</Typography>
      </Paper>
      <Paper classes={{ root: classes.controls }}>
        <ToggleButtonGroup
          value={theme}
          size="small"
          exclusive
          onChange={handleThemeChange}
        >
          <ToggleButton value="light">
            <LightModeIcon />
          </ToggleButton>
          <ToggleButton value="dark">
            <DarkModeIcon />
          </ToggleButton>
        </ToggleButtonGroup>
      </Paper>
      {children}
    </div>
  )
}

export default Layout
