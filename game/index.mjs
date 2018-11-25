import boardgame from 'boardgame.io/core'
import { generate, sortCards } from './deck'
import immer from 'immer'
import { getSuitCards, getHigherCards, getWinnerCard} from './utils.js'
import Debug from 'debug'
const debug = Debug('app:game')


const { produce } = immer
const game = boardgame.Game({
  setup: ctx => {
    const players = []
    const triumph = {}
    const round = []
    const ids = Array.apply(null, { length: ctx.numPlayers }).map(
      Number.call,
      Number
    )
    ids.forEach((player, index) => {
      players[index] = { hand: [], allowedCards:[] }
    })
    return { players, deck: generate(), triumph, round }
  },
  moves: {
    play: produce((G, ctx, card) => {
      debug('play', card)
      const player = G.players[ctx.currentPlayer]
      debug('player', player)
      G.round.push(card)

      // Remove cards from player hand
      player.hand = player.hand.filter(
        handCard =>
          !(handCard.rank === card.rank && handCard.suit === card.suit)
      )

      // Ends player turn
      ctx.events.endTurn()
      debug('end turn')

      // Si hay cartas en la mesa y la ronda está activa
      // Que sea del mismo palo si tienes cartas de ese palo
      // Que sea superior si puede superarla

      // Que sean entre 1 y 4
      // if (cards.length < 1 || cards.length > 4) {
      //   return debug('Numero de cartas entre 1 y 4')
      // }
      // // Que el user tenga esas cartas
      // if (_.intersection(player.hand, cards).length != cards.length) {
      //   return debug('El usuario no tiene esas cartas')
      // }
      // // Que tengan el mismo rango
      // debug(_.intersection(player.hand, cards))
      // Rango superior a la anterior jugada
      // Quitar cartas de la mano
      // Guardar cartas en la mesa
    })
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
            hand: sortCards(player.hand)
          }))
          G.deck = []

          // Sort by rank and suit
          ctx.events.endPhase()
        })
      },
      {
        name: 'round',
        allowedMoves: ['play'],
        onPhaseBegin: produce((G, ctx) => {
          debug("phase begin current player", ctx.currentPlayer)
          G.round = []
          
          const player = G.players[ctx.currentPlayer]
          player.allowedCards = player.hand.map(card=>card)
          debug('hand', player.hand)
          debug('allowed', player.allowedCards)
        }),
        onTurnBegin: produce((G, ctx) => {
          debug('turn begin')

          debug('round cards', G.round.length)

          // set allowedCards cards
          const actualHand = G.players[ctx.currentPlayer].hand
          let allowedCards = []
          // if first card of round
          if(G.round.length==0) 
            allowedCards = actualHand.map(card => card)
          else {
            debug("round is started with suit", G.round[0].suit)
            // if round is started, get suit of first card on round 
            allowedCards = getSuitCards(G.round[0].suit, actualHand)
            debug('same suit', allowedCards)
            // if player can win the rank
            if (allowedCards.length>0) {
              // it triumph is not pushed card should be higher than winner card
              const triumphsPushed = getSuitCards(G.triumph.suit, G.round)
              const suitPushed = getSuitCards(G.round[0].suit, G.round)
              // if first card is triump => TO DO

              // else
              if (triumphsPushed.length === 0) {
                const winnerRankIndex = getWinnerCard(suitPushed)
                debug("winner card", winnerRankIndex)
                const higherCards = getHigherCards(winnerRankIndex, allowedCards)
                debug('higherCards', higherCards)
                // if user can win return winner cards
                if(higherCards.length>0)
                  allowedCards = higherCards
              }
              // if user cant win return the same

            }
            // if player havent same suit, get triumphs
            if (allowedCards.length===0)
              allowedCards = getSuitCards(G.triumph.suit, actualHand)
            // if no triumphs allow all
            if (allowedCards.length === 0)
              allowedCards = actualHand.map(card => card)
          }

          G.players[ctx.currentPlayer].allowedCards = allowedCards

          if (G.round.length === 4) {
            debug('end Phase')

            ctx.events.endPhase()
          }
        })
      }
    ]
  }
})

export default game
