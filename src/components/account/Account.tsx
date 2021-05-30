import { Redirect } from 'react-router-dom'
import { useAuth } from 'context/Auth'
import { Typography } from '@material-ui/core'

const Account = () => {
  const { user } = useAuth()

  // Not logged in
  if (user === null) return <Redirect to="/" />

  return <Typography variant="h1">Account</Typography>
}

export default Account
