const SUITS = ['Oros', 'Copas', 'Espadas', 'Bastos']
const RANKS = [ 2, 4, 5, 6, 7, 10, 11, 12, 3, 1]

const createSuit = (suit) => RANKS.map((rank) => ({ rank: rank, suit: suit}))

export function generate() {
  return SUITS.map((suit) => createSuit(suit)).reduce((prev, cur) => prev.concat(cur), [])
}

export function sortCards(cards) {
  const byRank = cards.sort((a, b) => RANKS.indexOf(b.rank) - RANKS.indexOf(a.rank))
  return byRank.sort((a, b) => SUITS.indexOf(a.suit) - SUITS.indexOf(b.suit))
}