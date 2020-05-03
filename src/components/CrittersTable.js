import React from 'react'
import { TableContainer, Table, TableBody, TableRow, TableCell, } from '@material-ui/core'
import critters from '../assets/data/critters.json'

const CrittersTable = () => {
  return (
    <TableContainer>
      <Table
        // className={classes.table}
        aria-labelledby="tableTitle"
        aria-label="enhanced table"
      >
        <TableBody>
          {critters.map((critter, index) => (
            <TableRow
              hover
              tabIndex={-1}
              key={critter.name}
            >
              <TableCell component="th" id={index} scope="critter" padding="none">
                {critter.name}
              </TableCell>
              <TableCell align="right">{critter.type}</TableCell>
              <TableCell align="right">{critter.location}</TableCell>
              <TableCell align="right">{critter.value}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default CrittersTable
