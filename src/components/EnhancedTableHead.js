import React from 'react'
import { TableHead, TableRow, TableCell, TableSortLabel, makeStyles } from '@material-ui/core'
import { hidden } from '../assets/cssClasses'

const useStyles = makeStyles((theme) => ({
  hidden,
  headers: {
    whiteSpace: 'nowrap',
  },
  months: {
    [theme.breakpoints.down('sm')]: {
      ...hidden,
    },
  },
}))

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
            className={[classes.headers, headCell.id === 'months' ? classes.months : null].join(' ')}
            key={headCell.id}
            align={headCell.align}
            padding="default"
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
                  <span className={classes.hidden}>
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
