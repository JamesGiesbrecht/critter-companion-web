import React from 'react'
import backgroundDark from './assets/images/background/leaf_wallpaper_dark.png'
import backgroundGreen from './assets/images/background/leaf_wallpaper_green.png'
import { CssBaseline, useMediaQuery } from '@material-ui/core'
import { createMuiTheme, ThemeProvider, makeStyles } from '@material-ui/core/styles'

const App = () => {
  /* THEMING AND STYLES START */
  const prefersLightMode = useMediaQuery('(prefers-color-scheme: light)')
  const backgroundImage = prefersLightMode ? backgroundGreen : backgroundDark
  const useStyles = makeStyles({
    '@global': {
      body: {
        height: '100%',
        backgroundImage: `url('${backgroundImage}')`,
        backgroundRepeat: 'repeat',
        backgroundSize: '300px',
      }
    }
  })
  useStyles()
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
