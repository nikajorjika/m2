import { isObjectEqual, formatPrice } from '@/utils/Mixed'

describe('IsObjectEqual', () => {
  test('Objects Equal', () => {
    const obj1 = { test1: 'testa1' }
    const obj2 = { test1: 'testa1' }
    expect(isObjectEqual(obj1, obj2)).toBe(true)
  })

  test('Empty Objects Are Equal', () => {
    const obj1 = {}
    const obj2 = {}
    expect(isObjectEqual(obj1, obj2)).toBe(true)
  })

  test('Objects not equal {Different Values}', () => {
    const obj1 = {
      test1: 'testa1'
    }
    const obj2 = {
      test1: 'testa2'
    }
    expect(isObjectEqual(obj1, obj2)).toBe(false)
  })

  test('Objects not equal {Different Properties}', () => {
    const obj1 = {
      test1: 'testa1'
    }
    const obj2 = {
      test2: 'testa1'
    }
    expect(isObjectEqual(obj1, obj2)).toBe(false)
  })
})

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
