import React from 'react'
import { makeStyles, Paper, Typography } from '@material-ui/core'
import Controls from '../../components/Controls'


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
})

const Layout = ({ children, theme, toggleTheme }) => {
  const classes = useStyles()

  return (
    <div className={classes.layout}>
      <Paper classes={{ root: classes.title }} square>
        <Typography classes={{ h3: classes.title }} variant="h3">ACNH: Critter Companion</Typography>
      </Paper>
      <Controls theme={theme} toggleTheme={toggleTheme} titleHeight={titleHeight} />
      {children}
    </div>
  )
}

export default Layout
