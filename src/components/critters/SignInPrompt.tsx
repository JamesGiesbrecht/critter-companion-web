import { makeStyles, Paper, Typography } from '@material-ui/core'
import FormLink from 'components/auth/FormLink'
import { FormType } from 'store'

const useStyles = makeStyles((theme) => ({
  root: {
    padding: 15,
    display: 'inline-block',
    [theme.breakpoints.down('sm')]: {
      display: 'block',
      borderRadius: 0,
    },
  },
}))

const SignInPrompt = () => {
  const classes = useStyles()
  return (
    <Paper elevation={7} className={classes.root}>
      <Typography>
        <FormLink to={FormType.Login}>Login</FormLink> or{' '}
        <FormLink to={FormType.SignUp}>sign up</FormLink> to save and synchronize your donated
        critters
      </Typography>
    </Paper>
  )
}

export default SignInPrompt
