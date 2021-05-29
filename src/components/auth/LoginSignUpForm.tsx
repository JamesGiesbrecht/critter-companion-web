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

const LoginSignUpForm = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [activeForm, setActiveForm] = useState<ActiveForm | undefined>()
  const isLogin = activeForm === 'login'

  useEffect(() => {
    setEmail('')
    setPassword('')
    setConfirmPassword('')
  }, [activeForm])

  const handleClose = () => setActiveForm(undefined)

  const handleSubmit = async () => {
    try {
      let result
      if (isLogin) {
        result = await firebaseAuth.signInWithEmailAndPassword(email, password)
      } else {
        result = await firebaseAuth.createUserWithEmailAndPassword(email, password)
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
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            margin="dense"
            id="password"
            label="Password"
            type="password"
            fullWidth
            variant="filled"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {!isLogin && (
            <TextField
              margin="dense"
              id="confirmPassword"
              label="Confirm Password"
              type="password"
              fullWidth
              variant="filled"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
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
