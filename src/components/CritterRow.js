import React, { useState } from 'react'
import {
  TableRow, TableCell, makeStyles, Typography,
} from '@material-ui/core'
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
    '& img': {
      height: '1.5em',
      marginRight: '3px',
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
}))

const CritterRow = ({
  critter, obtainedCritters, setObtainedCritters, isNorthern, hours,
}) => {
  const classes = useStyles()
  const [isDonated, setIsDonated] = useState(obtainedCritters.includes(critter.name))

  const handleObtainedCheck = (critterName) => {
    const critterIndex = obtainedCritters.indexOf(critterName)
    setIsDonated((prevChecked) => !prevChecked)
    if (critterIndex > -1) {
      setObtainedCritters((prevCritters) => {
        prevCritters.splice(critterIndex, 1)
        return prevCritters
      })
    } else {
      setObtainedCritters((prevCritters) => prevCritters.concat([critterName]))
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
        className={[classes.nameWrapper, isDonated ? classes.donated : ''].join(' ')}
        onClick={() => handleObtainedCheck(critter.name)}
        onKeyPress={() => handleObtainedCheck(critter.name)}
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
      <TableCell align="right">{hours}</TableCell>
      <TableCell align="right"><Months months={isNorthern ? critter.northern_months : critter.southern_months} /></TableCell>
    </TableRow>
  )
}

export default CritterRow
