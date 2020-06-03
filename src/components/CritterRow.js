import React, { useState } from 'react'
import { TableRow, TableCell, makeStyles, Typography } from '@material-ui/core'
import CritterInfo from './CritterInfo'
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
    },
  },
  blathers: {
    '& img': {
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
  incoming: {
    backgroundColor: theme.palette.info.light,
  },
  location: {
    [theme.breakpoints.down('xs')]: {
      ...hidden,
    },
  },
  hours: {
    boxSizing: 'content-box',
    width: '85px',
    [theme.breakpoints.down('xs')]: {
      ...hidden,
    },
  },
  months: {
    boxSizing: 'content-box',
    width: '180px',
    [theme.breakpoints.down('sm')]: {
      ...hidden,
    },
  },
}))

const sizes = {
  1: 'Tiny',
  2: 'Small',
  3: 'Medium',
  4: 'Large',
  5: 'x-Large',
  6: 'Huge',
}

const CritterRow = ({ critter, donatedCritters, setDonatedCritters, isNorthern, hours, isFish }) => {
  const classes = useStyles()
  const [isDonated, setIsDonated] = useState(donatedCritters.includes(critter.name))
  const [modalOpen, setModalOpen] = useState(false)

  const handleModalOpen = (e) => {
    if (e.target.dataset.name === 'name') return
    setModalOpen(true)
  }

  const handleModalClose = () => {
    window.setTimeout(() => {
      setModalOpen(false)
    }, 100)
  }

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

  const size = isFish
    ? (
      <TableCell className={[classes.cell].join(' ')} align="right">
        {sizes[critter.size] || critter.size}
      </TableCell>
    )
    : null

  return (
    <TableRow
      hover
      type="button"
      onClick={(e) => handleModalOpen(e)}
    >
      <TableCell className={[classes.critterImgCell, classes.cell].join(' ')}>
        <img className={classes.critterImg} src={critter.image_path} alt={critter.name} />
      </TableCell>
      <TableCell
        className={[classes.nameWrapper, classes.cell].join(' ')}
      >
        {/* eslint-disable-next-line jsx-a11y/interactive-supports-focus */}
        <div
          className={[classes.name, classes.blathers, isDonated ? classes.donated : classes.notDonated].join(' ')}
          onClick={() => handleDonatedCheck(critter.name)}
          onKeyPress={() => handleDonatedCheck(critter.name)}
          role="button"
          data-name="name"
        >
          <img
            src={blathersLogo}
            alt="Donated"
            data-name="name"
          />
          <Typography
            component="span"
            data-name="name"
          >
            {critter.name}
            {critter.isNew && <span className={[classes.dot, classes.new].join(' ')} /> }
            {critter.isLeaving && <span className={[classes.dot, classes.leaving].join(' ')} />}
            {critter.isIncoming && <span className={[classes.dot, classes.incoming].join(' ')} />}
          </Typography>
        </div>
      </TableCell>
      <TableCell className={classes.cell} align="right">
        {critter.value}
      </TableCell>
      <TableCell className={[classes.cell, classes.location].join(' ')} align="right">
        {critter.location}
      </TableCell>
      {size}
      <TableCell className={[classes.hours, classes.cell].join(' ')} align="right">
        {hours}
      </TableCell>
      <TableCell className={[classes.months, classes.cell].join(' ')} align="right">
        <Months months={isNorthern ? critter.northern_months : critter.southern_months} />
      </TableCell>
      <CritterInfo
        critter={critter}
        modalOpen={modalOpen}
        handleModalClose={handleModalClose}
        parentClasses={classes}
        isDonated={isDonated}
        handleDonatedCheck={handleDonatedCheck}
        isNorthern={isNorthern}
        hours={hours}
      />
    </TableRow>
  )
}

export default CritterRow
