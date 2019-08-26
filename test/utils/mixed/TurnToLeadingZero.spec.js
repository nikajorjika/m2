import { turnToLeadingZero } from '@/utils/Mixed'

describe('turnToLeadingZero', () => {
  test('Works on numbers < 10', () => {
    expect(turnToLeadingZero(1)).toBe('01')
    expect(turnToLeadingZero(9)).toBe('09')
  })
  test('Works on numbers > 10', () => {
    expect(turnToLeadingZero(10)).toBe(10)
    expect(turnToLeadingZero(150)).toBe(150)
  })
  test('Works on numbers > 10', () => {
    expect(turnToLeadingZero(-1)).toBe(-1)
  })
})
