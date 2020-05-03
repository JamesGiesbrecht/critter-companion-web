import React from 'react'
import EnhancedTableHead from './EnhancedTableHead'
import { TableContainer, Table, TableBody, TableRow, TableCell, makeStyles } from '@material-ui/core'

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
  return (
    <TableContainer className={classes.tableWrapper}>
      <Table
        className={classes.table}
        aria-labelledby="tableTitle"
        aria-label="enhanced table"
      >
        <EnhancedTableHead

        />
        <TableBody>
          {critters.map((critter, index) => (
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
              <TableCell align="right">{critter.price}</TableCell>
              <TableCell align="right">{critter.location}</TableCell>
              <TableCell align="right">{critter.start_time}</TableCell>
              <TableCell align="right">{critter.northern_months}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default CrittersTable
