import { useState, useEffect } from 'react'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@material-ui/core'
import { firebaseAuth } from 'firebase/config'

type ActiveForm = 'login' | 'sign up'

type FormInput = 'email' | 'password' | 'confirmPassword'

const defaultFormState = {
  email: {
    value: '',
    touched: false,
    error: '',
    validation: {
      required: true,
      email: true,
    },
  },
  password: {
    value: '',
    touched: false,
    error: '',
    validation: {
      required: true,
      matches: 'confirmPassword',
    },
  },
  confirmPassword: {
    value: '',
    touched: false,
    error: '',
    validation: {
      required: true,
      matches: 'password',
    },
  },
  formIsValid: false,
}

const LoginSignUpForm = () => {
  const [formState, setFormState] = useState(defaultFormState)
  const [activeForm, setActiveForm] = useState<ActiveForm | undefined>()
  const isLogin = activeForm === 'login'

  const handleClose = () => setActiveForm(undefined)

  useEffect(() => {
    setFormState(defaultFormState)
  }, [activeForm])

  const validateForm = () => {
    const emailRegex =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  }

  const handleInputUpdate = (name: FormInput, value: string) => {
    setFormState((prev) => ({
      ...prev,
      [name]: {
        ...prev[name],
        value,
      },
    }))
  }

  const handleSubmit = async () => {
    try {
      let result
      if (isLogin) {
        result = await firebaseAuth.signInWithEmailAndPassword(
          formState.email.value,
          formState.password.value,
        )
      } else {
        result = await firebaseAuth.createUserWithEmailAndPassword(
          formState.email.value,
          formState.password.value,
        )
      }
      console.log(result)
    } catch (e) {
      console.log(e)
      throw e
    }
  }

  const toggleState = () => setActiveForm((prev) => (prev === 'sign up' ? 'login' : 'sign up'))

  return (
    <>
      <Button variant="contained" onClick={() => setActiveForm('login')}>
        Login
      </Button>
      <Button variant="contained" onClick={() => setActiveForm('sign up')}>
        Sign Up
      </Button>
      <Dialog open={Boolean(activeForm)} onClose={handleClose} aria-labelledby={activeForm}>
        <DialogTitle id={activeForm}>{isLogin ? 'Login' : 'Sign Up'}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
            variant="filled"
            value={formState.email.value}
            onChange={(e) => handleInputUpdate('email', e.target.value)}
          />
          <TextField
            margin="dense"
            id="password"
            label="Password"
            type="password"
            fullWidth
            variant="filled"
            value={formState.password.value}
            onChange={(e) => handleInputUpdate('password', e.target.value)}
          />
          {!isLogin && (
            <TextField
              margin="dense"
              id="confirmPassword"
              label="Confirm Password"
              type="password"
              fullWidth
              variant="filled"
              value={formState.confirmPassword.value}
              onChange={(e) => handleInputUpdate('confirmPassword', e.target.value)}
            />
          )}
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'space-between', pl: 3, pr: 3 }}>
          <Button onClick={toggleState} size="large">
            {`Switch to ${isLogin ? 'Sign Up' : 'Login'}`}
          </Button>
          <Button onClick={handleSubmit} size="large">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default LoginSignUpForm
