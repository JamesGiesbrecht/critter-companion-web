import React, { useState, useEffect } from 'react'
import { Paper, makeStyles } from '@material-ui/core'
import { ToggleButtonGroup, ToggleButton } from '@material-ui/lab'
import LightModeIcon from '@material-ui/icons/Brightness7'
import DarkModeIcon from '@material-ui/icons/Brightness3'
import { arraysAreEqual } from '../assets/utility'

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
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-around',
      marginTop: '-30px',
      paddingTop: '45px',
    },
  },
  buttonGroup: {
    display: 'flex',
    alignItems: 'center',
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '340px',
    marginBottom: '15px',
    justifyContent: 'center',
  },
  firstButtonGroup: {
    justifyContent: 'space-between',
    [theme.breakpoints.down('sm')]: {
      width: '318px',
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
    if (newShow.includes('isAvailable')) {
      if (!newShow.includes('isNew')) newShow.push('isNew')
      if (!newShow.includes('isLeaving')) newShow.push('isLeaving')
    }
    setShow(newShow)
  }

  const handleThemeChange = (e, newTheme) => {
    if (newTheme !== theme && newTheme !== null) toggleTheme()
  }

  useEffect(() => {
    setShowAll(arraysAreEqual(showAllArray, show))
  }, [show, showAll, showAllArray])

  return (
    <Paper classes={{ root: classes.controls }} elevation={3}>
      <div className={[classes.buttonGroup, classes.firstButtonGroup].join(' ')}>
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
      </div>
      <div className={classes.buttonGroup}>
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
          <ToggleButton value="isNotObtained">
            Not Obtained
          </ToggleButton>
        </ToggleButtonGroup>
      </div>
    </Paper>
  )
}

export default Controls
