import { generate, sortCards } from './deck.mjs'
const card = (rank, suit) => ({ rank: rank, suit: suit })
const randomize = cards => cards.sort(() => Math.random() - Math.random())
const orderedRank = [1, 3, 12, 11, 10, 7, 6, 5, 4, 2]
const getOrderedSuit = suit => orderedRank.map(rank => card(rank, suit))
const SWORDS = [
  card(3, 'Espadas'),
  card(6, 'Espadas'),
  card(2, 'Espadas'),
  card(1, 'Espadas'),
  card(7, 'Espadas'),
  card(11, 'Espadas'),
  card(12, 'Espadas'),
  card(4, 'Espadas'),
  card(10, 'Espadas'),
  card(5, 'Espadas'),
]
const SORTED_SWORDS = getOrderedSuit('Espadas')
const GOLD = [
  card(4, 'Oros'),
  card(12, 'Oros'),
  card(2, 'Oros'),
  card(7, 'Oros'),
  card(10, 'Oros'),
  card(3, 'Oros'),
  card(1, 'Oros'),
  card(5, 'Oros'),
  card(6, 'Oros'),
  card(11, 'Oros'),
]
const SORTED_GOLD = getOrderedSuit('Oros')
const CUPS = [
  card(5, 'Copas'),
  card(2, 'Copas'),
  card(6, 'Copas'),
  card(11, 'Copas'),
  card(4, 'Copas'),
  card(12, 'Copas'),
  card(10, 'Copas'),
  card(7, 'Copas'),
  card(3, 'Copas'),
  card(1, 'Copas'),
]
const SORTED_CUPS = getOrderedSuit('Copas')
const COARSERS = [
  card(10, 'Bastos'),
  card(5, 'Bastos'),
  card(11, 'Bastos'),
  card(4, 'Bastos'),
  card(3, 'Bastos'),
  card(2, 'Bastos'),
  card(7, 'Bastos'),
  card(1, 'Bastos'),
  card(12, 'Bastos'),
  card(6, 'Bastos'),
]
const SORTED_COARSERS = getOrderedSuit('Bastos')
const MIXED = []
  .concat(COARSERS)
  .concat(SWORDS)
  .concat(GOLD)
  .concat(CUPS)
const SORTED_MIXED = []
  .concat(SORTED_GOLD)
  .concat(SORTED_CUPS)
  .concat(SORTED_SWORDS)
  .concat(SORTED_COARSERS)
const DESK = generate()
describe('desk', () => {
  it('should generate a desk', () => {
    expect(DESK).toHaveLength(40)
  })
  it('should order cards', () => {
    expect(sortCards(SWORDS)).toEqual(SORTED_SWORDS)
    expect(sortCards(randomize(SWORDS))).toEqual(SORTED_SWORDS)
    expect(sortCards(GOLD)).toEqual(SORTED_GOLD)
    expect(sortCards(randomize(GOLD))).toEqual(SORTED_GOLD)
    expect(sortCards(CUPS)).toEqual(SORTED_CUPS)
    expect(sortCards(randomize(CUPS))).toEqual(SORTED_CUPS)
    expect(sortCards(COARSERS)).toEqual(SORTED_COARSERS)
    expect(sortCards(randomize(COARSERS))).toEqual(SORTED_COARSERS)
    expect(sortCards(MIXED)).toEqual(SORTED_MIXED)
    expect(sortCards(randomize(MIXED))).toEqual(SORTED_MIXED)
    expect(sortCards(DESK)).toEqual(SORTED_MIXED)
    expect(sortCards(randomize(DESK))).toEqual(SORTED_MIXED)
  })
})
