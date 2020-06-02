/* eslint-disable no-restricted-syntax */
/* eslint-disable import/prefer-default-export */
export const arraysAreEqual = (arr1, arr2) => {
  arr1.sort()
  arr2.sort()
  if (arr1.length !== arr2.length) return false

  for (const i of arr1.keys()) {
    if (arr1[i] !== arr2[i]) return false
  }
  return true
}

export const removeItem = (arr, item) => {
  const index = arr.indexOf(item)
  if (index > -1) arr.splice(index, 1)
  return arr
}
