import { useState } from 'react'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from '@material-ui/core'

type ActiveForm = 'login' | 'sign up'

const LoginSignUpForm = () => {
  const [activeForm, setActiveForm] = useState<ActiveForm | null>(null)

  const handleClose = () => setActiveForm(null)

  return (
    <>
      <Button variant="contained" onClick={() => setActiveForm('login')}>
        Login
      </Button>
      <Button variant="contained" onClick={() => setActiveForm('sign up')}>
        Sign Up
      </Button>
      <Dialog open={Boolean(activeForm)} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here. We will send updates
            occasionally.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Subscribe</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default LoginSignUpForm
