import { memo, FC } from 'react'
import clsx from 'clsx'
import { Chip, makeStyles } from '@material-ui/core'
import { Month } from 'typescript/types'

interface Props {
  months: Month[]
  className?: string
}

const useStyles = makeStyles((theme) => ({
  chip: {
    padding: '0',
    marginLeft: '2px',
    height: '18px',
    width: '28px',
    '& span': {
      fontSize: '.8em',
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

const Months: FC<Props> = ({ months, className }) => {
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
    const isActive = months.includes((index + 1) as Month)
    return (
      <Chip
        className={clsx(classes.chip, className)}
        classes={{ colorPrimary: classes.green }}
        key={month}
        size="small"
        label={month}
        color={isActive ? 'primary' : 'default'}
        disabled={!isActive}
      />
    )
  })

  return <>{chips}</>
}

export default memo(Months)
