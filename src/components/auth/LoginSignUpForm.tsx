import { SyntheticEvent, useState } from 'react'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Link,
  makeStyles,
} from '@material-ui/core'
import { firebaseAuth } from 'firebase/config'
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
      passwordMatch: true,
      minLength: 6,
    },
  },
}

const LoginSignUpForm = () => {
  const classes = useStyles()
  const [activeFormName, setActiveFormName] =
    useState<'login' | 'signUp' | 'forgotPassword' | undefined>()

  const forgotPasswordLink = (
    // eslint-disable-next-line jsx-a11y/anchor-is-valid
    <Link
      component="button"
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
      onSubmit: (email: string, password: string) =>
        firebaseAuth.signInWithEmailAndPassword(email, password),
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
      onSubmit: (email: string, password: string) =>
        firebaseAuth.createUserWithEmailAndPassword(email, password),
    },
    forgotPassword: {
      type: 'forgotPassword',
      title: 'Forgot Password',
      submitText: 'Send Password Reset Email',
      inputs: { email: inputs.email },
      onSubmit: (email: string) => firebaseAuth.sendPasswordResetEmail(email),
    },
  }

  const handleClose = () => setActiveFormName(undefined)

  const toggleState = () => {
    setActiveFormName((prev: any) => (prev === 'login' ? 'signUp' : 'login'))
  }

  const handleSubmit = (e: SyntheticEvent, form: any) => {
    console.log('Form is valid and submitting', form)
  }

  const activeForm = activeFormName && forms[activeFormName]
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
                  <Button type="submit" color="primary" size="large">
                    {activeForm.submitText}
                  </Button>
                  <Button onClick={toggleState} size="small" color="inherit">
                    {`Switch to ${activeForm.type === 'login' ? 'Sign Up' : 'Login'}`}
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
