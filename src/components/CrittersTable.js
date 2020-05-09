import React from 'react'
import { TableContainer, Table, TableBody, makeStyles } from '@material-ui/core'
import EnhancedTableHead from './EnhancedTableHead'
import CritterRow from './CritterRow'

const useStyles = makeStyles((theme) => ({
  tableWrapper: {
    padding: '10px',
  },
  table: {
    margin: '0 auto',
    width: 'auto',
    borderTop: `1px solid var(--border-${theme.palette.type})`,
  },
  critterImgCell: {
    padding: '0 10px',
  },
  critterImg: {
    width: '40px',
  },
}))

const CrittersTable = ({ critters, isNorthern, obtainedCritters, setObtainedCritters }) => {
  const classes = useStyles()

  const amOrPM = (hour) => {
    if (hour > 12 && hour < 24) {
      return `${hour - 12}pm`
    } if (hour < 12 && hour > 0) {
      return `${hour}am`
    } if (hour === 12) {
      return 'Noon'
    } if (hour === 24) {
      return 'Midnight'
    }
    throw Error(`Hour (${hour}) not in range (1-24)`)
  }

  const getHours = (startTime, endTime) => {
    if (Array.isArray(startTime)) {
      let hours = ''
      startTime.forEach((start, index) => {
        if (index > 0) {
          hours += ' & '
        }
        hours += `${amOrPM(start)} - ${amOrPM(endTime[index])}`
      })
      return hours
    } if (startTime === endTime) {
      return 'All Day'
    }
    return `${amOrPM(startTime)} - ${amOrPM(endTime)}`
  }

  const rows = critters.map((critter) => {
    const hours = getHours(critter.start_time, critter.end_time)
    return (
      <CritterRow
        key={critter.name}
        critter={critter}
        obtainedCritters={obtainedCritters}
        setObtainedCritters={setObtainedCritters}
        isNorthern={isNorthern}
        hours={hours}
      />
    )
  })

  return (
    <TableContainer className={classes.tableWrapper}>
      <Table
        className={classes.table}
        size="small"
        aria-labelledby="tableTitle"
        aria-label="enhanced table"
      >
        <EnhancedTableHead />
        <TableBody>
          {rows}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default CrittersTable
