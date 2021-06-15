import { FC } from 'react'
import clsx from 'clsx'
import { hidden } from 'styles/cssClasses'
import {
  TableHead,
  TableRow,
  TableCell,
  TableSortLabel,
  makeStyles,
  TableCellProps,
} from '@material-ui/core'

interface Props {
  [x: string]: any
}

const useStyles = makeStyles((theme) => ({
  hidden,
  headers: {
    whiteSpace: 'nowrap',
  },
  hiddenSm: {
    [theme.breakpoints.down('sm')]: {
      ...hidden,
    },
  },
  hiddenMd: {
    [theme.breakpoints.down('md')]: {
      ...hidden,
    },
  },
}))

const headCells = [
  { id: 'name', numeric: false, align: 'center', label: 'Name' },
  { id: 'value', numeric: true, align: 'right', label: 'Price' },
  { id: 'location', hidden: 'sm', numeric: false, align: 'right', label: 'Location' },
  { id: 'size', hidden: 'md', numeric: true, align: 'right', label: 'Size' },
  { id: 'start_time', hidden: 'sm', numeric: false, align: 'right', label: 'Active Hours' },
  { id: 'months', hidden: 'md', numeric: false, align: 'right', label: 'Active Months' },
]

const EnhancedTableHead: FC<Props> = ({ order, orderBy, onSortRequest, isFish }) => {
  const classes = useStyles()
  const createSortHandler = (property: any) => (event: any) => {
    onSortRequest(event, property)
  }

  const headers = headCells.map((headCell) => {
    if (headCell.id === 'size' && !isFish) return null
    let label
    if (headCell.id === 'months') {
      label = headCell.label
    } else {
      label = (
        <TableSortLabel
          active={orderBy === headCell.id}
          direction={orderBy === headCell.id ? order : 'asc'}
          onClick={createSortHandler(headCell.id)}>
          {headCell.label}
          {orderBy === headCell.id && (
            <span className={classes.hidden}>
              {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
            </span>
          )}
        </TableSortLabel>
      )
    }

    return (
      <TableCell
        className={clsx(
          classes.headers,
          headCell.hidden === 'sm' && classes.hiddenSm,
          headCell.hidden === 'md' && classes.hiddenMd,
        )}
        key={headCell.id}
        align={headCell.align as TableCellProps['align']}
        sortDirection={orderBy === headCell.id ? order : false}>
        {label}
      </TableCell>
    )
  })

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
