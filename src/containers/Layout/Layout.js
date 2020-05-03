import React from 'react'
import { makeStyles, Paper, Typography } from '@material-ui/core'

const titleHeight = 60

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
  content: {
    marginTop: `-${titleHeight/2}px`,
    paddingTop: `${titleHeight/2 + 15}px`,
  }
})

const Layout = ({ children, toggleTheme }) => {
  const classes = useStyles()

  return (
    <div className={classes.layout}>
      <button onClick={toggleTheme}>Toggle Theme</button>
      <Paper classes={{ root: classes.title }} square>
        <Typography classes={{ h3: classes.title }} variant="h3">ACNH: Critter Companion</Typography>
      </Paper>
      <Paper classes={{ root: classes.content }} elevation={3} >
        {children}
      </Paper>
    </div>
  )
}

export default Layout
