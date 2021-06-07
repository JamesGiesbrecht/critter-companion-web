import { makeStyles, Paper, Typography, Link } from '@material-ui/core'
import useFiltersStore, { FormType } from 'store/filtersStore'

const useStyles = makeStyles((theme) => ({
  root: {
    padding: 15,
    display: 'inline-block',
  },
}))

const SignInPrompt = () => {
  const classes = useStyles()
  const setActiveForm = useFiltersStore((state: any) => state.setActiveForm)
  return (
    <Paper elevation={7} className={classes.root}>
      <Typography>
        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
        <Link
          component="button"
          type="button"
          variant="body1"
          onClick={() => setActiveForm(FormType.Login)}>
          Login
        </Link>
        {' or '}
        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
        <Link
          component="button"
          type="button"
          variant="body1"
          onClick={() => setActiveForm(FormType.SignUp)}>
          sign up
        </Link>
        {' to save and synchronize your donated critters'}
      </Typography>
    </Paper>
  )
}

export default SignInPrompt
