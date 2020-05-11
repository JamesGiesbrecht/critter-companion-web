import React from 'react'
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
    backgroundColor: theme.palette.success[theme.palette.type === 'light' ? 'main' : 'light'],
    color: theme.palette.background.paper,
  },
}))

const Months = ({ months }) => {
  const allMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  const classes = useStyles()
  const chips = allMonths.map((month, index) => {
    const isActive = months.includes(index + 1)
    const color = isActive ? { color: 'primary' } : { disabled: true }
    return (
      <Chip
        className={classes.chip}
        classes={{ colorPrimary: classes.green }}
        key={month}
        size="small"
        label={month}
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...color}
      />
    )
  })

  return chips
}

export default Months
