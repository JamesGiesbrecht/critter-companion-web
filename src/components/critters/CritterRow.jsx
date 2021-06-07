import { memo, useRef, useState } from 'react'
import clsx from 'clsx'
import { TableRow, TableCell, makeStyles, Typography, Button } from '@material-ui/core'
import useFiltersStore, { Statuses } from 'store/filtersStore'
import CritterInfo from 'components/critters/CritterInfo'
import Months from 'components/critters/Months'
import BlathersIcon from 'components/icons/BlathersIcon'
import { dot, hidden } from 'assets/cssClasses'
import { FishSizes } from 'constants/AppConstants'
import { useApi } from 'context/Api'

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
  },
  hiddenMd: {
    [theme.breakpoints.down('md')]: {
      ...hidden,
    },
  },
}))

const CritterRow = ({ critter, hours }) => {
  const classes = useStyles()
  const isDonated = useFiltersStore((state) => state.donated[critter.id])
  const { donatedRef } = useApi()
  const [dialogOpen, setDialogOpen] = useState(false)
  const nameButtonRef = useRef()

  const handleDialogOpen = (e) => {
    // Clicking the donate toggle
    if (
      nameButtonRef.current &&
      (nameButtonRef.current === e.target || nameButtonRef.current.contains(e.target))
    ) {
      return
    }
    setDialogOpen(true)
  }

  const handleDialogClose = () => {
    window.setTimeout(() => {
      setDialogOpen(false)
    }, 100)
  }
  const handleDonatedCheck = () => donatedRef.update({ [critter.id]: !isDonated })

  const nameButton = (includeRef) => {
    const ref = includeRef ? { ref: nameButtonRef } : {}
    return (
      <Button
        className={clsx(classes.name, !isDonated && classes.notDonated)}
        color="inherit"
        startIcon={
          <BlathersIcon className={clsx(classes.blathers, isDonated && classes.donated)} />
        }
        onClick={handleDonatedCheck}
        {...ref}>
        <Typography component="span">
          {critter.name}
          {critter[Statuses.New] && <span className={clsx(classes.dot, classes.new)} />}
          {critter[Statuses.Leaving] && <span className={clsx(classes.dot, classes.leaving)} />}
          {critter[Statuses.Incoming] && <span className={clsx(classes.dot, classes.incoming)} />}
        </Typography>
      </Button>
    )
  }

  return (
    <TableRow hover type="button" onClick={handleDialogOpen}>
      <TableCell className={clsx(classes.critterImgCell, classes.cell)}>
        <img className={classes.critterImg} src={critter.image_path} alt={critter.name} />
      </TableCell>
      <TableCell className={clsx(classes.nameWrapper, classes.cell)}>{nameButton(true)}</TableCell>
      <TableCell className={classes.cell} align="right">
        {critter.value}
      </TableCell>
      <TableCell className={clsx(classes.cell, classes.location)} align="right">
        {critter.location}
      </TableCell>
      {critter.size && (
        <TableCell className={clsx(classes.cell, classes.hiddenMd)} align="right">
          {FishSizes[critter.size] || critter.size}
        </TableCell>
      )}
      <TableCell className={clsx(classes.hours, classes.cell)} align="right">
        {hours}
      </TableCell>
      <TableCell className={clsx(classes.months, classes.hiddenMd, classes.cell)} align="right">
        <Months months={critter.months} />
      </TableCell>
      <CritterInfo
        critter={critter}
        dialogOpen={dialogOpen}
        handleDialogClose={handleDialogClose}
        nameButton={nameButton(false)}
        isDonated={isDonated}
        handleDonatedCheck={handleDonatedCheck}
        hours={hours}
      />
    </TableRow>
  )
}

export default memo(CritterRow)
