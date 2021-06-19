import { createTheme, Theme } from '@material-ui/core/styles'
import { PaletteMode } from '@material-ui/core'
import { blue, green, yellow } from '@material-ui/core/colors'

// Edit this function for global theme overrides
const getTheme = (colorScheme: PaletteMode): Theme => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const defaultTheme = createTheme({ palette: { mode: colorScheme } })
  const themeVars = <T extends {}>(light: T, dark: T) => (colorScheme === 'light' ? light : dark)
  return createTheme({
    breakpoints: {
      values: {
        xs: 0,
        sm: 600,
        md: 800,
        lg: 920,
        xl: 1920,
      },
    },
    palette: {
      mode: colorScheme,
      primary: {
        main: themeVars(green[700], green[400]),
      },
      secondary: {
        main: yellow[400],
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
      MuiButton: {
        styleOverrides: {
          containedPrimary: {
            color: 'white',
            backgroundColor: green[600],
          },
        },
      },
    },
  })
}

export default getTheme
