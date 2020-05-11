import React from 'react'
import { Paper, makeStyles, Typography, Link } from '@material-ui/core'

const useStyles = makeStyles({
  footer: {
    margin: '20px auto 0 auto',
    fontSize: '12px',
    padding: '5px',
  },
  link: {
    color: '#90caf9',
  },
})

const Footer = () => {
  const classes = useStyles()

  return (
    <Paper className={classes.footer} elevation={3}>
      <Typography>
        {'Made by James Giesbrecht. If you liked using my site please '}
        <Link href="https://www.paypal.me/JamesGiesbrecht" className={classes.link}>consider buying me a coffee</Link>
        {' :)'}
      </Typography>
    </Paper>
  )
}

export default Footer
