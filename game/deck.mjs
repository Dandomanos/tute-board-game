const SUITS = ['Oros', 'Copas', 'Espadas', 'Bastos']
const RANKS = [2, 4, 5, 6, 7, 10, 11, 12, 3, 1]

const createSuit = suit => RANKS.map(rank => ({ rank: rank, suit: suit }))

export function generate() {
  return SUITS.map(suit => createSuit(suit)).reduce(
    (prev, cur) => prev.concat(cur),
    []
  )
}

function orderByRank(cards) {
  return cards.sort((a, b) => RANKS.indexOf(b.rank) - RANKS.indexOf(a.rank))
}
function getSuit(suit, cards) {
  return cards.filter(card => card.suit == suit)
}

export function sortCards(cards) {
  return SUITS.map(suit => getSuit(suit, cards)).reduce(
    (prev, cur) => prev.concat(orderByRank(cur)),
    []
  )
}
