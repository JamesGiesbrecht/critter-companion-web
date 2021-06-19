import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Routes from 'constants/Routes'
import { AuthContextProvider } from 'context/Auth'
import { ApiContextProvider } from 'context/Api'
import { useColorScheme } from 'context/Theme'
import getTheme from 'styles/theme'

import { ThemeProvider, CssBaseline, StyledEngineProvider } from '@material-ui/core'
import Layout from 'components/layout/Layout'

const App = () => {
  const { colorScheme } = useColorScheme()
  const routes = Object.keys(Routes).map((name) => {
    const route = Routes[name]
    return (
      <Route key={route.path} exact={route.exact || false} path={route.path}>
        {route.component}
      </Route>
    )
  })

  const theme = getTheme(colorScheme)

  return (
    <BrowserRouter>
      {/* TODO v5: remove once migration to emotion is completed */}
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme}>
          <AuthContextProvider>
            <ApiContextProvider>
              {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
              <CssBaseline />
              <Layout>
                <Switch>{routes}</Switch>
              </Layout>
            </ApiContextProvider>
          </AuthContextProvider>
        </ThemeProvider>
      </StyledEngineProvider>
    </BrowserRouter>
  )
}

export default App
