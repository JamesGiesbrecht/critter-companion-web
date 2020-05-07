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

  //  TODO: Availble Now || all, northern || southern, leaving this month,
  //  new this month, search, show ones not obtained
  const [showAll, setShowAll] = useState('showAll')
  const [show, setShow] = useState(['isNew', 'isLeaving', 'isObtained'])
  const [isNorthern, setIsNorthern] = useState(true)

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Layout theme={colorScheme} toggleTheme={toggleColorScheme} titleHeight={titleHeight}>
        <Controls
          theme={colorScheme}
          toggleTheme={toggleColorScheme}
          titleHeight={titleHeight}
          showAll={showAll}
          setShowAll={setShowAll}
          show={show}
          setShow={setShow}
          isNorthern={isNorthern}
          setIsNorthern={setIsNorthern}
        />
        <Critters
          allCritters={bugsData}
          type="Bugs"
          showAll={showAll}
          show={show}
          isNorthern={isNorthern}
        />
        <Critters
          allCritters={fishData}
          type="Fish"
          showAll={showAll}
          show={show}
          isNorthern={isNorthern}
        />
      </Layout>
    </ThemeProvider>
  )
}

export default App
