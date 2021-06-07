import { CircularProgress, makeStyles, Paper } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  loadingPaper: {
    padding: theme.spacing(2),
  },
}))

const Loading = (props: any) => {
  const classes = useStyles()
  return (
    <Paper className={classes.loadingPaper} elevation={7}>
      <CircularProgress size={90} {...props} />
    </Paper>
  )
}

export default Loading
