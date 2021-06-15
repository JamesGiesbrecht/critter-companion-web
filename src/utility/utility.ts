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

/* eslint-disable no-restricted-syntax */
export const arraysAreEqual = (arr1: any, arr2: any) => {
  arr1.sort()
  arr2.sort()
  if (arr1.length !== arr2.length) return false

  for (const i of arr1.keys()) {
    if (arr1[i] !== arr2[i]) return false
  }
  return true
}

export const removeItem = (arr: any, item: any) => {
  const index = arr.indexOf(item)
  if (index > -1) arr.splice(index, 1)
  return arr
}
