import { FC, ReactNode, SyntheticEvent } from 'react'
import { useAuth } from 'context/Auth'
import { Alert, Container, makeStyles, Slide, Snackbar } from '@material-ui/core'
import Footer from 'components/layout/Footer'
import Centered from 'components/ui/Centered'
import Loading from 'components/ui/Loading'
import AuthForm from 'components/auth/AuthForm'
import useStore from 'store'

interface Props {
  children: ReactNode
}

const useStyles = makeStyles((theme) => ({
  content: {
    width: '98%',
    margin: '0 auto',
    textAlign: 'center',
    marginTop: theme.spacing(2),
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  },
  footerMargin: {
    height: '10px',
  },
}))

const Layout: FC<Props> = ({ children }) => {
  const classes = useStyles()
  const { user } = useAuth()
  const snackbar = useStore((state) => state.snackbar)
  const setSnackbar = useStore((state) => state.setSnackbar)

  const handleSnackbarClose = (event?: SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') return
    setSnackbar()
  }

  // User has not yet been initialized
  if (user === undefined) {
    return (
      <Centered>
        <Loading />
      </Centered>
    )
  }

  return (
    <Container className={classes.content} disableGutters>
      <AuthForm />
      {children}
      <Footer />
      <footer className={classes.footerMargin} />
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        TransitionComponent={(props) => <Slide {...props} direction="up" />}>
        <Alert onClose={handleSnackbarClose} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.text}
        </Alert>
      </Snackbar>
    </Container>
  )
}

export default Layout
