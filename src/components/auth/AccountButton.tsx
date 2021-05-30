import { useState, MouseEvent } from 'react'
import { Avatar, IconButton, Menu, MenuItem } from '@material-ui/core'
import { useAuth } from 'context/Auth'
import { stringToColor } from 'utility/utility'

const AccountButton = () => {
  const { user, logout } = useAuth()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  if (!user) return null

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
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
          sx={{ bgcolor: stringToColor(avatarText as string) }}
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
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>My account</MenuItem>
        <MenuItem onClick={handleClose}>Logout</MenuItem>
      </Menu>
    </div>
  )
}

export default AccountButton
