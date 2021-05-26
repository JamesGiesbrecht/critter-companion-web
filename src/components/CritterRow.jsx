import { useState } from 'react'
import { TableRow, TableCell, makeStyles, Typography, Button } from '@material-ui/core'
import clsx from 'clsx'
import CritterInfo from './CritterInfo'
import Months from './Months'
import { dot, hidden } from '../assets/cssClasses'
import BlathersIcon from './icons/BlathersIcon'

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
    filter: 'opacity(20%)',
  },
  notDonated: {
    '&:hover': {
      '& svg': {
        filter: 'opacity(60%)',
      },
    },
  },
  donated: {
    filter: 'opacity(85%)',
  },
  name: {
    display: 'flex',
    alignItems: 'center',
    textTransform: 'none',
    color: theme.palette.text.primary,
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
    [theme.breakpoints.down('sm')]: {
      ...hidden,
    },
  },
  hours: {
    boxSizing: 'content-box',
    width: '85px',
    [theme.breakpoints.down('sm')]: {
      ...hidden,
    },
  },
  months: {
    boxSizing: 'content-box',
    width: '180px',
    [theme.breakpoints.down('md')]: {
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

const CritterRow = ({
  critter,
  donatedCritters,
  setDonatedCritters,
  isNorthern,
  hours,
  isFish,
}) => {
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

  const size = isFish ? (
    <TableCell className={[classes.cell].join(' ')} align="right">
      {sizes[critter.size] || critter.size}
    </TableCell>
  ) : null

  return (
    <TableRow hover type="button" onClick={(e) => handleModalOpen(e)}>
      <TableCell className={[classes.critterImgCell, classes.cell].join(' ')}>
        <img className={classes.critterImg} src={critter.image_path} alt={critter.name} />
      </TableCell>
      <TableCell className={[classes.nameWrapper, classes.cell].join(' ')}>
        <Button
          className={clsx(classes.name, !isDonated && classes.notDonated)}
          startIcon={
            <BlathersIcon className={clsx(classes.blathers, isDonated && classes.donated)} />
          }
          onClick={() => handleDonatedCheck(critter.name)}
          disableRipple>
          <Typography component="span" data-name="name">
            {critter.name}
            {critter.isNew && <span className={[classes.dot, classes.new].join(' ')} />}
            {critter.isLeaving && <span className={[classes.dot, classes.leaving].join(' ')} />}
            {critter.isIncoming && <span className={[classes.dot, classes.incoming].join(' ')} />}
          </Typography>
        </Button>
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
