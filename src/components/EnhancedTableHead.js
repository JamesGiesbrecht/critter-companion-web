import React from 'react'
import {
  TableHead, TableRow, TableCell, TableSortLabel,
} from '@material-ui/core'

const headCells = [
  {
    id: 'name', numeric: false, disablePadding: true, label: 'Name',
  },
  {
    id: 'obtained', numeric: false, disablePadding: true, label: 'Obtained',
  },
  {
    id: 'price', numeric: true, disablePadding: true, label: 'Price',
  },
  {
    id: 'location', numeric: true, disablePadding: true, label: 'Location',
  },
  {
    id: 'hours', numeric: true, disablePadding: true, label: 'Active Hours',
  },
  {
    id: 'months', numeric: true, disablePadding: true, label: 'Active Months',
  },
]

const EnhancedTableHead = ({
  classes, order, orderBy, numSelected, onRequestSort,
}) => {
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property)
  }

  return (
    <TableHead>
      <TableRow>
        <TableCell />
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding="none"
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  )
}

export default EnhancedTableHead
