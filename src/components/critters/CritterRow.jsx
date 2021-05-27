import { useRef, useState } from 'react'
import clsx from 'clsx'
import { TableRow, TableCell, makeStyles, Typography, Button } from '@material-ui/core'
import CritterInfo from 'components/critters/CritterInfo'
import Months from 'components/critters/Months'
import BlathersIcon from 'components/icons/BlathersIcon'
import { dot, hidden } from 'assets/cssClasses'

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
  const nameButtonRef = useRef()

  const handleModalOpen = (e) => {
    // Clicking the donate toggle
    if (nameButtonRef.current === e.target || nameButtonRef.current.contains(e.target)) {
      return
    }
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
    <TableCell className={classes.cell} align="right">
      {sizes[critter.size] || critter.size}
    </TableCell>
  ) : null

  return (
    <TableRow hover type="button" onClick={handleModalOpen}>
      <TableCell className={clsx(classes.critterImgCell, classes.cell)}>
        <img className={classes.critterImg} src={critter.image_path} alt={critter.name} />
      </TableCell>
      <TableCell className={clsx(classes.nameWrapper, classes.cell)}>
        <Button
          className={clsx(classes.name, !isDonated && classes.notDonated)}
          startIcon={
            <BlathersIcon className={clsx(classes.blathers, isDonated && classes.donated)} />
          }
          onClick={() => handleDonatedCheck(critter.name)}
          ref={nameButtonRef}>
          <Typography component="span">
            {critter.name}
            {critter.isNew && <span className={clsx(classes.dot, classes.new)} />}
            {critter.isLeaving && <span className={clsx(classes.dot, classes.leaving)} />}
            {critter.isIncoming && <span className={clsx(classes.dot, classes.incoming)} />}
          </Typography>
        </Button>
      </TableCell>
      <TableCell className={classes.cell} align="right">
        {critter.value}
      </TableCell>
      <TableCell className={clsx(classes.cell, classes.location)} align="right">
        {critter.location}
      </TableCell>
      {size}
      <TableCell className={clsx(classes.hours, classes.cell)} align="right">
        {hours}
      </TableCell>
      <TableCell className={clsx(classes.months, classes.cell)} align="right">
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
