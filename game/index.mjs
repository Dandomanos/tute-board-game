import boardgame from 'boardgame.io/core'
import { generate, sortCards } from "./deck";
import immer from "immer";
const { produce } = immer
const game = boardgame.Game({
  setup: ctx => {
    const players = []
    const triumph = {}
    const ids = Array.apply(null, { length: ctx.numPlayers }).map(Number.call, Number)
    ids.forEach((player, index) => {
      players[index] = { cards: [] }
    })
    return { players, deck: generate(), triumph }
  },
  moves: {
    play: produce((G, ctx, ...cards) => {
      const player = G.players[ctx.currentPlayer]
      console.log('player', player)
      // Si hay cartas en la mesa y la ronda está activa
        // Que sea del mismo palo si tienes cartas de ese palo
        // Que sea superior si puede superarla



      // Que sean entre 1 y 4
      // if (cards.length < 1 || cards.length > 4) {
      //   return console.log('Numero de cartas entre 1 y 4')
      // }
      // // Que el user tenga esas cartas
      // if (_.intersection(player.hand, cards).length != cards.length) {
      //   return console.log('El usuario no tiene esas cartas')
      // }
      // // Que tengan el mismo rango
      // console.log(_.intersection(player.hand, cards))
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
            G.players[playerId].cards.push(card)
            if(index === G.deck.length - 1) G.triumph = card
          })
          G.players.map(player => ({ ...player, cards: sortCards(player.cards)}))
          G.deck = []

          // Sort by rank and suit
          ctx.events.endPhase()
        })
      },{
        name:'round',
        allowedMoves: ['play']
      }
    ]
  }
})

export default game
