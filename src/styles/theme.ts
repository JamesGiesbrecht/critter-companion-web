import { createTheme, Theme } from '@material-ui/core/styles'
import { PaletteMode } from '@material-ui/core'

// Edit this function for global theme overrides
const getTheme = (colorScheme: PaletteMode): Theme => {
  const defaultTheme = createTheme({ palette: { mode: colorScheme } })
  return createTheme({
    palette: {
      mode: colorScheme,
    },
    components: {
      MuiButton: {
        styleOverrides: {
          text: {
            color: defaultTheme.palette.text.primary,
          },
        },
      },
    },
  })
}

export default getTheme
