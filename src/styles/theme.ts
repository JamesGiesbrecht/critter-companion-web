import { createTheme, Theme } from '@material-ui/core/styles'
import { PaletteMode } from '@material-ui/core'
import { blue, green } from '@material-ui/core/colors'

// Edit this function for global theme overrides
const getTheme = (colorScheme: PaletteMode): Theme => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const defaultTheme = createTheme({ palette: { mode: colorScheme } })
  const themeVars = (light: any, dark: any) => (colorScheme === 'light' ? light : dark)
  return createTheme({
    palette: {
      mode: colorScheme,
      primary: {
        light: green[500],
        main: themeVars(green[800], green[400]),
        dark: green[600],
      },
    },
    components: {
      MuiLink: {
        styleOverrides: {
          root: {
            color: blue[600],
          },
        },
      },
    },
  })
}

export default getTheme
