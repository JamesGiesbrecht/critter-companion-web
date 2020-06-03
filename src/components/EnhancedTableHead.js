import React from 'react'
import { TableHead, TableRow, TableCell, TableSortLabel, makeStyles } from '@material-ui/core'
import { hidden } from '../assets/cssClasses'

const useStyles = makeStyles((theme) => ({
  hidden,
  headers: {
    whiteSpace: 'nowrap',
  },
  location: {
    [theme.breakpoints.down('xs')]: {
      ...hidden,
    },
  },
  start_time: {
    [theme.breakpoints.down('xs')]: {
      ...hidden,
    },
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
  { id: 'size', numeric: true, align: 'right', label: 'Size' },
  { id: 'start_time', numeric: false, align: 'right', label: 'Active Hours' },
  { id: 'months', numeric: false, align: 'right', label: 'Active Months' },
]

const EnhancedTableHead = ({ order, orderBy, onSortRequest }) => {
  const classes = useStyles()
  const createSortHandler = (property) => (event) => {
    onSortRequest(event, property)
  }

  const headers = headCells.map((headCell) => (
    <TableCell
      className={[classes.headers, classes[headCell.id]].join(' ')}
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
  ))


  return (
    <TableHead>
      <TableRow>
        <TableCell />
        {headers}
      </TableRow>
    </TableHead>
  )
}

export default EnhancedTableHead
