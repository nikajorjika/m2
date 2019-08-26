import { formatPrice } from '@/utils/Mixed'

describe('formatPrice', () => {
  test('Number Is Formatted Properly', () => {
    const val = 12000
    expect(formatPrice(val)).toBe('12 000')
  })
  test('String Is Formatted Properly', () => {
    const val = '12000'
    expect(formatPrice(val)).toBe('12 000')
  })
  test('Empty String Is Formatted Properly', () => {
    const val = ''
    expect(formatPrice(val)).toBe('')
  })
  test('Null Is Formatted Properly', () => {
    const val = null
    expect(formatPrice(val)).toBe('')
  })
})
