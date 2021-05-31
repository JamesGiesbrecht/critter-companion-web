import { ThemeProvider, CssBaseline, StyledEngineProvider } from '@material-ui/core'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { AuthContextProvider } from 'context/Auth'
import Layout from 'components/layout/Layout'
import getTheme from 'styles/theme'
import Routes from 'constants/Routes'
import { useColorScheme } from 'context/Theme'
import { FiltersContextProvider } from 'context/Filters'

const App = () => {
  const { colorScheme } = useColorScheme()
  const routes = Object.keys(Routes).map((name) => {
    const route = Routes[name]
    const Page = route.component
    return (
      <Route key={route.path} exact={route.exact || false} path={route.path}>
        <Page />
      </Route>
    )
  })

  const theme = getTheme(colorScheme)

  return (
    <AuthContextProvider>
      <FiltersContextProvider>
        <BrowserRouter>
          {/* TODO v5: remove once migration to emotion is completed */}
          <StyledEngineProvider injectFirst>
            <ThemeProvider theme={theme}>
              {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
              <CssBaseline />
              <Layout>
                <Switch>{routes}</Switch>
              </Layout>
            </ThemeProvider>
          </StyledEngineProvider>
        </BrowserRouter>
      </FiltersContextProvider>
    </AuthContextProvider>
  )
}

export default App
