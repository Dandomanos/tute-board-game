const RANKS = [ 2, 4, 5, 6, 7, 10, 11, 12, 3, 1]

const getSuitCards = (suit, cards) => cards.filter(card => card.suit === suit)
const getHigherCards = (rank, cards) =>
  cards.filter(card => rank < RANKS.indexOf(card.rank))
const getWinnerCard = cards => Math.max.apply( Math, cards.map(card => RANKS.indexOf(card.rank) ))

    

export { getSuitCards, getHigherCards, getWinnerCard }