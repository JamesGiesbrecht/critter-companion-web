import { FC, ReactNode } from 'react'
import { useAuth } from 'context/Auth'
import { Container, makeStyles } from '@material-ui/core'
import Footer from 'components/layout/Footer'
import Centered from 'components/ui/Centered'
import Loading from 'components/ui/Loading'
import LoginSignUpForm from 'components/auth/LoginSignUpForm'

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
      <LoginSignUpForm />
      {children}
      <Footer />
      <footer className={classes.footerMargin} />
    </Container>
  )
}

export default Layout
