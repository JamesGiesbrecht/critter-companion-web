import { FC, useState } from 'react'
import { TableContainer, Table, TableBody, makeStyles } from '@material-ui/core'
import EnhancedTableHead from 'components/critters/EnhancedTableHead'
import CritterRow from 'components/critters/CritterRow'

interface Props {
  [x: string]: any
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

const descendingComparator = (a: any, b: any, orderBy: any) => {
  if (b[orderBy] < a[orderBy]) {
    return -1
  }
  if (b[orderBy] > a[orderBy]) {
    return 1
  }
  return 0
}

const getComparator = (order: any, orderBy: any) =>
  order === 'desc'
    ? (a: any, b: any) => descendingComparator(a, b, orderBy)
    : (a: any, b: any) => -descendingComparator(a, b, orderBy)

const stableSort = (array: any, comparator: any) => {
  const stabilizedThis = array.map((el: any, index: any) => [el, index])
  stabilizedThis.sort((a: any, b: any) => {
    const order = comparator(a[0], b[0])
    if (order !== 0) return order
    return a[1] - b[1]
  })
  return stabilizedThis.map((el: any) => el[0])
}

const CrittersTable: FC<Props> = ({ critters }) => {
  const classes = useStyles()
  const [order, setOrder] = useState('asc')
  const [orderBy, setOrderBy] = useState('name')

  const amOrPM = (hour: number) => {
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

  const getHours = (startTime: any, endTime: any) => {
    if (Array.isArray(startTime)) {
      let hours = ''
      startTime.forEach((start, index) => {
        if (index > 0) {
          hours += ' & '
        }
        hours += `${amOrPM(start)} - ${amOrPM(endTime[index])}`
      })
      return hours
    }
    if (startTime === endTime) {
      return 'All Day'
    }
    return `${amOrPM(startTime)} - ${amOrPM(endTime)}`
  }

  const handleSortRequest = (event: any, property: any) => {
    const isAsc = orderBy === property && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(property)
  }

  const rows = stableSort(critters, getComparator(order, orderBy)).map((critter: any) => {
    const hours = getHours(critter.startTime, critter.endTime)
    return <CritterRow key={critter.name} critter={critter} hours={hours} />
  })

  return (
    <TableContainer className={classes.tableWrapper}>
      <Table className={classes.table}>
        <EnhancedTableHead
          order={order}
          orderBy={orderBy}
          onSortRequest={handleSortRequest}
          isFish={Boolean(critters[0].size)}
        />
        <TableBody>{rows}</TableBody>
      </Table>
    </TableContainer>
  )
}

export default CrittersTable
