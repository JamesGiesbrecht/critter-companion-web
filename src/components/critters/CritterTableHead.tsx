import { FC, SyntheticEvent } from 'react'
import clsx from 'clsx'

import { hidden } from 'styles/cssClasses'
import { Critter, TableHeadCell } from 'typescript/types'

import { TableHead, TableRow, TableCell, TableSortLabel, makeStyles } from '@material-ui/core'
import { Order } from 'components/critters/CrittersTable'

interface Props {
  headCells: Array<TableHeadCell | null>
  order: Order
  orderBy: keyof Critter
  onSortRequest: (e: SyntheticEvent, property: keyof Critter) => void
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

const CritterTableHead: FC<Props> = ({ headCells, order, orderBy, onSortRequest }) => {
  const classes = useStyles()
  const createSortHandler = (property: keyof Critter) => (event: SyntheticEvent) => {
    onSortRequest(event, property)
  }

  const headers = headCells.map((headCell) => {
    if (!headCell) return null
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
        align={headCell.align}
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

export default CritterTableHead
