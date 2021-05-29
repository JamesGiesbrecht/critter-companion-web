import { useState } from 'react'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  makeStyles,
} from '@material-ui/core'
import { firebaseAuth } from 'firebase/config'
import Form from 'components/common/Form'

const useStyles = makeStyles((theme) => ({
  formActions: { display: 'flex', flexDirection: 'column' },
}))

const inputs = {
  email: {
    label: 'Email',
    type: 'email',
    validation: {
      required: true,
      isEmail: true,
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

const forms = {
  login: {
    type: 'login',
    title: 'Welcome Back',
    submitText: 'Login',
    inputs: { email: inputs.email, password: inputs.password },
    onSubmit: firebaseAuth.signInWithEmailAndPassword,
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
    onSubmit: firebaseAuth.createUserWithEmailAndPassword,
  },
  forgotPassword: {
    type: 'forgotPassword',
    title: 'Forgot Password',
    submitText: 'Send Password Reset Email',
    inputs: { email: inputs.email },
    onSubmit: firebaseAuth.sendPasswordResetEmail,
  },
}

const LoginSignUpForm = () => {
  const classes = useStyles()
  const [activeForm, setActiveForm] = useState<any>()

  const handleClose = () => setActiveForm(undefined)

  const toggleState = () => {
    setActiveForm((prev: any) => (prev.type === 'login' ? forms.signUp : forms.login))
  }

  return (
    <>
      <Button variant="contained" onClick={() => setActiveForm(forms.login)}>
        Login
      </Button>
      <Button variant="contained" onClick={() => setActiveForm(forms.signUp)}>
        Sign Up
      </Button>
      <Dialog open={Boolean(activeForm)} onClose={handleClose} aria-labelledby={activeForm?.type}>
        {activeForm && (
          <>
            <DialogTitle id={activeForm.type}>{activeForm.title}</DialogTitle>
            <DialogContent>
              <Form
                inputs={activeForm.inputs}
                type={activeForm.type}
                onSubmit={activeForm.onSubmit}
              />
            </DialogContent>
            <DialogActions className={classes.formActions}>
              <Button onClick={activeForm.onSubmit} color="primary" size="large">
                {activeForm.submitText}
              </Button>
              <Button onClick={toggleState} size="small" color="inherit">
                {`Switch to ${activeForm.type === 'login' ? 'Sign Up' : 'Login'}`}
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </>
  )
}

export default LoginSignUpForm
