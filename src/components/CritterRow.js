import React, { useState } from 'react'
import {
  TableRow, TableCell, makeStyles, Typography,
} from '@material-ui/core'
import Months from './Months'
import blathersLogo from '../assets/images/blathersLogo.svg'
import AddCircle from '@material-ui/icons/AddCircle'
import RemoveCircle from '@material-ui/icons/RemoveCircle'

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
  blathers: {
    height: '1.5em',
    marginRight: '3px',
    verticalAlign: 'top',
    display: 'inline',
    filter: `${theme.palette.type === 'dark' ? 'invert(100%)' : ''} opacity(20%)`,
    '&:hover': {
      filter: `${theme.palette.type === 'dark' ? 'invert(100%)' : ''} opacity(100%)`,
    },
  },
  donated: {
    filter: `${theme.palette.type === 'dark' ? 'invert(100%)' : ''} opacity(100%)`,
  },
  name: {
    display: 'flex',
    alignItems: 'center',
    whiteSpace: 'nowrap',
  },
  icons: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: '3px',
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
      <TableCell>
        <div className={classes.name}>
          <div
            className={classes.nameWrapper}
            onClick={() => handleObtainedCheck(critter.name)}
            onKeyPress={() => handleObtainedCheck(critter.name)}
            role="button"
            tabIndex={0}
          >
            <img
              src={blathersLogo}
              className={[classes.blathers, isDonated ? classes.donated : ''].join(' ')}
              alt="Donated"
            />
            <Typography component="span" noWrap>{critter.name}</Typography>
          </div>
          <div className={classes.icons}>
            {critter.isNew && <AddCircle color="primary" />}
            {critter.isLeaving && <RemoveCircle color="secondary" />}
          </div>
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
