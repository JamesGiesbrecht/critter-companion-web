import { FC, SyntheticEvent, useState } from 'react'
import { Critter, Hour } from '@james-giesbrecht/critter-companion-utility'

import { TableHeadCell, Order } from 'typescript/types'

import { TableContainer, Table, TableBody, makeStyles } from '@material-ui/core'
import CritterRow from 'components/critters/CritterRow'
import CritterTableHead from 'components/critters/CritterTableHead'

interface Props {
  critters: Critter[]
}

const useStyles = makeStyles((theme) => ({
  tableWrapper: {
    padding: '10px',
    [theme.breakpoints.down('sm')]: {
      padding: 0,
    },
  },
  table: {
    margin: '0 auto',
    width: '100%',
    borderTop: `1px solid var(--border-${theme.palette.mode})`,
  },
  critterImgCell: {
    padding: '0 10px',
  },
  critterImg: {
    width: '40px',
  },
}))

const descendingComparator = <T extends {}>(a: T, b: T, orderBy: keyof T) => {
  if (b[orderBy] < a[orderBy]) {
    return -1
  }
  if (b[orderBy] > a[orderBy]) {
    return 1
  }
  return 0
}

const getComparator = <Key extends keyof any>(order: Order, orderBy: Key) =>
  order === 'desc'
    ? (a: any, b: any) => descendingComparator(a, b, orderBy)
    : (a: any, b: any) => -descendingComparator(a, b, orderBy)

const stableSort = <T extends {}>(array: readonly T[], comparator: (a: T, b: T) => number) => {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number])
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0])
    if (order !== 0) return order
    return a[1] - b[1]
  })
  return stabilizedThis.map((el) => el[0])
}

const CrittersTable: FC<Props> = ({ critters }) => {
  const classes = useStyles()
  const [order, setOrder] = useState<Order>('asc')
  const [orderBy, setOrderBy] = useState<keyof Critter>('name')

  const amOrPM = (hour: Hour) => {
    if (hour > 12 && hour < 24) {
      return `${hour - 12}pm`
    }
    if (hour < 12 && hour > 0) {
      return `${hour}am`
    }
    if (hour === 12) {
      return 'Noon'
    }
    if (hour === 24) {
      return 'Midnight'
    }
    throw Error(`Hour (${hour}) not in range (1-24)`)
  }

  const getHours = (startTime: Hour | Hour[], endTime: Hour | Hour[]) => {
    if (Array.isArray(startTime)) {
      let hours = ''
      startTime.forEach((start, index) => {
        if (index > 0) {
          hours += ' & '
        }
        if (Array.isArray(endTime)) {
          hours += `${amOrPM(start)} - ${amOrPM(endTime[index])}`
        }
      })
      return hours
    }
    if (startTime === endTime) {
      return 'All Day'
    }
    return `${amOrPM(startTime)} - ${amOrPM(endTime as Hour)}`
  }

  const handleSortRequest = (event: SyntheticEvent, property: keyof Critter) => {
    const isAsc = orderBy === property && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(property)
  }

  const showSizeColumn = critters.some((critter) => critter.size)

  const headCells: Array<TableHeadCell | null> = [
    { id: 'name', align: 'center', label: 'Name' },
    { id: 'value', align: 'right', label: 'Price' },
    { id: 'location', hidden: 'sm', align: 'right', label: 'Location' },
    showSizeColumn ? { id: 'size', hidden: 'md', align: 'right', label: 'Size' } : null,
    { id: 'startTime', hidden: 'sm', align: 'right', label: 'Active Hours' },
    { id: 'months', hidden: 'md', align: 'right', label: 'Active Months' },
  ]

  const rows = stableSort(critters, getComparator(order, orderBy)).map((critter: Critter) => {
    const hours = getHours(critter.startTime, critter.endTime)
    return (
      <CritterRow
        key={critter.name}
        critter={critter}
        hours={hours}
        showSizeColumn={showSizeColumn}
      />
    )
  })

  return (
    <TableContainer className={classes.tableWrapper}>
      <Table className={classes.table}>
        <CritterTableHead
          headCells={headCells}
          order={order}
          orderBy={orderBy}
          onSortRequest={handleSortRequest}
        />
        <TableBody>{rows}</TableBody>
      </Table>
    </TableContainer>
  )
}

export default CrittersTable
