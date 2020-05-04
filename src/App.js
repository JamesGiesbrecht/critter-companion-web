import React, { useState } from 'react'
import useColorScheme from './hooks/useColorScheme'
import Critters from './containers/Critters/Critters'
import backgroundDark from './assets/images/background/leaf_wallpaper_dark.png'
import backgroundGreen from './assets/images/background/leaf_wallpaper_green.png'
import { CssBaseline } from '@material-ui/core'
import { createMuiTheme, ThemeProvider, makeStyles } from '@material-ui/core/styles'
import Layout from './containers/Layout/Layout'
import MaterialUISampleTable from './components/MaterialUISampleTable'
import bugsData from './assets/data/bugs.json'
import fishData from './assets/data/fish.json'

const App = () => {
  /* THEMING AND STYLES START */
  const [colorScheme, toggleColorScheme] = useColorScheme()
  const backgroundImage = colorScheme === 'light' ? backgroundGreen : backgroundDark
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
        type: colorScheme,
      },
    }),
  [colorScheme]
  )
  /* THEMING AND STYLES END */
  const [bugs, setBugs] = useState(bugsData)
  const [fish, setFish] = useState(fishData)

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
        <Layout theme={colorScheme} toggleTheme={toggleColorScheme}>
          <Critters
            critters={bugs}
            setCritters={setBugs}
            type="Bugs"
          />
          <Critters
            critters={fish}
            setCritters={setFish}
            type="Fish"
          />
        </Layout>
    </ThemeProvider>
  )
}

export default App
