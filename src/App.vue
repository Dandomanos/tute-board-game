<template>
  <div id="app" class="hero is-fullheight" :class="{'is-landScape':isLandScape}">
    <div class="hero-head">
      <!-- navigation -->
    </div>
    <div class="hero-body">
      <div class="match">
        <!-- PLAYER UNO -->
        <div class="player player-1" :class="{'is-active':itsTurnOf[1]}">
          <!-- <h3 :class="{'is-active':ctx.currentPlayer == 1}">Player 1</h3> -->
          <div class="hand">
            <card
              v-for="(card, index) in G.players[displayOrder[1]].hand"
              :key="`player-1-${index}`"
              :card="card"
              :is-active="false"
            />
          </div>
        </div>
        <div class="board">
          <!-- PLAYER 0 -->
          <div class="player player-0" :class="{'is-active':itsTurnOf[0]}">
            <div class="hand">
              <card
                v-for="(card, index) in G.players[displayOrder[0]].hand"
                :key="`player-0-${index}`"
                :card="card"
                :is-active="false"
              />
            </div>
          </div>
          <div class="board-game columns is-multiline is-mobile">
            <div class="card-1 column is-12">
              <card :card="G.players[displayOrder[1]].pushedCard" />
            </div>
            <div class="card-0 column is-4">
              <card :card="G.players[displayOrder[0]].pushedCard" />
            </div>
            <div class="card-0 column is-4">
              <card :card="G.triumph" />
            </div>
            <div class="card-2 column is-4">
              <card :card="G.players[displayOrder[2]].pushedCard" />
            </div>
            <div class="card-3 column is-12">
              <card :card="G.players[displayOrder[3]].pushedCard" />
            </div>
          </div>
          <!-- PLAYER 2 -->
          <div class="player player-2" :class="{'is-active':itsTurnOf[2]}">
            <!-- <h3 :class="{'is-active':ctx.currentPlayer == 1}">Player 1</h3> -->
            <div class="hand">
              <card
                v-for="(card,index) in G.players[displayOrder[2]].hand"
                :key="`player-2-${index}`"
                :card="card"
                :is-active="false"
              />
            </div>
          </div>
        </div>
        <div class="player player-3" :class="{'is-active':isYourTurn}">
          <div class="hand">
            <card
              v-for="card in G.players[displayOrder[3]].hand"
              :key="`${card.rank}-${card.suit}`"
              :card="card"
              :is-active="isYourTurn"
              :allowed-cards="allowedCards"
              @push="pushCard"
            />
          </div>
        </div>
        <!-- <div class="triumph">
          <p>Triumph</p>
          <card :card="G.triumph" />
        </div>
        <div class="round">
          <p>Round</p>
          <card v-for="card in G.round" :key="`${card.rank}-${card.suit}`" :card="card" />
        </div>-->
      </div>
    </div>
    <div class="hero-foot">
      <!-- footer -->
    </div>
    <!-- <div v-for="(player, index) in G.players" :key="index" style="text-align:left;">
      <h3 :class="{'is-active':ctx.currentPlayer == index}">Player {{ index +1 }}</h3>
      <card
        v-for="card in player.hand"
        :key="`${card.rank}-${card.suit}`"
        :card="card"
        :is-active="ctx.currentPlayer == index"
        :allowed-cards="player.allowedCards"
        @push="pushCard"
      />
      <card :card="player.pushedCard" :is-active="false" style="float:right;" />
    </div>-->
    <!-- 
    <div class="legend">Fase: {{ ctx.phase }}</div>
    <div class="score">
      <div v-for="(team, index) in G.teams" :key="index" class="team">
        <div>Team {{ index+1 }}</div>
        <card
          v-for="card in team.collectedCards"
          :key="`${card.rank}-${card.suit}`"
          :card="card"
          :is-active="false"
        />
        <div class="songs">
          <div
            v-for="song in team.songs"
            :key="`${song.value}-${song.suit}`"
          >{{ `${song.value}-${song.suit}` }}</div>
        </div>
      </div>
    </div>-->
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import Card from './components/Card'
import screen from '@/mixins/screen'
export default {
  name: 'App',
  components: {
    Card,
  },
  mixins: [screen],
  data: () => ({
    display: {
      0: [3, 2, 1, 0],
      1: [0, 3, 2, 1],
      2: [1, 0, 3, 2],
      3: [2, 1, 0, 3],
    },
  }),
  computed: {
    ...mapState('game', ['G', 'ctx', 'config']),
    myTeam() {
      return this.G.teams[1]
    },
    playerID() {
      return this.config.playerID
    },
    displayOrder() {
      return this.display[this.playerID | 0]
    },
    allowedCards() {
      return (
        (this.isYourTurn &&
          this.G.players[this.displayOrder[3]].allowedCards) ||
        []
      )
    },
    isYourTurn() {
      return this.ctx.currentPlayer == this.displayOrder[3]
    },
    itsTurnOf() {
      return this.displayOrder.map(
        item => item === (this.ctx.currentPlayer | 0)
      )
    },
  },
  created() {
    this.init()
  },
  methods: {
    ...mapActions('game', ['init', 'move']),
    pushCard(card) {
      this.move({ name: 'play', arg: card })
    },
  },
}
</script>

<style lang="scss">
@import '~bulma';
@import '@/style/_const.scss';
* {
  box-sizing: border-box;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: currentColor;
  .hero-body {
    padding: 0;
  }
  // margin-top: 60px;
}

.triumph {
  float: left;
}
.is-landScape {
  .match {
    width: $board-height;
    .player-1,
    .player-3 {
      padding: getHor(1) getHor(15);
    }
    .player-3 {
      padding: getHor(1) getHor(1);
      .card-container {
        width: getHor(9.3);
        max-width: getHor(9.3);
      }
    }
    .board {
      width: $board-height;
      height: getHor(68);
      .board-game {
        width: getHor(68);
      }
      .player-0,
      .player-2 {
        width: getHor(16);
        .hand {
          height: getHor(68);
          padding: getHor(2);
        }
      }
    }
  }
}
.match {
  width: $board-width;
  // height: 100vw;
  margin: 0 auto;
  padding: 0;
  background-color: darkgreen;
  .is-active {
    border: 1px white solid;
  }
  .player-1,
  .player-3 {
    // height: 20%;
    padding: getVer(1) getVer(15);
    h3 {
      padding: 0;
      text-align: center;
    }
    .hand {
      padding: getVer(1);
      display: flex;
      flex-direction: row;
      justify-content: center;
    }
  }
  .player-3 {
    padding: getVer(1) getVer(1);
    .card-container {
      width: getVer(9.3);
      max-width: getVer(9.3);
    }
  }

  .board {
    width: $board-width;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    height: getVer(68);
    .board-game {
      margin: 0;
      width: getVer(68);
      .column {
        align-self: center;
      }
      .card-3,
      .card-1 {
        align-items: center;
        display: flex;
        .card-container {
          margin: 0 auto;
        }
      }
    }
    .player-0,
    .player-2 {
      width: getVer(16);
      .hand {
        height: getVer(68);
        padding: getVer(2);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
      }
    }
    .player-0 {
      .hand {
        align-items: flex-end;
        .card-container {
          transform: rotate(90deg) translateY(getVer(0.3));
        }
      }
    }
    .player-2 {
      .hand {
        align-items: flex-start;
        .card-container {
          transform: rotate(270deg) translateY(getVer(0.4));
        }
      }
    }
    // .player-0 .hand .card-container {
    //   transform: rotate(90deg);
    // }
    // .player-2 .hand .card-container {
    //   transform: rotate(270deg);
    // }
  }
}
.match::after {
  content: '';
  clear: both;
  display: block;
}
// .player {
//   border: 1px solid yellow;
// }
</style>
