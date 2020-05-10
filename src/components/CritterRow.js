import React, { useState } from 'react'
import { TableRow, TableCell, makeStyles, Typography } from '@material-ui/core'
import blathersLogo from '../assets/images/blathersLogo.svg'
import Months from './Months'
import { dot, hidden } from '../assets/cssClasses'

const useStyles = makeStyles((theme) => ({
  cell: {
    padding: '8px',
  },
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
  },
  notDonated: {
    '&:hover': {
      '& img': {
        filter: `${theme.palette.type === 'dark' ? 'invert(100%)' : ''} opacity(50%)`,
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
  },
  dot,
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
    [theme.breakpoints.down('sm')]: {
      ...hidden,
    },
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
    <TableRow hover>
      <TableCell classesName={[classes.critterImgCell, classes.cell].join(' ')}>
        <img className={classes.critterImg} src={critter.image_path} alt={critter.name} />
      </TableCell>
      <TableCell
        className={[classes.nameWrapper, classes.cell, isDonated ? classes.donated : classes.notDonated].join(' ')}
        onClick={() => handleDonatedCheck(critter.name)}
        onKeyPress={() => handleDonatedCheck(critter.name)}
        role="button"
      >
        <div className={classes.name}>
          <img
            src={blathersLogo}
            alt="Donated"
          />
          <span>
            <Typography component="span">{critter.name}</Typography>
            {critter.isNew && <span className={[classes.dot, classes.new].join(' ')} /> }
            {critter.isLeaving && <span className={[classes.dot, classes.leaving].join(' ')} />}
          </span>
        </div>
      </TableCell>
      <TableCell className={classes.cell} align="right">{critter.value}</TableCell>
      <TableCell className={classes.cell} align="right">{critter.location}</TableCell>
      <TableCell className={[classes.hours, classes.cell].join(' ')} align="right">{hours}</TableCell>
      <TableCell className={[classes.months, classes.cell].join(' ')} align="right"><Months months={isNorthern ? critter.northern_months : critter.southern_months} /></TableCell>
    </TableRow>
  )
}

export default CritterRow
