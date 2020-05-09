import React from 'react'
import { CssBaseline } from '@material-ui/core'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'
import useColorScheme from './hooks/useColorScheme'
import Critters from './containers/Critters/Critters'
import Layout from './containers/Layout/Layout'
import ScreenSize from './components/ScreenSize'

const App = () => {
  /* THEMING AND STYLES START */
  const [colorScheme, toggleColorScheme] = useColorScheme()
  const theme = React.useMemo(() => createMuiTheme({
    palette: {
      type: colorScheme,
    },
  }),
  [colorScheme])

  const titleHeight = 60
  /* THEMING AND STYLES END */

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ScreenSize />
      <Layout
        theme={colorScheme}
        toggleTheme={toggleColorScheme}
        titleHeight={titleHeight}
      >
        <Critters
          colorScheme={colorScheme}
          toggleColorScheme={toggleColorScheme}
          titleHeight={titleHeight}
        />
      </Layout>
    </ThemeProvider>
  )
}

export default App
