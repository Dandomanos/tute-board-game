import boardgame from 'boardgame.io/core'
import { generate, sortCards } from './deck'
import immer from 'immer'
import { getAllowedCards, getWinnerCardOnRound, checkSongs } from './utils.js'
import Debug from 'debug'
const debug = Debug('app:game')

const { produce } = immer
const game = boardgame.Game({
  setup: ctx => {
    const players = []
    const triumph = {}
    const round = []
    const team = () => ({ collectedCards: [], songs: {} })
    const teams = [team(), team()]
    const ids = Array.apply(null, { length: ctx.numPlayers }).map(
      Number.call,
      Number
    )
    ids.forEach((player, index) => {
      players[index] = { hand: [], allowedCards: [], pushedCard: null }
    })
    return { players, deck: generate(), triumph, round, teams }
  },
  moves: {
    play: produce((G, ctx, card) => {
      debug('play', card)
      const player = G.players[ctx.currentPlayer]
      debug('player', player)
      G.round.push(card)
      player.pushedCard = card

      // Remove cards from player hand
      player.hand = player.hand.filter(
        handCard =>
          !(handCard.rank === card.rank && handCard.suit === card.suit)
      )

      // Ends player turn
      ctx.events.endTurn()
      debug('end turn')
    }),
  },
  flow: {
    phases: [
      {
        name: 'deal',
        onPhaseBegin: produce((G, ctx) => {
          G.deck = ctx.random.Shuffle(G.deck)
          G.deck.forEach((card, index) => {
            const playerId = index % ctx.numPlayers
            G.players[playerId].hand.push(card)
            if (index === G.deck.length - 1) G.triumph = card
          })
          G.players.map(player => ({
            ...player,
            hand: sortCards(player.hand),
          }))
          G.deck = []

          // Sort by rank and suit
          ctx.events.endPhase()
        }),
      },
      {
        name: 'round',
        allowedMoves: ['play'],
        onPhaseBegin: produce((G, ctx) => {
          debug('phase begin current player', ctx.currentPlayer)

          const player = G.players[ctx.currentPlayer]
          player.allowedCards = player.hand
          debug('hand', player.hand)
          debug('allowed', player.allowedCards)
        }),
        onTurnBegin: produce((G, ctx) => {
          debug('turn begin')

          debug('round cards', G.round.length)

          // set allowedCards cards
          const actualHand = G.players[ctx.currentPlayer].hand

          G.players[ctx.currentPlayer].allowedCards = getAllowedCards(
            actualHand,
            G.round,
            G.triumph
          )

          if (G.round.length === 4) {
            debug('end Phase')
            // Check winner to start next round
            const winnerCard = getWinnerCardOnRound(G.round, G.triumph)
            const winnerPlayer = G.players.findIndex(
              player =>
                player.pushedCard.rank === winnerCard.rank &&
                player.pushedCard.suit === winnerCard.suit
            )
            ctx.playOrderPos = winnerPlayer
            debug('winnerCard', winnerCard.suit, winnerCard.rank)
            debug('winnerPlayer', winnerPlayer)

            // Add cards to team
            const winnerTeam = winnerPlayer % 2
            G.teams[winnerTeam].collectedCards = G.teams[
              winnerTeam
            ].collectedCards.concat(G.round)

            // Check for songs
            let songs = []
            G.players.forEach((player, index) => {
              if (index % 2 === winnerTeam) {
                songs = songs.concat(checkSongs(player.hand, G.triumph.suit))
              }
            })
            debug('songs', songs)
            // Clear round
            G.round = []
            ctx.events.endPhase()
          }
        }),
      },
    ],
  },
})

export default game
