import React from 'react'
import { makeStyles, Paper } from '@material-ui/core'
import logo from '../../assets/images/new_horizons.png'

const useStyles = makeStyles({
  layout: {
    width: '80%',
    maxWidth: '800px',
    margin: '40px auto 0 auto',
    textAlign: 'center',
  },
  logo: {
    width: '300px',
  }
})

const Layout = ({ children }) => {
  const classes = useStyles()

  return (
    <Paper classes={{root: classes.layout}}>
      <img className={classes.logo} src={logo} alt="Animal Crossing New Horizons" />
      Layout
      {children}
    </Paper>
  )
}

export default Layout
