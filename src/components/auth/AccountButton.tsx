import { useState, MouseEvent } from 'react'
import { useHistory } from 'react-router-dom'
import { useAuth } from 'context/Auth'
import { stringToColor } from 'utility/utility'
import Routes from 'constants/Routes'
import { Avatar, IconButton, Menu, MenuItem, useTheme } from '@material-ui/core'

const AccountButton = () => {
  const { user, logout } = useAuth()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const history = useHistory()
  const theme = useTheme()
  const open = Boolean(anchorEl)
  if (!user) return null

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  // const handleGoToAccount = () => {
  //   handleClose()
  //   history.push(Routes.account.path)
  // }

  const handleLogout = () => {
    handleClose()
    history.push(Routes.home.path)
    logout()
  }

  const avatarText = user.displayName || user.email

  return (
    <div>
      <IconButton
        id="account-menu-button"
        aria-controls="account-menu"
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}>
        <Avatar
          sx={{ bgcolor: stringToColor(avatarText as string, theme.palette.mode) }}
          alt={user.email || undefined}
          src={user.photoURL || undefined}>
          {avatarText?.charAt(0).toUpperCase()}
        </Avatar>
      </IconButton>
      <Menu
        id="account-menu"
        aria-labelledby="account-menu-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}>
        {/* <MenuItem onClick={handleGoToAccount}>My Account</MenuItem> */}
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </div>
  )
}

export default AccountButton
