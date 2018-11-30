const SUITS = ['Oros', 'Copas', 'Espadas', 'Bastos']
const RANKS = [2, 4, 5, 6, 7, 10, 11, 12, 3, 1]

const getSuitCards = (suit, cards) => cards.filter(card => card.suit === suit)
const getHigherCards = (rank, cards) =>
  cards.filter(card => rank < RANKS.indexOf(card.rank))
const getWinnerCard = cards =>
  Math.max.apply(Math, cards.map(card => RANKS.indexOf(card.rank)))
const getAllowedCards = (hand, round, triumph) => {
  const starterCard = round[0]
  const firstTriumph = starterCard.suit === triumph.suit
  const triumphsInHand = getSuitCards(triumph.suit, hand)
  const triumphsInRound = getSuitCards(triumph.suit, round)
  const suitsInHand = getSuitCards(starterCard.suit, hand)
  const suitsInRound = getSuitCards(starterCard.suit, round)
  const winnerRankIndex = getWinnerCard(triumphsInRound).length
    ? getWinnerCard(triumphsInRound)
    : getWinnerCard(suitsInRound)

  // if first card of round allow any card
  if (!starterCard) return hand.map(card => card)
  else {
    // if first card is triumph 'arrastre'
    if (firstTriumph) {
      // if user have triumphs should push higher or any triumph
      if (triumphsInHand.length > 0) {
        const higherCards = getHigherCards(winnerRankIndex, triumphsInHand)
        return higherCards.length > 0 ? higherCards : triumphsInHand
      }
      // else return any
      return hand
    }

    // if first card is other suit
    // if user have same suit
    if (suitsInHand.length > 0) {
      // if triumph on round can push any of suit
      if (triumphsInRound.length > 0) return suitsInHand
      else {
        // if no triumphs in round should push higher
        const higherCards = getHigherCards(winnerRankIndex, suitsInHand)
        return higherCards.length > 0 ? higherCards : suitsInHand
      }
    }
    // if user haven't same suit
    // if triumphs in round
    if (triumphsInRound.length > 0) {
      const higherCards = getHigherCards(winnerRankIndex, triumphsInHand)
      return higherCards.length > 0 ? higherCards : hand
    }
    // if no triumphs in round
    return triumphsInHand || hand
  }
}
const getWinnerCardOnRound = (round, triumph) => {
  const triumphsInRound = getSuitCards(triumph.suit, round)
  const suitsInRound = getSuitCards(round[0].suit, round)
  const getWinnerCard = cards =>
    cards.length &&
    cards.reduce((prev, current) =>
      RANKS.indexOf(prev.rank) > RANKS.indexOf(current.rank) ? prev : current
    )
  const winnerTriumph = getWinnerCard(triumphsInRound)
  const winnerSuit = getWinnerCard(suitsInRound)
  return triumphsInRound.length > 0 ? winnerTriumph : winnerSuit
}

const checkSongs = (hand, triumphSuit) => {
  const kings = hand.filter(card => card.rank === 12)
  const horses = hand.filter(card => card.rank === 11)
  const figures = kings.concat(horses)
  const triumphFigures = getSuitCards(triumphSuit, figures)
  console.log('triumphFigures', triumphFigures)

  const SONGS = []

  if (kings.length === 4) SONGS.push({ value: 'tute', rank: 12 })
  if (horses.length === 4) SONGS.push({ value: 'tute', rank: 11 })
  if (triumphFigures == 2) SONGS.push({ value: 40, suit: triumphSuit })
  SUITS.forEach(suit => {
    const suitFigures = getSuitCards(suit, figures)
    console.log('suitFigures', suitFigures, suitFigures.length)
    if (suitFigures.length == 2) SONGS.push({ value: 20, suit: suit })
  })
  return SONGS
}

export { getAllowedCards, getWinnerCardOnRound, checkSongs }
