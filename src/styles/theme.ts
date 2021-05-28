import { createTheme, Theme } from '@material-ui/core/styles'
import { PaletteMode } from '@material-ui/core'
import { green } from '@material-ui/core/colors'

// Edit this function for global theme overrides
const getTheme = (colorScheme: PaletteMode): Theme => {
  const defaultTheme = createTheme({ palette: { mode: colorScheme } })
  const themeVars = (light: any, dark: any) => (colorScheme === 'light' ? light : dark)
  return createTheme({
    palette: {
      mode: colorScheme,
      primary: {
        light: green[400],
        main: themeVars(green[700], green[500]),
        dark: green[800],
      },
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
