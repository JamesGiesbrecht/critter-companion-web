import { FC } from 'react'
import clsx from 'clsx'

import { makeStyles, SvgIconProps } from '@material-ui/core'
import ExpandMore from '@material-ui/icons/ExpandMore'

interface Props extends SvgIconProps {
  expand: boolean
}

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

const ExpandMoreIcon: FC<Props> = (props) => {
  const classes = useStyles()
  const { expand, ...other } = props
  return <ExpandMore className={clsx(classes.closed, !expand && classes.open)} {...other} />
}

export default ExpandMoreIcon
