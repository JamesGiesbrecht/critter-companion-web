import { useState } from 'react'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  useTheme,
} from '@material-ui/core'

type ActiveForm = 'login' | 'sign up'

const LoginSignUpForm = () => {
  const [activeForm, setActiveForm] = useState<ActiveForm | undefined>()
  const isLogin = activeForm === 'login'

  const handleClose = () => setActiveForm(undefined)

  const handleSubmit = () => {
    console.log('Submitting')
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
          />
          <TextField
            margin="dense"
            id="password"
            label="Password"
            type="password"
            fullWidth
            variant="filled"
          />
          {!isLogin && (
            <TextField
              margin="dense"
              id="confirmPassword"
              label="Confirm Password"
              type="password"
              fullWidth
              variant="filled"
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
