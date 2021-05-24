import { useEffect, useState, useContext, createContext, FC } from 'react'
import { PaletteMode, useMediaQuery } from '@material-ui/core'

interface ColorSchemeType {
  colorScheme: PaletteMode
  toggleColorScheme: () => void
}

export enum ColorScheme {
  Light = 'light',
  Dark = 'dark',
}

export const ColorSchemeContext = createContext<ColorSchemeType>({
  colorScheme: ColorScheme.Dark,
  toggleColorScheme: () => {
    throw new Error('This component has not been wrapper with a ColorScheme Provider.')
  },
})

const THEME_LS = 'THEME_LS'

export const ColorSchemeContextProvider: FC = ({ children }) => {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')
  const [colorScheme, setColorScheme] = useState<PaletteMode>(ColorScheme.Dark)

  const toggleColorScheme = () => {
    if (colorScheme === ColorScheme.Light) {
      window.localStorage.setItem(THEME_LS, ColorScheme.Dark)
      setColorScheme(ColorScheme.Dark)
    } else {
      window.localStorage.setItem(THEME_LS, ColorScheme.Light)
      setColorScheme(ColorScheme.Light)
    }
  }

  useEffect(() => {
    if (Object.prototype.hasOwnProperty.call(window.localStorage, THEME_LS)) {
      const localTheme: PaletteMode = window.localStorage.getItem(THEME_LS) as PaletteMode
      if (localTheme) setColorScheme(localTheme)
    } else if (prefersDarkMode) {
      setColorScheme(ColorScheme.Dark)
    } else {
      setColorScheme(ColorScheme.Light)
    }
  }, [prefersDarkMode])

  const store = { colorScheme, toggleColorScheme }

  return <ColorSchemeContext.Provider value={store}>{children}</ColorSchemeContext.Provider>
}

export const useColorScheme = () => useContext(ColorSchemeContext)
