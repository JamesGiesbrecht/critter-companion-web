import React from 'react'
import { makeStyles, Paper, Typography } from '@material-ui/core'


const Layout = ({ children, titleHeight }) => {
  const useStyles = makeStyles({
    layout: {
      width: '80%',
      maxWidth: '800px',
      margin: '40px auto 0 auto',
      textAlign: 'center',
    },
    title: {
      display: 'inline-block',
      padding: '0 10px',
      height: `${titleHeight}px`,
      lineHeight: `${titleHeight}px`,
      backgroundColor: 'var(--green)',
      color: 'white',
    },
  })
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
