import React from 'react'
import { Paper, makeStyles } from '@material-ui/core'
import { ToggleButtonGroup, ToggleButton } from '@material-ui/lab'
import LightModeIcon from '@material-ui/icons/Brightness7'
import DarkModeIcon from '@material-ui/icons/Brightness3'

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

// eslint-disable-next-line max-len
const Controls = ({ theme, toggleTheme, showAll, setShowAll, show, setShow, isNorthern, setIsNorthern }) => {
  const classes = useStyles()

  const handleShowAllChange = (e, curShowAll) => {
    if (setShowAll) {
      const newShow = show
      if (!newShow.includes('isNew')) newShow.push('isNew')
      if (!newShow.includes('isLeaving')) newShow.push('isLeaving')
      setShow(newShow)
    }
    setShowAll(curShowAll)
  }

  const handleShowChange = (e, newShow) => setShow(newShow)

  const handleThemeChange = (e, newTheme) => {
    if (newTheme !== theme && newTheme !== null) toggleTheme()
  }

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
        <ToggleButtonGroup
          value={showAll}
          size="small"
          exclusive
          onChange={handleShowAllChange}
        >
          <ToggleButton value="showAll">
            Show All
          </ToggleButton>
          <ToggleButton value="isAvailable">
            Available Now
          </ToggleButton>
        </ToggleButtonGroup>
      </div>
      <div className={classes.buttonGroup}>
        <ToggleButtonGroup
          value={show}
          onChange={handleShowChange}
          size="small"
        >
          <ToggleButton value="isNew" disabled={showAll !== null}>
            New
          </ToggleButton>
          <ToggleButton value="isLeaving" disabled={showAll !== null}>
            Leaving
          </ToggleButton>
          <ToggleButton value="isDonated">
            Donated
          </ToggleButton>
        </ToggleButtonGroup>
      </div>
    </Paper>
  )
}

export default Controls
