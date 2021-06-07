import { Container, makeStyles, Paper, Typography } from '@material-ui/core'
import Footer from 'components/layout/Footer'
import Centered from 'components/ui/Centered'
import { useAuth } from 'context/Auth'
import Header from 'components/layout/Header'
import Loading from 'components/ui/Loading'

const useStyles = makeStyles((theme) => ({
  content: {
    width: '98%',
    margin: '0 auto',
    textAlign: 'center',
    marginTop: theme.spacing(2),
  },
  titlePaper: {
    display: 'inline-block',
    padding: '0 10px',
    backgroundColor: 'var(--green)',
    color: 'white',
    [theme.breakpoints.down('sm')]: {
      '& h1': {
        fontSize: '24px',
        lineHeight: '40px',
      },
      height: '40px',
    },
    [theme.breakpoints.up('sm')]: {
      '& h1': {
        fontSize: '38px',
        lineHeight: '50px',
      },
      height: '50px',
    },
    [theme.breakpoints.up('md')]: {
      '& h1': { lineHeight: '60px' },
      height: '60px',
    },
  },
  footerMargin: {
    height: '10px',
  },
}))

const Layout = ({ children }) => {
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
      <Header />
      <Paper classes={{ root: classes.titlePaper }} square>
        <Typography variant="h1">ACNH: Critter Companion</Typography>
      </Paper>
      {children}
      <Footer />
      <footer className={classes.footerMargin} />
    </Container>
  )
}

export default Layout
