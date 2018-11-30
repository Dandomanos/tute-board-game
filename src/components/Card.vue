<template>
  <button
    v-if="card"
    :key="`${card.rank}-${card.suit}`"
    :style="{backgroundColor: bg[card.suit]}"
    :disabled="disabled"
    @click="push"
  >
    <span class="card-rank">
      <b>{{ card.rank }}</b>
    </span>
    <span class="card-suit">{{ card.suit }}</span>
  </button>
</template>
<script>
import Debug from 'debug'
const debug = Debug('app:game')
export default {
  props: {
    card: {
      type: Object,
      default: null,
    },
    isActive: {
      type: Boolean,
      default: false,
    },
    allowedCards: {
      type: Array,
      default: () => [],
    },
  },
  data: () => ({
    bg: {
      Oros: 'gold',
      Copas: 'coral',
      Espadas: 'darkturquoise',
      Bastos: 'darkseagreen',
    },
  }),
  computed: {
    disabled() {
      return !this.isActive || !this.isAllowed
    },
    isAllowed() {
      if (!this.allowedCards || this.allowedCards.length === 0) return true
      // return this.allowedCards.inludes(this.card)
      return this.allowedCards.find(
        card => card.suit === this.card.suit && card.rank === this.card.rank
      )
    },
  },
  methods: {
    push() {
      debug('push card', this.card)
      if (this.isActive) this.$emit('push', this.card)
      else debug('not your turn')
    },
  },
}
</script>
<style>
button {
  width: 70px;
  font-size: 10px;
  height: 120px;
  position: relative;
}
.card-rank {
  position: absolute;
  left: 5px;
  top: 3px;
  font-size: 20px;
}
.card-suit {
  position: absolute;
  right: 5px;
  bottom: 3px;
  font-size: 12px;
}
</style>


