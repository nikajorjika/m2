export function isObjectEqual(a = {}, b = {}) {
  // handle null value #1566
  if (!a || !b) return a === b
  const aKeys = Object.keys(a)
  const bKeys = Object.keys(b)
  if (aKeys.length !== bKeys.length) {
    return false
  }
  return aKeys.every((key) => {
    const aVal = a[key]
    const bVal = b[key]
    // check nested equality
    if (typeof aVal === 'object' && typeof bVal === 'object') {
      return isObjectEqual(aVal, bVal)
    }
    return String(aVal) === String(bVal)
  })
}

export const formatPrice = function(number) {
  if (!number) return ''
  const numberArray = number.toString().split('')
  let counter = 1
  const result = []
  for (let i = numberArray.length - 1; i >= 0; i--) {
    result.unshift(numberArray[i])
    if (counter % 3 === 0) {
      result.unshift(' ')
    }
    counter++
  }
  return result.join('')
}
