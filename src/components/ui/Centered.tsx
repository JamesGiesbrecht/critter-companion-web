import { FC, ReactNode } from 'react'

import { makeStyles } from '@material-ui/core'

interface Props {
  relative?: boolean
  children: ReactNode
}

const useStyles = makeStyles((theme) => ({
  absoluteCenter: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },
  relativeCenter: {
    margin: theme.spacing(3),
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
  },
}))

const Centered: FC<Props> = ({ relative = false, children }) => {
  const classes = useStyles()
  return (
    <div className={relative ? classes.relativeCenter : classes.absoluteCenter}>{children}</div>
  )
}

export default Centered
