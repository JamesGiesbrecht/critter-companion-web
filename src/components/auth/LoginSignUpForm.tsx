import { SyntheticEvent, useState } from 'react'
import { useAuth } from 'context/Auth'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Link,
  makeStyles,
} from '@material-ui/core'
import { LoadingButton } from '@material-ui/lab'
import Form from 'components/common/Form'

const useStyles = makeStyles((theme) => ({
  dialogPaper: {
    width: 500,
    margin: theme.spacing(1),
  },
  formActions: { display: 'flex', flexDirection: 'column' },
}))

const inputs = {
  email: {
    label: 'Email',
    type: 'email',
    validation: {
      required: true,
      email: true,
    },
  },
  password: {
    label: 'Password',
    type: 'password',
    validation: {
      required: true,
      minLength: 6,
    },
  },
  confirmPassword: {
    label: 'Confirm Password',
    type: 'password',
    validation: {
      required: true,
      matches: { name: 'password' },
      minLength: 6,
    },
  },
}

const LoginSignUpForm = () => {
  const classes = useStyles()
  const [activeFormName, setActiveFormName] =
    useState<'login' | 'signUp' | 'forgotPassword' | undefined>()
  const [isLoading, setIsLoading] = useState(false)
  const auth = useAuth()

  const forgotPasswordLink = (
    // eslint-disable-next-line jsx-a11y/anchor-is-valid
    <Link
      component="button"
      type="button"
      variant="body1"
      color="secondary"
      onClick={() => setActiveFormName('forgotPassword')}>
      Forgot Password?
    </Link>
  )

  const forms = {
    login: {
      type: 'login',
      title: 'Welcome Back',
      submitText: 'Login',
      inputs: { email: inputs.email, password: { ...inputs.password, after: forgotPasswordLink } },
    },
    signUp: {
      type: 'signUp',
      title: 'New User Sign Up',
      submitText: 'Sign Up',
      inputs: {
        email: inputs.email,
        password: inputs.password,
        confirmPassword: inputs.confirmPassword,
      },
    },
    forgotPassword: {
      type: 'forgotPassword',
      title: 'Forgot Password',
      submitText: 'Send Password Reset Email',
      inputs: { email: inputs.email },
    },
  }

  const handleClose = () => setActiveFormName(undefined)

  const toggleState = () => {
    setActiveFormName((prev: any) => (prev === 'login' ? 'signUp' : 'login'))
  }

  const activeForm = activeFormName && forms[activeFormName]

  const handleSubmit = async (e: SyntheticEvent, form: any) => {
    console.log('Form is valid and submitting', form)
    let result
    const email = form.inputs.email.value
    try {
      setIsLoading(true)
      switch (activeFormName) {
        case 'login':
          result = await auth.login(email, form.inputs.email.value)
          break
        case 'signUp':
          result = await auth.signUp(email, form.inputs.email.value)
          break
        case 'forgotPassword':
          result = await auth.resetPassword(email)
          break
        default:
          throw new Error(`Invalid Submission Method: ${activeFormName}`)
      }
      console.log(result)
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <Button variant="contained" onClick={() => setActiveFormName('login')}>
        Login
      </Button>
      <Button variant="contained" onClick={() => setActiveFormName('signUp')}>
        Sign Up
      </Button>
      <Dialog
        classes={{ paper: classes.dialogPaper }}
        open={Boolean(activeForm)}
        onClose={handleClose}
        aria-labelledby={activeForm?.type}>
        {activeForm && (
          <>
            <DialogTitle id={activeForm.type}>{activeForm.title}</DialogTitle>
            <DialogContent>
              <Form inputs={activeForm.inputs} type={activeForm.type} onSubmit={handleSubmit}>
                <DialogActions className={classes.formActions}>
                  <LoadingButton loading={isLoading} type="submit" color="primary" size="large">
                    {activeForm.submitText}
                  </LoadingButton>
                  <Button
                    type="button"
                    size="small"
                    color="inherit"
                    disabled={isLoading}
                    onClick={toggleState}>
                    {`Switch to ${activeForm.type === 'login' ? 'Sign Up' : 'Login'}`}
                  </Button>
                  <Button type="button" onClick={() => console.log(auth.user)}>
                    Get user
                  </Button>
                  <Button
                    type="button"
                    onClick={async () => {
                      const result = await auth.logout()
                      console.log(result)
                    }}>
                    Logout
                  </Button>
                </DialogActions>
              </Form>
            </DialogContent>
          </>
        )}
      </Dialog>
    </>
  )
}

export default LoginSignUpForm
