import { FC, ReactNode } from 'react'

import { makeStyles, Paper, PaperProps } from '@material-ui/core'
import clsx from 'clsx'

interface Props extends PaperProps {
  children: ReactNode
}

const useStyles = makeStyles((theme) => ({
  root: {
    [theme.breakpoints.down('sm')]: {
      borderRadius: 0,
    },
  },
}))

const CustomPaper: FC<Props> = (props) => {
  const cssClasses = useStyles()
  const { children, classes, ...other } = props
  return (
    <Paper
      classes={{ ...classes, root: clsx(classes?.root, cssClasses.root) }}
      elevation={7}
      {...other}>
      {children}
    </Paper>
  )
}

export default CustomPaper
