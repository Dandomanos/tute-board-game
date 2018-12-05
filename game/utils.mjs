// import Debug from 'debug'
// const debug = Debug('game:utils')
const SUITS = ['Oros', 'Copas', 'Espadas', 'Bastos']
const RANKS = [2, 4, 5, 6, 7, 10, 11, 12, 3, 1]
const SONGS = [20, 40, 'tute']

const getSuitCards = (suit, cards) => cards.filter(card => card.suit === suit)
const getHigherCards = (rank, cards) =>
  cards.filter(card => rank < RANKS.indexOf(card.rank))
const getWinnerCard = cards =>
  Math.max.apply(Math, cards.map(card => RANKS.indexOf(card.rank)))
const getAllowedCards = (hand, round, triumph) => {
  const starterCard = round[0]
  // if first card of round allow any card
  if (!starterCard) return hand.map(card => card)
  else {
    const firstTriumph = starterCard.suit === triumph.suit
    const triumphsInHand = getSuitCards(triumph.suit, hand)
    const triumphsInRound = getSuitCards(triumph.suit, round)
    const suitsInHand = getSuitCards(starterCard.suit, hand)
    const suitsInRound = getSuitCards(starterCard.suit, round)
    const winnerRankIndex = getWinnerCard(triumphsInRound).length
      ? getWinnerCard(triumphsInRound)
      : getWinnerCard(suitsInRound)

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

  const SONGS = []

  if (kings.length === 4) SONGS.push({ value: 'tute', type: 12 })
  if (horses.length === 4) SONGS.push({ value: 'tute', type: 11 })
  SUITS.forEach(suit => {
    const suitFigures = getSuitCards(suit, figures)
    if (suitFigures.length == 2)
      SONGS.push({
        value: suit === triumphSuit ? 40 : 20,
        type: suit,
      })
  })
  return SONGS
}

const orderSongs = songs =>
  songs.sort((a, b) => SONGS.indexOf(b.value) - SONGS.indexOf(a.value))

export function sortCards(cards) {
  const byRank = cards.sort(
    (a, b) => RANKS.indexOf(b.rank) - RANKS.indexOf(a.rank)
  )
  return byRank.sort((a, b) => SUITS.indexOf(a.suit) - SUITS.indexOf(b.suit))
}
const getNextSong = (songs, singed) => {
  if (!singed || !singed.length) {
    // debug('singed empty')
    return songs[0]
  }

  // debug('singed length', singed.length)
  const notSinged = songs.filter(song => {
    return singed.find(
      just => !(just.value == song.value && just.suit == song.suit)
    )
    // if (!founded) return song
  })
  // debug('notSinged', notSinged)
  // singed.forEach(song => debug('just singed', song))

  return notSinged[0]
}

const getCardsBySong = ({ suit, rank }) => {
  if (suit) return [12, 11].map(rank => ({ rank: rank, suit: suit }))
  if (rank)
    return ['Oros', 'Copas', 'Espadas', 'Bastos'].map(suit => ({
      rank: rank,
      suit: suit,
    }))
  return []
}

const getSongObject = () => ({
  Oros: getCardsBySong({ suit: 'Oros' }),
  Copas: getCardsBySong({ suit: 'Copas' }),
  Espadas: getCardsBySong({ suit: 'Espadas' }),
  Bastos: getCardsBySong({ suit: 'Bastos' }),
  '12': getCardsBySong({ rank: 12 }),
  '11': getCardsBySong({ rank: 11 }),
})

const getSongCards = songs => {
  return songs.reduce(
    (prev, cur) => prev.concat(getSongObject()[cur.type.toString()]),
    []
  )
}

export {
  getAllowedCards,
  getWinnerCardOnRound,
  checkSongs,
  orderSongs,
  getNextSong,
  getSongCards,
}
