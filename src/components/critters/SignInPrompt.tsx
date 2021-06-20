import { FormType } from 'typescript/enums'

import { makeStyles, Typography } from '@material-ui/core'
import FormLink from 'components/auth/FormLink'
import CustomPaper from 'components/ui/CustomPaper'

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
    <CustomPaper className={classes.root}>
      <Typography>
        <FormLink to={FormType.Login}>Login</FormLink> or{' '}
        <FormLink to={FormType.SignUp}>sign up</FormLink> to save and synchronize your donated
        critters
      </Typography>
    </CustomPaper>
  )
}

export default SignInPrompt
