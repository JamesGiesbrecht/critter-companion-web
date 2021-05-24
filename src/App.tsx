import { ThemeProvider, CssBaseline, StyledEngineProvider } from '@material-ui/core'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Layout from 'containers/Layout/Layout'
import getTheme from 'styles/theme'
import Routes from 'constants/Routes'
import { useColorScheme } from 'context/Theme'

const App = () => {
  const { colorScheme } = useColorScheme()
  const routes = Routes.map((route) => {
    const Page = route.component
    return (
      <Route key={route.path} exact={route.exact || false} path={route.path}>
        <Page />
      </Route>
    )
  })

  const theme = getTheme(colorScheme)

  return (
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
  )
}

export default App
