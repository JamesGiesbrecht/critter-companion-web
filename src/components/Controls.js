import React from 'react'
import { Paper, makeStyles } from '@material-ui/core'
import { ToggleButtonGroup, ToggleButton } from '@material-ui/lab'
import LightModeIcon from '@material-ui/icons/Brightness7'
import DarkModeIcon from '@material-ui/icons/Brightness3'

//  TODO: Availble Now || all, northern || southern, leaving this month, new this month, search, show ones not obtained

const Controls = ({ theme, toggleTheme, titleHeight }) => {
  const useStyles = makeStyles({
    controls: {
      marginTop: `-${titleHeight/2}px`,
      padding: '20px',
      paddingTop: `${titleHeight/2 + 20}px`,
      marginBottom: '20px',
    },
  })
  const classes = useStyles()

  const handleThemeChange = (e, newTheme) => {
    if (newTheme !== theme && newTheme !== null)
      toggleTheme()
  }

  return (
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
  )
}

export default Controls
