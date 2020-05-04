import React, { useState, useEffect } from 'react'
import { Paper, makeStyles } from '@material-ui/core'
import { ToggleButtonGroup, ToggleButton } from '@material-ui/lab'
import LightModeIcon from '@material-ui/icons/Brightness7'
import DarkModeIcon from '@material-ui/icons/Brightness3'
import { arraysAreEqual } from '../assets/utility'

const Controls = ({ theme, toggleTheme, titleHeight, show, setShow, isNorthern, setIsNorthern }) => {
  const useStyles = makeStyles({
    controls: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-around',
      marginTop: `-${titleHeight/2}px`,
      padding: '20px',
      paddingTop: `${titleHeight/2 + 20}px`,
      marginBottom: '20px',
    },
  })
  const classes = useStyles()
  const [showAll, setShowAll] = useState(false)

  const handleThemeChange = (e, newTheme) => {
    if (newTheme !== theme && newTheme !== null)
      toggleTheme()
  }
  
  const handleShowChange = (e, newShow) => {
    setShow(newShow)
  }

  useEffect(() => {
    if (arraysAreEqual(['isNew', 'isLeaving', 'isObtained'], show)) {
      setShowAll(true)
    } else {
      setShowAll(false)
    }
  }, [show, showAll])

  return (
    <Paper classes={{ root: classes.controls }}>
      <ToggleButton
        value={isNorthern}
        selected={true}
        onChange={() => setIsNorthern(prevIsNorthern => !prevIsNorthern)}
        size="small"
      >
        {isNorthern ? "Northern" : "Southern"}
      </ToggleButton>
      <ToggleButton
        value={showAll}
        selected={showAll}
        onChange={() => setShowAll(prevShowAll => !prevShowAll)}
        size='small'
      >
        Show All
      </ToggleButton>
      <ToggleButtonGroup
        value={show}
        onChange={handleShowChange}
        size='small'
      >
        <ToggleButton value="isAvailable">
          Available Now
        </ToggleButton>
        <ToggleButton value="isNew">
          New
        </ToggleButton>
        <ToggleButton value="isLeaving">
          Leaving
        </ToggleButton>
        <ToggleButton value="isObtained">
          Obtained
        </ToggleButton>
      </ToggleButtonGroup>
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
