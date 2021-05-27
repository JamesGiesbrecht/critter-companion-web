import { makeStyles, Paper, Typography } from '@material-ui/core'
import Footer from 'components/layout/Footer'

const useStyles = makeStyles((theme) => ({
  layout: {
    [theme.breakpoints.up('md')]: {
      width: '90%',
      maxWidth: '1000px',
    },
    width: '98%',
    margin: '20px auto 0 auto',
    textAlign: 'center',
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

  return (
    <div className={classes.layout}>
      <Paper classes={{ root: classes.titlePaper }} square>
        <Typography variant="h1">ACNH: Critter Companion</Typography>
      </Paper>
      {children}
      <Footer />
      <footer className={classes.footerMargin} />
    </div>
  )
}

export default Layout
