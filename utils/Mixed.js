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

export const turnToLeadingZero = (number) => {
  return number <= 9 && number > 0 ? '0'.concat(number) : number
}

export const sliceUpArray = (data, subCount = 4) => {
  const items = []
  const raw = data
  let length = raw.length
  if (raw.length % subCount !== 0) {
    length = (parseInt(raw.length / subCount) + 1) * subCount
  }

  for (let i = subCount; i <= length; i += subCount) {
    if (raw.lenght < i + subCount) {
      items.push(raw.slice(i - subCount, -1))
    } else {
      items.push(raw.slice(i - subCount, i))
    }
  }
  return items
}
