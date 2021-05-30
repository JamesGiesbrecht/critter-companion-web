import { SyntheticEvent, useEffect, useState } from 'react'
import { useAuth } from 'context/Auth'
import { AuthError } from 'firebase/error'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Link,
  makeStyles,
  Typography,
} from '@material-ui/core'
import { LoadingButton } from '@material-ui/lab'
import Form from 'components/common/Form'
import AccountButton from 'components/auth/AccountButton'

type FormType = 'login' | 'signUp' | 'forgotPassword'

const useStyles = makeStyles((theme) => ({
  dialogPaper: {
    width: 600,
    margin: theme.spacing(1),
  },
  formActions: { display: 'flex', flexDirection: 'column' },
  submitError: {
    color: theme.palette.error.main,
  },
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
  const [activeFormName, setActiveFormName] = useState<FormType | undefined>()
  const [isLoading, setIsLoading] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const auth = useAuth()

  useEffect(() => {
    setSubmitError('')
  }, [activeFormName])

  const getFormLink = (formName: FormType, label: string) => (
    // eslint-disable-next-line jsx-a11y/anchor-is-valid
    <Link
      key={label}
      component="button"
      type="button"
      variant="body1"
      onClick={() => setActiveFormName(formName)}>
      {label}
    </Link>
  )

  const forms = {
    login: {
      type: 'login',
      title: 'Welcome Back',
      submitText: 'Login',
      inputs: {
        email: inputs.email,
        password: {
          ...inputs.password,
          after: getFormLink('forgotPassword', 'Forgot Password?'),
        },
      },
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
          result = await auth.login(email, form.inputs.password.value)
          break
        case 'signUp':
          result = await auth.signUp(email, form.inputs.password.value)
          break
        case 'forgotPassword':
          result = await auth.resetPassword(email)
          break
        default:
          throw new Error(`Invalid Submission Method: ${activeFormName}`)
      }
      setSubmitError('')
      console.log(result)
    } catch (error) {
      console.log(error)
      let errorMessage
      switch (error.code) {
        case AuthError.InvalidEmail:
          errorMessage = 'Please enter a valid email address.'
          break
        case AuthError.UserDisabled:
          errorMessage = `The account associated with ${email} has been disabled. Contact support for help with this issue.`
          break
        case AuthError.UserNotFound:
          errorMessage = [
            'An account with this email does not exist, did you mean to ',
            getFormLink('signUp', 'sign up.'),
          ]
          break
        case AuthError.WrongPassword:
          errorMessage = 'Incorrect password provided.'
          break
        case AuthError.EmailAlreadyInUse:
          errorMessage = [
            'An account already exists with this email, did you mean to ',
            getFormLink('login', 'login?'),
          ]
          break
        case AuthError.OperationNotAllowed:
        case AuthError.MissingContinueUri:
        case AuthError.MissingIOSBundleId:
        case AuthError.MissingAndroidPkgName:
        case AuthError.InvalidContinueUri:
        case AuthError.UnauthorizedContinueUri:
          errorMessage =
            'There is an error with the app configuration, please notify the administrator.'
          break
        case AuthError.WeakPassword:
          errorMessage = error.message
          break
        default:
          errorMessage = 'Something went wrong, try again later.'
      }
      setSubmitError(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      {auth.user ? (
        <AccountButton />
      ) : (
        <>
          <Button variant="contained" onClick={() => setActiveFormName('login')}>
            Login
          </Button>
          <Button variant="contained" onClick={() => setActiveFormName('signUp')}>
            Sign Up
          </Button>
        </>
      )}
      <Dialog
        classes={{ paper: classes.dialogPaper }}
        open={Boolean(activeForm)}
        onClose={handleClose}
        aria-labelledby={activeForm?.type}>
        {activeForm && (
          <>
            <DialogTitle id={activeForm.type}>{activeForm.title}</DialogTitle>
            <DialogContent>
              {submitError && (
                <Typography className={classes.submitError} align="center">
                  {submitError}
                </Typography>
              )}
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
