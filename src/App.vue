<template>
  <div id="app">
    <div class="triumph">
       <card :card="G.triumph"/>
    </div> 
    <div v-for="(player, index) in G.players" :key="index" style="text-align:left;">
      <h3 :class="{'is-active':ctx.currentPlayer == index}">Player {{index +1}}</h3>
      <card v-for="card in player.cards" :card="card" :key="`${card.rank}-${card.suit}`" @push="pushCard"/>
    </div>
    <div class="legend">
      Fase: {{ ctx.phase }}
      Current player:  {{ctx.currentPlayer}}
      Triumph : {{G.triumph}}
    </div>
  </div>
</template>

<script>
import {mapActions, mapState} from 'vuex'
import Card from './components/Card'
export default {
  name: 'app',
  components: {
    Card
  },
  methods: {
    ...mapActions('game',['init']),
    pushCard(card) {
      console.log('push card', card)
    }
  },
  computed: {
    ...mapState('game', ['G','ctx'])
  },
  created() {
    this.init()
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
h3 {
  padding:5px;
  width: 75px;
}
h3.is-active {
    border:1px solid #999;
  }

</style>
