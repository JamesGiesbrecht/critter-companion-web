import { useEffect, useState } from 'react'
import { useMediaQuery } from '@material-ui/core'

/*
 * Order of precedence for setting theme
 * 1. localStorage
 * 2. prefers-color-scheme
 * 3. Light
 */
const useColorScheme = () => {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')
  const [theme, setTheme] = useState('light')

  const toggleTheme = () => {
    if (theme === 'light') {
      window.localStorage.setItem('theme', 'dark')
      setTheme('dark')
    } else {
      window.localStorage.setItem('theme', 'light')
      setTheme('light')
    }
  }

  useEffect(() => {
    if (Object.prototype.hasOwnProperty.call(window.localStorage, 'theme')) {
      const localTheme = window.localStorage.getItem('theme')
      if (localTheme) setTheme(localTheme)
    } else if (prefersDarkMode) {
      setTheme('dark')
    } else {
      setTheme('light')
    }
  }, [prefersDarkMode])

  return [theme, toggleTheme]
}

export default useColorScheme
