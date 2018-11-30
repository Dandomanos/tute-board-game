<template>
  <div id="app">
    <div class="match">
      <div class="triumph">
        <p>Triumph</p>
        <card :card="G.triumph" />
      </div>
      <div class="round">
        <p>Round</p>
        <card v-for="card in G.round" :key="`${card.rank}-${card.suit}`" :card="card" />
      </div>
    </div>
    <div v-for="(player, index) in G.players" :key="index" style="text-align:left;">
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
    </div>
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
        <!-- <card v-for="card in G.teams.team1.collectedCards" :card="card" :key="`${card.rank}-${card.suit}`" :is-active="false"> -->
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import Card from './components/Card'
export default {
  name: 'App',
  components: {
    Card,
  },
  computed: {
    ...mapState('game', ['G', 'ctx']),
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
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
h3 {
  padding: 5px;
  width: 75px;
  &.is-active {
    border: 1px solid #999;
  }
}
.triumph {
  float: left;
}
.match::after {
  content: '';
  clear: both;
  display: block;
}
</style>
