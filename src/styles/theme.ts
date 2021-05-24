import { createTheme, Theme } from '@material-ui/core/styles'
import { PaletteMode } from '@material-ui/core'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const defaultTheme = createTheme()

// Edit this function for global theme overrides
const getTheme = (colorScheme: PaletteMode): Theme =>
  createTheme({
    palette: {
      mode: colorScheme,
    },
  })

export default getTheme
