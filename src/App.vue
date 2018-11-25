<template>
  <div id="app">
    <div v-for="(player, index) in G.players" :key="index" style="text-align:left;">
      <h3 :class="{'is-active':ctx.currentPlayer == index}">Player {{index +1}}</h3>
      <button
        v-for="card in player.cards"
        :key="`${card.rank}-${card.suit}`"
        :style="{backgroundColor: bg[card.suit]}
      ">
      <span class="card-rank">
        <b>{{card.rank}} </b>
      </span>
      <span class="card-suit">
        {{card.suit}}
      </span>
      </button>
    </div>
    Fase: {{ ctx.phase }}
    Current player:  {{ctx.currentPlayer}}
  </div>
</template>

<script>
import {mapActions, mapState} from 'vuex'
export default {
  name: 'app',
  data: ()=> ({
    bg: {
      Oros: 'gold',
      Copas: 'coral',
      Espadas: 'darkturquoise',
      Bastos: 'darkseagreen'
    }
  }),
  methods: {
    ...mapActions('game',['init'])
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
button {
  width:70px;
  font-size:10px;
  height:120px;
  position:relative;
}
.card-rank {
  position:absolute;
  left: 5px;
  top: 3px;
  font-size:20px;
}
.card-suit {
  position:absolute;
  right: 5px;
  bottom: 3px;
  font-size:12px;
}
</style>
