import { makeStyles } from '@material-ui/core'
import ExpandMore from '@material-ui/icons/ExpandMore'
import clsx from 'clsx'

const useStyles = makeStyles(() => ({
  closed: {
    transform: 'rotate(0deg)',
    transition: 'transform 0.2s linear',
  },
  open: {
    transform: 'rotate(180deg)',
    transition: 'transform 0.2s linear',
  },
}))

const ExpandMoreIcon = (props: any) => {
  const classes = useStyles()
  const { expand, ...other } = props
  return <ExpandMore className={clsx(classes.closed, !expand && classes.open)} {...other} />
}

export default ExpandMoreIcon
