const RANKS = [ 2, 4, 5, 6, 7, 10, 11, 12, 3, 1]

const getSuitCards = (suit, cards) => cards.filter(card => card.suit === suit)
const getHigherCards = (rank, cards) => cards.filter(card => {
    const indexOfCard = RANKS.indexOf(card.rank)

    console.log("indexOfRank", rank)
    console.log("Card rank", card.rank, indexOfCard)
    return rank < indexOfCard
})
const getWinnerCard = cards => Math.max.apply( Math, cards.map(card => RANKS.indexOf(card.rank) ))

    

export { getSuitCards, getHigherCards, getWinnerCard }