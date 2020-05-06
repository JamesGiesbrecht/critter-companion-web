import React, { useState } from 'react'
import { CssBaseline } from '@material-ui/core'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'
import useColorScheme from './hooks/useColorScheme'
import Critters from './containers/Critters/Critters'
import Layout from './containers/Layout/Layout'
import bugsData from './assets/data/bugs.json'
import fishData from './assets/data/fish.json'
import Controls from './components/Controls'

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

  const [bugs, setBugs] = useState(bugsData)
  const [fish, setFish] = useState(fishData)
  //  TODO: Availble Now || all, northern || southern, leaving this month,
  //  new this month, search, show ones not obtained
  const showAllArray = []
  const [show, setShow] = useState(showAllArray)
  const [isNorthern, setIsNorthern] = useState(true)

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Layout theme={colorScheme} toggleTheme={toggleColorScheme} titleHeight={titleHeight}>
        <Controls
          theme={colorScheme}
          toggleTheme={toggleColorScheme}
          titleHeight={titleHeight}
          show={show}
          setShow={setShow}
          isNorthern={isNorthern}
          setIsNorthern={setIsNorthern}
          showAllArray={showAllArray}
        />
        <Critters
          allCritters={bugsData}
          critters={bugs}
          setCritters={setBugs}
          type="Bugs"
          show={show}
          isNorthern={isNorthern}
          showAllArray={showAllArray}
        />
        <Critters
          allCritters={fishData}
          critters={fish}
          setCritters={setFish}
          type="Fish"
          show={show}
          isNorthern={isNorthern}
          showAllArray={showAllArray}
        />
      </Layout>
    </ThemeProvider>
  )
}

export default App
