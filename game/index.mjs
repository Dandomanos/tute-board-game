import boardgame from 'boardgame.io/core'
import { generate, sortCards } from "./deck"
import immer from "immer"
import Debug from 'debug'
const debug = Debug("app:game")

const { produce } = immer
const game = boardgame.Game({
  setup: ctx => {
    const players = [];
    const triumph = {};
    const round = [];
    const ids = Array.apply(null, { length: ctx.numPlayers }).map(
      Number.call,
      Number
    );
    ids.forEach((player, index) => {
      players[index] = { cards: [] };
    });
    return { players, deck: generate(), triumph, round };
  },
  moves: {
    play: produce((G, ctx, card) => {
      debug("play", card);
      const player = G.players[ctx.currentPlayer];
      debug("player", player);
      G.round.push(card);

      // Remove cards from player hands
      player.cards = player.cards.filter(
        handCard =>
          !(handCard.rank === card.rank && handCard.suit === card.suit)
      );

      // Ends player turn
      ctx.events.endTurn();
      debug("end turn");

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
        name: "deal",
        onPhaseBegin: produce((G, ctx) => {
          G.deck = ctx.random.Shuffle(G.deck);
          G.deck.forEach((card, index) => {
            const playerId = index % ctx.numPlayers;
            G.players[playerId].cards.push(card);
            if (index === G.deck.length - 1) G.triumph = card;
          });
          G.players.map(player => ({
            ...player,
            cards: sortCards(player.cards)
          }));
          G.deck = [];

          // Sort by rank and suit
          ctx.events.endPhase();
        })
      },
      {
        name: "round",
        allowedMoves: ["play"],
        onPhaseBegin: produce((G, ctx) => {
          G.round = [];
          G.lastPlayed = null;
        }),
        onTurnBegin: produce((G, ctx) => {
          debug("G.round.length", G.round.length);
          if (G.round.length === 4) {
            ctx.events.endPhase();
          }
        })
      }
    ]
  }
});

export default game
