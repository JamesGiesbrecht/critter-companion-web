import { makeStyles, Paper, Typography } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  root: {
    padding: 15,
    display: 'inline-block',
  },
}))

const SignInPrompt = () => {
  const classes = useStyles()
  return (
    <Paper elevation={7} className={classes.root}>
      <Typography>Login or sign up to save and synchronize your donated critters</Typography>
    </Paper>
  )
}

export default SignInPrompt
