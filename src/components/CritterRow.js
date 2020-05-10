import React, { useState } from 'react'
import { TableRow, TableCell, makeStyles, Typography } from '@material-ui/core'
import blathersLogo from '../assets/images/blathersLogo.svg'
import Months from './Months'

const useStyles = makeStyles((theme) => ({
  critterImgCell: {
    padding: '0 10px',
  },
  critterImg: {
    width: '40px',
  },
  status: {
    display: 'flex',
    flexDirection: 'column',
  },
  nameWrapper: {
    paddingLeft: '0',
    '& img': {
      height: '1.5em',
      marginRight: '5px',
      verticalAlign: 'top',
      display: 'inline',
      filter: `${theme.palette.type === 'dark' ? 'invert(100%)' : ''} opacity(20%)`,
    },
    '&:hover': {
      '& img': {
        filter: `${theme.palette.type === 'dark' ? 'invert(100%)' : ''} opacity(100%)`,
      },
    },
  },
  donated: {
    '& img': {
      filter: `${theme.palette.type === 'dark' ? 'invert(100%)' : ''} opacity(100%)`,
    },
  },
  name: {
    display: 'flex',
    alignItems: 'center',
    whiteSpace: 'nowrap',
  },
  dot: {
    height: '.75em',
    width: '.75em',
    backgroundColor: '#000',
    borderRadius: '50%',
    display: 'inline-block',
    marginLeft: '5px',
  },
  new: {
    backgroundColor: theme.palette.success.light,
  },
  leaving: {
    backgroundColor: theme.palette.error.light,
  },
  hours: {
    boxSizing: 'content-box',
    width: '85px',
  },
  months: {
    boxSizing: 'content-box',
    width: '180px',
  },
}))

const CritterRow = ({ critter, donatedCritters, setDonatedCritters, isNorthern, hours }) => {
  const classes = useStyles()
  const [isDonated, setIsDonated] = useState(donatedCritters.includes(critter.name))

  const handleDonatedCheck = (critterName) => {
    const critterIndex = donatedCritters.indexOf(critterName)
    setIsDonated((prevChecked) => !prevChecked)
    if (critterIndex > -1) {
      setDonatedCritters((prevCritters) => {
        prevCritters.splice(critterIndex, 1)
        return prevCritters
      })
    } else {
      setDonatedCritters((prevCritters) => prevCritters.concat([critterName]))
    }
  }

  return (
    <TableRow
      hover
      tabIndex={-1}
      key={critter.name}
    >
      <TableCell classes={{ root: classes.critterImgCell }}>
        <img className={classes.critterImg} src={critter.image_path} alt={critter.name} />
      </TableCell>
      <TableCell
        className={[classes.nameWrapper, isDonated ? classes.donated : classes.notDonated].join(' ')}
        onClick={() => handleDonatedCheck(critter.name)}
        onKeyPress={() => handleDonatedCheck(critter.name)}
        role="button"
        tabIndex={0}
      >
        <div className={classes.name}>
          <img
            src={blathersLogo}
            alt="Donated"
          />
          <Typography component="span" noWrap>{critter.name}</Typography>
          {critter.isNew && <span className={[classes.dot, classes.new].join(' ')} /> }
          {critter.isLeaving && <span className={[classes.dot, classes.leaving].join(' ')} />}
        </div>
      </TableCell>
      <TableCell align="right">{critter.value}</TableCell>
      <TableCell align="right">{critter.location}</TableCell>
      <TableCell className={classes.hours} align="right">{hours}</TableCell>
      <TableCell className={classes.months} align="right"><Months months={isNorthern ? critter.northern_months : critter.southern_months} /></TableCell>
    </TableRow>
  )
}

export default CritterRow
