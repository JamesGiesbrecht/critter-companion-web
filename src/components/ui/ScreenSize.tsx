import { makeStyles, Theme, useMediaQuery } from '@material-ui/core'

const useStyles = makeStyles({
  breakpoint: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'fixed',
    height: '100px',
    width: '100px',
    top: '10px',
    left: '10px',
    background: 'black',
    color: 'white',
    fontSize: '48px',
    borderRadius: '10px',
    opacity: '80%',
  },
})

const ScreenSize = () => {
  const classes = useStyles()
  let screenSize
  if (useMediaQuery((theme: Theme) => theme.breakpoints.up('xs'))) screenSize = 'XS'
  if (useMediaQuery((theme: Theme) => theme.breakpoints.up('sm'))) screenSize = 'SM'
  if (useMediaQuery((theme: Theme) => theme.breakpoints.up('md'))) screenSize = 'MD'
  if (useMediaQuery((theme: Theme) => theme.breakpoints.up('lg'))) screenSize = 'LG'
  if (useMediaQuery((theme: Theme) => theme.breakpoints.up('xl'))) screenSize = 'XL'

  return <span className={classes.breakpoint}>{screenSize}</span>
}

export default ScreenSize
