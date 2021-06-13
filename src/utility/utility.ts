import { PaletteMode } from '@material-ui/core'
/* eslint-disable no-bitwise */
// eslint-disable-next-line import/prefer-default-export
export const stringToColor = (string: string, theme: PaletteMode) => {
  let hash = 0
  const luminance = theme === 'dark' ? 70 : 40
  for (let i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash)
    hash &= hash
  }
  return `hsl(${hash % 360}, ${(hash % 50) + 40}%, ${luminance}%)`
}
