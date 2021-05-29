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
    label: 'Email',
    name: 'email',
    touched: false,
    error: '',
    validation: {
      required: true,
      isEmail: true,
    },
  },
  password: {
    value: '',
    label: 'Password',
    name: 'password',
    touched: false,
    error: '',
    validation: {
      required: true,
    },
  },
  confirmPassword: {
    value: '',
    label: 'Confirm Password',
    name: 'confirmPassword',
    touched: false,
    error: '',
    validation: {
      required: true,
      passwordMatch: true,
    },
  },
}

const emailRegex =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

const LoginSignUpForm = () => {
  const [formState, setFormState] = useState<any>(defaultFormState)
  const [activeForm, setActiveForm] = useState<ActiveForm | undefined>()
  const isLogin = activeForm === 'login'

  const { email, password, confirmPassword } = formState

  const handleClose = () => setActiveForm(undefined)

  useEffect(() => {
    setFormState(defaultFormState)
  }, [activeForm])

  const inputIsValid = (name: FormInput, value?: any) => {
    // eslint-disable-next-line no-param-reassign
    if (!value) value = formState[name].value
    const { validation, label } = formState[name]
    const { required, passwordMatch, isEmail } = validation
    let error = ''
    if (required && !value) {
      error = `${label} cannot be empty`
    } else if (isEmail && !emailRegex.test(value.toLowerCase())) {
      error = 'Enter a valid email address'
    } else if (passwordMatch && value !== formState.password.value) {
      error = 'Passwords must match'
    } else if (name === 'password' && value === formState.confirmPassword.value) {
      setFormState((prev: any) => ({
        ...prev,
        confirmPassword: {
          ...prev.confirmPassword,
          error: '',
        },
      }))
    }
    if (error) {
      setFormState((prev: any) => ({
        ...prev,
        [name]: {
          ...prev[name],
          touched: true,
          error,
        },
      }))
      return error
    }
    return true
  }

  const formIsValid = () => {
    let firstInvalidInput = ''
    const allInputsAreValid = !Object.keys(formState)
      .map((name: any) => {
        const isValid = inputIsValid(name) === true
        if (!firstInvalidInput && !isValid) {
          firstInvalidInput = name
        }
        return isValid
      })
      .includes(false)
    if (firstInvalidInput) {
      document.getElementById(firstInvalidInput)?.focus()
    }
    return allInputsAreValid
  }

  const handleInputUpdate = (name: FormInput, value: string) => {
    const isValid = inputIsValid(name, value)
    const error = isValid === true ? '' : isValid
    setFormState((prev: any) => ({
      ...prev,
      [name]: {
        ...prev[name],
        value,
        error,
      },
    }))
  }

  const handleInputBlur = (name: FormInput) => {
    setFormState((prev: any) => ({
      ...prev,
      [name]: {
        ...prev[name],
        touched: true,
      },
    }))
  }

  const handleSubmit = async () => {
    if (formIsValid()) {
      try {
        let result
        if (isLogin) {
          result = await firebaseAuth.signInWithEmailAndPassword(email.value, password.value)
        } else {
          result = await firebaseAuth.createUserWithEmailAndPassword(email.value, password.value)
        }
        console.log(result)
      } catch (e) {
        console.log(e)
        throw e
      }
    } else {
      console.log('Form Invalid')
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
            id="email"
            label={email.label}
            type="email"
            fullWidth
            variant="filled"
            error={Boolean(email.error)}
            helperText={email.error}
            value={email.value}
            onChange={(e) => handleInputUpdate('email', e.target.value)}
            onBlur={() => handleInputBlur('email')}
          />
          <TextField
            margin="dense"
            id="password"
            label={password.label}
            type="password"
            fullWidth
            variant="filled"
            error={Boolean(password.error)}
            helperText={password.error}
            value={password.value}
            onChange={(e) => handleInputUpdate('password', e.target.value)}
            onBlur={() => handleInputBlur('password')}
          />
          {!isLogin && (
            <TextField
              margin="dense"
              id="confirmPassword"
              label={confirmPassword.label}
              type="password"
              fullWidth
              variant="filled"
              error={Boolean(confirmPassword.error)}
              helperText={confirmPassword.error}
              value={confirmPassword.value}
              onChange={(e) => handleInputUpdate('confirmPassword', e.target.value)}
              onBlur={() => handleInputBlur('confirmPassword')}
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
