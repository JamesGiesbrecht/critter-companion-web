import { createTheme, Theme } from '@material-ui/core/styles'
import { red, pink, teal } from '@material-ui/core/colors'
import { PaletteMode } from '@material-ui/core'

const defaultTheme = createTheme()

// Edit this function for global theme overrides
const getTheme = (colorScheme: PaletteMode): Theme =>
  createTheme({
    mixins: {
      header: {
        height: 50,
      },
      drawer: {
        width: 250,
        hidden: { mdDown: true },
        hiddenBreakpoint: defaultTheme.breakpoints.down('md'),
        visibleBreakpoint: defaultTheme.breakpoints.up('md'),
      },
    },
    palette: {
      mode: colorScheme,
      primary: teal,
      secondary: pink,
      error: red,
    },
  })

export default getTheme
