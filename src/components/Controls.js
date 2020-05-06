import React, { useState, useEffect } from 'react'
import { Paper, makeStyles } from '@material-ui/core'
import { ToggleButtonGroup, ToggleButton } from '@material-ui/lab'
import LightModeIcon from '@material-ui/icons/Brightness7'
import DarkModeIcon from '@material-ui/icons/Brightness3'
import { arraysAreEqual } from '../assets/utility'

const useStyles = makeStyles((theme) => ({
  controls: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
    padding: '20px',
    marginBottom: '20px',
    [theme.breakpoints.down('sm')]: {
      marginTop: '-20px',
      paddingTop: '20px',
    },
    [theme.breakpoints.up('sm')]: {
      marginTop: '-25px',
      paddingTop: '25px',
    },
    [theme.breakpoints.up('md')]: {
      marginTop: '-30px',
      paddingTop: '30px',
    },
  },
}))

const Controls = ({
  theme, toggleTheme, show, setShow, isNorthern, setIsNorthern, showAllArray,
}) => {
  const classes = useStyles()
  const [showAll, setShowAll] = useState(false)

  const handleShowAllChange = (e, curShowAll) => {
    if (curShowAll === false) {
      setShow(showAllArray)
    }
  }

  const handleShowChange = (e, newShow) => {
    setShow(newShow)
  }

  const handleThemeChange = (e, newTheme) => {
    if (newTheme !== theme && newTheme !== null) toggleTheme()
  }

  useEffect(() => {
    if (arraysAreEqual(showAllArray, show)) {
      setShowAll(true)
    } else {
      setShowAll(false)
    }
  }, [show, showAll])

  return (
    <Paper classes={{ root: classes.controls }} elevation={3}>
      <ToggleButton
        value={isNorthern}
        selected
        onChange={() => setIsNorthern((prevIsNorthern) => !prevIsNorthern)}
        size="small"
      >
        {isNorthern ? 'Northern' : 'Southern'}
      </ToggleButton>
      <ToggleButton
        value={showAll}
        selected={showAll}
        onChange={handleShowAllChange}
        size="small"
      >
        Show All
      </ToggleButton>
      <ToggleButtonGroup
        value={show}
        onChange={handleShowChange}
        size="small"
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
