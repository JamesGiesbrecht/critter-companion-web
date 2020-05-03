import React, { useState } from 'react'
import EnhancedTableHead from './EnhancedTableHead'
import { Collapse, TableContainer, Table, TableBody, TableRow, TableCell, makeStyles } from '@material-ui/core'
import Months from './Months'

const useStyles = makeStyles({
  tableWrapper: {
    padding: '10px',
  },
  table: {
    margin: '0 auto',
    width: 'auto',
  },
  critterImgCell: {
    padding: '0 10px',
  },
  critterImg: {
    width: '40px',
  }
})

const CrittersTable = ({ critters }) => {
  const classes = useStyles()
  const [expanded, setExpanded] = useState(false)

  const amOrPM = (hour) => {
    if (hour > 12 && hour < 24) {
      return `${hour - 12}pm`
    } else if (hour < 12 && hour > 0) {
      return `${hour}am`
    } else if (hour === 12) {
      return 'Noon'
    } else if (hour === 24) {
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
    } else if (startTime === endTime) {
      return 'All Day'
    }
    return `${amOrPM(startTime)} - ${amOrPM(endTime)}`
  }

  const rows = critters.map((critter, index) => {
    const hours = getHours(critter.start_time, critter.end_time)
    return (
      <TableRow
        hover
        tabIndex={-1}
        key={critter.name}
      >
        <TableCell classes={{ root: classes.critterImgCell }}>
          <img className={classes.critterImg} src={critter.image_path} alt={critter.name} />
        </TableCell>
        <TableCell component="th" id={index} scope="critter" padding="none">
          {critter.name}
        </TableCell>
        <TableCell align="right">{critter.value}</TableCell>
        <TableCell align="right">{critter.location}</TableCell>
        <TableCell align="right">{hours}</TableCell>
        <TableCell align="right"><Months months={critter.northern_months} /></TableCell>
      </TableRow>
    )
  })

  return (
    <>
      <button onClick={() => setExpanded(!expanded)}>Collapsed</button>
      <Collapse in={expanded}>
        <TableContainer className={classes.tableWrapper}>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            aria-label="enhanced table"
          >
            <EnhancedTableHead

            />
            <TableBody>
              {rows}
            </TableBody>
          </Table>
        </TableContainer>
      </Collapse>
    </>
  )
}

export default CrittersTable
