import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles(() => ({
  absoluteCenter: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },
}))

const Centered = ({ children }: { children: any }) => {
  const classes = useStyles()
  return <div className={classes.absoluteCenter}>{children}</div>
}

export default Centered
