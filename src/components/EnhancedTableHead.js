import React from 'react'
import { TableHead, TableRow, TableCell, TableSortLabel, makeStyles } from '@material-ui/core'

const useStyles = makeStyles({
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
})

const headCells = [
  { id: 'name', numeric: false, align: 'center', label: 'Name' },
  { id: 'value', numeric: true, align: 'right', label: 'Price' },
  { id: 'location', numeric: false, align: 'right', label: 'Location' },
  { id: 'start_time', numeric: false, align: 'right', label: 'Active Hours' },
  { id: 'months', numeric: false, align: 'right', label: 'Active Months' },
]

const EnhancedTableHead = ({ order, orderBy, onSortRequest }) => {
  const classes = useStyles()
  const createSortHandler = (property) => (event) => {
    onSortRequest(event, property)
  }

  return (
    <TableHead>
      <TableRow>
        <TableCell />
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.align}
            padding="none"
            sortDirection={orderBy === headCell.id ? order : false}
          >
            {headCell.id !== 'months' ? (
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : 'asc'}
                onClick={createSortHandler(headCell.id)}
              >
                {headCell.label}
                {orderBy === headCell.id && (
                  <span className={classes.visuallyHidden}>
                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                  </span>
                )}
              </TableSortLabel>
            ) : headCell.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  )
}

export default EnhancedTableHead
