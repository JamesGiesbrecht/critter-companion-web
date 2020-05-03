import React from 'react'
import { CssBaseline, useMediaQuery } from '@material-ui/core'
import { createMuiTheme, ThemeProvider, makeStyles } from '@material-ui/core/styles'

const App = () => {
  /* THEMING AND STYLES START */
  const prefersLightMode = useMediaQuery('(prefers-color-scheme: light)')
  const backgroundImage = prefersLightMode ? 'green' : 'dark'
  const useStyles = makeStyles({
    app: {
      height: '100%',
      backgroundImage: `url('/assets/images/background/leaf_wallpaper_${backgroundImage}.png')`,
      backgroundRepeat: 'repeat',
      backgroundSize: '300px',
    }
  })
  const classes = useStyles()
  const theme = React.useMemo(() =>
    createMuiTheme({
      palette: {
        type: prefersLightMode ? 'light' : 'dark',
      },
    }),
  [prefersLightMode]
  )
  /* THEMING AND STYLES END */

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
        <div className={classes.app}>
          APP
        </div>
    </ThemeProvider>
  )
}

export default App
