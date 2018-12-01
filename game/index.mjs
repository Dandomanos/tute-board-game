import boardgame from 'boardgame.io/core'
import { generate, sortCards } from './deck'
import immer from 'immer'
import {
  getAllowedCards,
  getWinnerCardOnRound,
  checkSongs,
  orderSongs,
  getNextSong,
} from './utils.js'
import Debug from 'debug'
const debug = Debug('app:game')

const { produce } = immer
const game = boardgame.Game({
  setup: ctx => {
    const players = []
    const triumph = {}
    const round = []
    const nextPlayer = null
    const team = () => ({ collectedCards: [], songs: [] })
    const teams = [team(), team()]
    const ids = Array.apply(null, { length: ctx.numPlayers }).map(
      Number.call,
      Number
    )
    ids.forEach((player, index) => {
      players[index] = { hand: [], allowedCards: [], pushedCard: null }
    })
    return { players, deck: generate(), triumph, round, teams, nextPlayer }
  },
  moves: {
    play: produce((G, ctx, card) => {
      debug('play', card)
      const player = G.players[ctx.currentPlayer]
      // debug('player', player)
      G.round.push(card)
      player.pushedCard = card

      // Remove cards from player hand
      player.hand = player.hand.filter(
        handCard =>
          !(handCard.rank === card.rank && handCard.suit === card.suit)
      )

      if (G.round.length === 4) {
        // TO DO block game and setTimeout

        // debug('end Phase')
        // Check winner to start next round
        const winnerCard = getWinnerCardOnRound(G.round, G.triumph)
        const winnerPlayer = G.players.findIndex(
          player =>
            player.pushedCard.rank === winnerCard.rank &&
            player.pushedCard.suit === winnerCard.suit
        )
        // ctx.playOrderPos = winnerPlayer
        // debug('winnerCard', winnerCard.suit, winnerCard.rank)
        // debug('winnerPlayer', winnerPlayer)

        // Add cards to team
        const winnerTeamIndex = winnerPlayer % 2
        const winnerTeam = G.teams[winnerTeamIndex]
        winnerTeam.collectedCards = winnerTeam.collectedCards.concat(G.round)

        // Check for songs
        let songs = []
        G.players.forEach((player, index) => {
          if (index % 2 === winnerTeamIndex) {
            songs = songs.concat(checkSongs(player.hand, G.triumph.suit))
          }
        })
        songs = orderSongs(songs)
        const songToSing = getNextSong(songs, winnerTeam.songs)
        debug('songs', songs)
        debug('songToSing', songToSing)

        if (songToSing) winnerTeam.songs.push(songToSing)
        // Clear round
        G.round = []
        G.players.forEach(player => (player.pushedCard = null))

        // Finish Game
        const handCards = G.players.reduce(
          (prev, cur) => prev.concat(cur.hand),
          []
        )
        if (!handCards || !handCards.length) {
          debug('NO MORE CARDS')
          ctx.events.endPhase()
        }
        // Ends player turn
        debug('SET NEXT PLAYER WINNER', winnerPlayer)
        G.nextPlayer = winnerPlayer
        // ctx.events.endTurn()
        // ctx.playOrderPos = winnerPlayer
        // return
      }
      debug('NEXT', G.nextPlayer)
      debug('CURRENT', ctx.currentPlayer)
      ctx.events.endTurn()
      debug('end turn')
    }),
  },
  flow: {
    phases: [
      {
        name: 'deal',
        onPhaseBegin: produce((G, ctx) => {
          debug('BEGIN PHASE DEAL')
          G.deck = ctx.random.Shuffle(G.deck)
          G.deck.forEach((card, index) => {
            const playerId = index % ctx.numPlayers
            G.players[playerId].hand.push(card)
            if (index === G.deck.length - 1) G.triumph = card
          })
          // Sort by rank and suit
          G.players.map(player => ({
            ...player,
            hand: sortCards(player.hand),
          }))
          G.deck = []

          ctx.events.endPhase()
        }),
      },
      {
        name: 'round',
        allowedMoves: ['play'],
        onPhaseBegin: produce((G, ctx) => {
          debug('BEGIN PHASE ROUND')
          // debug('phase begin current player', ctx.currentPlayer)

          const player = G.players[ctx.currentPlayer]
          player.allowedCards = player.hand
          // debug('hand', player.hand)
          // debug('allowed', player.allowedCards)
        }),
        onTurnBegin: produce((G, ctx) => {
          debug('BEGIN TOURN ROUND PLAYER', ctx.currentPlayer)

          if (G.nextPlayer || G.nextPlayer === 0) {
            debug('NEXT PLAYER SETTED', G.nextPlayer, ctx.currentPlayer)
            if (ctx.currentPlayer == G.nextPlayer) {
              debug('this player win')
              G.nextPlayer = null
            } else {
              debug('this player cant play END TURN')
              ctx.events.endTurn()
              return
            }
          }
          // debug('round cards', G.round.length)

          // set allowedCards cards
          const actualHand = G.players[ctx.currentPlayer].hand
          // debug('hand', actualHand)
          // debug('round', G.round)
          // debug('triumph', G.triumph)

          G.players[ctx.currentPlayer].allowedCards = getAllowedCards(
            actualHand,
            G.round,
            G.triumph
          )
        }),
      },
      {
        name: 'score',
        onPhaseBegin: produce((G, ctx) => {
          debug('begin scoring')
        }),
      },
    ],
  },
})

export default game
