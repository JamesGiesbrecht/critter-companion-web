import { ThemeProvider, CssBaseline, StyledEngineProvider } from '@material-ui/core'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { AuthContextProvider } from 'context/Auth'
import { ApiContextProvider } from 'context/Api'
import { useColorScheme } from 'context/Theme'
import Layout from 'components/layout/Layout'
import getTheme from 'styles/theme'
import Routes from 'constants/Routes'

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
    <ApiContextProvider>
      <BrowserRouter>
        {/* TODO v5: remove once migration to emotion is completed */}
        <StyledEngineProvider injectFirst>
          <ThemeProvider theme={theme}>
            <AuthContextProvider>
              {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
              <CssBaseline />
              <Layout>
                <Switch>{routes}</Switch>
              </Layout>
            </AuthContextProvider>
          </ThemeProvider>
        </StyledEngineProvider>
      </BrowserRouter>
    </ApiContextProvider>
  )
}

export default App
