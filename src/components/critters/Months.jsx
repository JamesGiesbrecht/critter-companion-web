import { memo } from 'react'
import clsx from 'clsx'
import { Chip, makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  chip: {
    padding: '0',
    marginLeft: '2px',
    height: '18px',
    width: '28px',
    '& span': {
      fontSize: '.6em',
      textOverflow: 'clip',
      margin: '0 auto',
      padding: '0',
    },
  },
  green: {
    backgroundColor: theme.palette.success[theme.palette.mode === 'light' ? 'main' : 'light'],
    color: theme.palette.background.paper,
  },
}))

const Months = ({ months, className }) => {
  const allMonths = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ]
  const classes = useStyles()
  const chips = allMonths.map((month, index) => {
    const isActive = months.includes(index + 1)
    const color = isActive ? { color: 'primary' } : { disabled: true }
    return (
      <Chip
        className={clsx(classes.chip, className)}
        classes={{ colorPrimary: classes.green }}
        key={month}
        size="small"
        label={month}
        {...color}
      />
    )
  })

  return chips
}

export default memo(Months)
