<template>
  <div id="app" class="hero is-fullheight" :class="{'is-landScape':isLandScape}">
    <div class="hero-head">
      <!-- navigation -->
    </div>
    <div class="hero-body">
      <div v-if="ctx.phase==='score'" class="match match-score">
        <final-score :score="teamScore">
          <slot>Your Team</slot>
        </final-score>
        <final-score :score="enemyScore">
          <slot>Vs Team</slot>
        </final-score>
      </div>
      <div v-else class="match">
        <player
          class="player-1"
          :display-order="displayOrder"
          :player-index="1"
        />
        <div class="board">
          <player
            class="player-0"
            :display-order="displayOrder"
            :player-index="0"
          />
          <board :display-order="displayOrder">
            <pile-score class="team-score" :score="teamScore" />
            <pile-score class="enemy-score" :score="enemyScore" />
          </board>
          <player
            class="player-2"
            :display-order="displayOrder"
            :player-index="2"
          />
        </div>
        <player
          class="player-3"
          :display-order="displayOrder"
          :player-index="3"
          :allowed-cards="allowedCards"
          @push="pushCard"
        />
      </div>
    </div>
    <div class="hero-foot">
      <!-- footer -->
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import PileScore from '@/components/PileScore'
import FinalScore from '@/components/FinalScore'
import Player from '@/components/Player'
import Board from '@/components/Board'

import screen from '@/mixins/screen'
export default {
  name: 'App',
  components: {
    PileScore,
    FinalScore,
    Player,
    Board,
  },
  mixins: [screen],
  data: () => ({
    display: {
      0: [3, 2, 1, 0],
      1: [0, 3, 2, 1],
      2: [1, 0, 3, 2],
      3: [2, 1, 0, 3],
    },
    teams: [0, 1, 0, 1],
  }),
  computed: {
    ...mapState('game', ['G', 'ctx', 'config']),
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
    teamIndex() {
      return this.teams[this.playerID]
    },
    teamScore() {
      return this.G.teams[this.teamIndex]
    },
    enemyScore() {
      return this.G.teams[this.teamIndex === 0 ? 1 : 0]
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
    height: $board-height;
    .player-1 {
      height: getHor(14.2);
    }
    .player-3 {
      height: getHor(17.8);
    }
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
    .player-0 {
      .hand {
        .card-container {
          transform: rotate(90deg) translateY(getHor(-0.8));
        }
      }
    }
    .player-2 {
      .hand {
        .card-container {
          transform: rotate(270deg) translateY(getHor(-0.2));
        }
      }
    }
  }
}
.match {
  width: $board-width;
  height: $board-width;
  margin: 0 auto;
  padding: 0;
  background-color: darkgreen;
  &.match-score {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    padding: getVer(10);
  }
  .is-active {
    background-color: green;
  }
  .player-1 {
    height: getVer(14.2);
  }
  .player-3 {
    height: getVer(17.8);
  }
  .player-1,
  .player-3 {
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
      position: relative;
      > .columns {
        height: 100%;
        margin: 0;
      }
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
        align-items: center;
        .card-container {
          transform: rotate(90deg) translateY(getVer(-0.8));
        }
      }
    }
    .player-2 {
      .hand {
        align-items: center;
        .card-container {
          transform: rotate(270deg) translateY(getVer(-0.2));
        }
      }
    }
  }
}
</style>
