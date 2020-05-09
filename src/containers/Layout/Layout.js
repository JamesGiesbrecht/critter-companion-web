import React from 'react'
import { makeStyles, Paper, Typography } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  layout: {
    [theme.breakpoints.up('sm')]: {
      width: '90%',
      maxWidth: '1000px',
    },
    width: '98%',
    margin: '20px auto',
    textAlign: 'center',
  },
  title: {
    display: 'inline-block',
    padding: '0 10px',
    backgroundColor: 'var(--green)',
    color: 'white',
    [theme.breakpoints.down('sm')]: {
      height: '40px',
      lineHeight: '40px',
      fontSize: '24px',
    },
    [theme.breakpoints.up('sm')]: {
      height: '50px',
      lineHeight: '50px',
      fontSize: '38px',
    },
    [theme.breakpoints.up('md')]: {
      height: '60px',
      lineHeight: '60px',
    },
  },
}))

const Layout = ({ children }) => {
  const classes = useStyles()

  return (
    <div className={classes.layout}>
      <Paper classes={{ root: classes.title }} elevation={3} square>
        <Typography classes={{ h3: classes.title }} variant="h3">ACNH: Critter Companion</Typography>
      </Paper>
      {children}
    </div>
  )
}

export default Layout
