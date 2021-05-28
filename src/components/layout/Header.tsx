import { Box, makeStyles, Theme, Button } from '@material-ui/core'

const useStyles = makeStyles((theme: Theme) => ({
  appBar: {
    display: 'flex',
    justifyContent: 'flex-end',
    padding: theme.spacing(1),
  },
  button: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  grow: {
    flexGrow: 1,
  },
}))

const Header = () => {
  const classes = useStyles()

  return (
    <Box className={classes.appBar}>
      <Button className={classes.button} variant="contained">
        Login
      </Button>
      <Button className={classes.button} variant="contained">
        Sign Up
      </Button>
    </Box>
  )
}

export default Header
