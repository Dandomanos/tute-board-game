<template>
  <button
      v-if="card"
      :key="`${card.rank}-${card.suit}`"
      :style="{backgroundColor: bg[card.suit]}"
      @click="push"
    >
    <span class="card-rank">
    <b>{{card.rank}} </b>
    </span>
    <span class="card-suit">
    {{card.suit}}
    </span>
  </button>
</template>
<script>
import Debug from 'debug'
const debug = Debug("app:game")
export default {
  props:{
    card: {
        type: Object,
        default:null,
    },
    isActive: {
      type: Boolean,
      default:false,
    }
  },
  data: ()=> ({
    bg: {
      Oros: 'gold',
      Copas: 'coral',
      Espadas: 'darkturquoise',
      Bastos: 'darkseagreen'
    }
  }),
  methods: {
    push() {
      if(this.isActive) this.$emit('push', this.card)
      else debug('not your turn')
    }
  }
}
</script>
<style>
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


