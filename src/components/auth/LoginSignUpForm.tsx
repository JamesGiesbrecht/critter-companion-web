import { SyntheticEvent, useEffect, useState } from 'react'
import { useAuth } from 'context/Auth'
import useStore, { FormType } from 'store'
import { AuthError } from 'firebase/error'
import { Alert, Dialog, makeStyles, Slide, Snackbar } from '@material-ui/core'
import { Color } from '@material-ui/lab'
import FormLink from 'components/auth/FormLink'
import Login from 'components/auth/forms/Login'
import SignUp from 'components/auth/forms/SignUp'
import ForgotPassword from 'components/auth/forms/ForgotPassword'
import VerificationEmail from 'components/auth/forms/VerificationEmail'

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

export const authInputs = {
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
  const activeFormName = useStore<FormType | undefined>((state) => state.activeForm)
  const setActiveFormName = useStore((state) => state.setActiveForm)
  const [isLoading, setIsLoading] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const [snackbar, setSnackbar] = useState<{
    open: boolean
    content: string
    severity: Color | undefined
  }>({ open: false, content: '', severity: 'success' })
  const auth = useAuth()

  useEffect(() => {
    setSubmitError('')
  }, [activeFormName])

  const forms = {
    [FormType.Login]: Login,
    [FormType.SignUp]: SignUp,
    [FormType.ForgotPassword]: ForgotPassword,
    [FormType.VerificationEmail]: VerificationEmail,
  }

  const handleClose = () => setActiveFormName(undefined)

  const handleSnackbarClose = (event?: SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') return
    setSnackbar((prev) => ({ ...prev, open: false }))
  }

  const ActiveForm = activeFormName && forms[activeFormName]

  const handleSubmit = async (e: SyntheticEvent, form: any) => {
    let result
    try {
      setSubmitError('')
      setIsLoading(true)
      switch (activeFormName) {
        case FormType.Login:
          result = await auth.login(form.inputs.email.value, form.inputs.password.value)
          break
        case FormType.SignUp:
          result = await auth.signUp(form.inputs.email.value, form.inputs.password.value)
          await result.user?.sendEmailVerification()
          setActiveFormName(FormType.VerificationEmail)
          return
        case FormType.ForgotPassword:
          result = await auth.resetPassword(form.inputs.email.value)
          setSnackbar({
            open: true,
            content: 'Password reset email successfully sent',
            severity: 'success',
          })
          break
        case FormType.VerificationEmail:
          result = await auth.user?.sendEmailVerification()
          setSnackbar({
            open: true,
            content: 'Verification Email successfully sent',
            severity: 'success',
          })
          return
        default:
          throw new Error(`Invalid Submission Method: ${activeFormName}`)
      }
      setActiveFormName(undefined)
    } catch (error) {
      let errorMessage
      switch (error.code) {
        case AuthError.InvalidEmail:
          errorMessage = 'Please enter a valid email address.'
          break
        case AuthError.UserDisabled:
          errorMessage = `The account associated with ${form.inputs.email.value} has been disabled. Contact support for help with this issue.`
          break
        case AuthError.UserNotFound:
          errorMessage = (
            <>
              An account with this email does not exist, did you mean to{' '}
              <FormLink to={FormType.SignUp}>sign up.</FormLink>
            </>
          )
          break
        case AuthError.WrongPassword:
          errorMessage = 'Incorrect password provided.'
          break
        case AuthError.EmailAlreadyInUse:
          errorMessage = (
            <>
              An account already exists with this email, did you mean to{' '}
              <FormLink to={FormType.Login}>login?</FormLink>
            </>
          )
          break
        case AuthError.TooManyRequests:
          errorMessage = 'You have made too many requests, try again later.'
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
      <Dialog
        classes={{ paper: classes.dialogPaper }}
        open={Boolean(ActiveForm)}
        onClose={handleClose}>
        {ActiveForm && (
          <ActiveForm
            error={Boolean(submitError)}
            helperText={submitError}
            isLoading={isLoading}
            onSubmit={handleSubmit}
          />
        )}
      </Dialog>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        TransitionComponent={(props) => <Slide {...props} direction="up" />}>
        <Alert onClose={handleSnackbarClose} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.content}
        </Alert>
      </Snackbar>
    </>
  )
}

export default LoginSignUpForm
