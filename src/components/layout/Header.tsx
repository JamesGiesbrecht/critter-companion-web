import { Box, makeStyles, Theme } from '@material-ui/core'
import LoginSignUpForm from 'components/auth/LoginSignUpForm'

const useStyles = makeStyles((theme: Theme) => ({
  appBar: {
    display: 'flex',
    justifyContent: 'flex-end',
    padding: theme.spacing(1),
    '& > *': {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
    },
  },
  grow: {
    flexGrow: 1,
  },
}))

const Header = () => {
  const classes = useStyles()

  return (
    <Box className={classes.appBar}>
      <LoginSignUpForm />
    </Box>
  )
}

export default Header
