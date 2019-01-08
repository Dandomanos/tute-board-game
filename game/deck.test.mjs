import { sortCards } from './deck.mjs'

it('should order cards', () => {
  expect(sortCards([{ rank: 7, suit: 'Oros' }])).toEqual([
    { rank: 7, suit: 'Oros' },
  ])
})
