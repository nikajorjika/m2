import { sliceUpArray } from '@/utils/Mixed'

describe('SliceUpArray mixed utils', () => {
  const testArray = [
    'val1',
    'val2',
    'val3',
    'val4',
    'val5',
    'val6',
    'val7',
    'val8',
    'val9',
    'val9'
  ]
  test('Returns Array', () => {
    expect(Array.isArray(sliceUpArray(testArray, 4))).toBe(true)
  })
  test('Slices in correct sub array numbers', () => {
    expect(sliceUpArray(testArray, 9).length).toBe(2)
  })
  test('Slices in correct sub array numbers {With Default Length}', () => {
    expect(sliceUpArray(testArray).length).toBe(3)
  })
})
