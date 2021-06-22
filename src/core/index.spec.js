/* eslint-disable no-undef*/
import { includes, findCombinations, arrange } from '.'

describe('core functions', () => {
  describe('includes', () => {
    const log = [
      ['a', 'b'],
      ['c', 'd'],
    ]
    it('should return true', () => {
      expect(includes(log, ['a', 'b'])).toBe(true)
    })
    it('should return false', () => {
      expect(includes(log, ['a', 'd'])).toBe(false)
    })
  })

  describe('findCombinations', () => {
    const attendees = ['a', 'b', 'c', 'd']
    it('should find all the possible combination', () => {
      const expected = [
        ['a', 'b'],
        ['a', 'c'],
        ['a', 'd'],
        ['b', 'c'],
        ['b', 'd'],
        ['c', 'd'],
      ]
      const combinations = findCombinations(attendees)
      expect(combinations).toStrictEqual(expected)
    })
  })

  describe('arrange', () => {
    const attendees = [
      {
        tag: '@a',
        team: '#a',
      },
      {
        tag: '@b',
        team: '#b',
      },
      {
        tag: '@c',
        team: '#c',
      },
      {
        tag: '@d',
        team: '#d',
      },
    ]
    const logs = [
      {
        date: '6/9/2021',
        pairs: [
          ['@a', '@b'],
          ['@c', '@d'],
        ],
      },
    ]
    it('should return a list of pairs', () => {
      const pairList = arrange(attendees, logs)
      const expected = [
        ['@a', '@c'],
        ['@b', '@d'],
      ]
      expect(pairList).toStrictEqual(expected)
    })
  })
})
