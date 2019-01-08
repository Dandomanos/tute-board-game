<template>
  <div class="player" :class="{'is-active':turnActive}">
    <div class="hand">
      <card
        v-for="(card, index) in hand"
        :key="`player-1-${index}`"
        :card="card"
        :is-active="isActive"
        :allowed-cards="allowedCards"
        @push="push"
      />
    </div>
  </div>
</template>
<script>
import Card from '@/components/Card'
import { mapState } from 'vuex'
export default {
  components: {
    Card,
  },
  props: {
    // hand: {
    //   type: Array,
    //   default: () => [],
    // },
    displayOrder: {
      type: Array,
      default: () => [],
    },
    playerIndex: {
      type: Number,
    },
    allowedCards: {
      type: Array,
      default: () => [],
    },
    // currentPlayer: {
    //   type: String,
    // },
  },
  computed: {
    ...mapState('game', ['G', 'ctx']),
    playerId() {
      return this.displayOrder[this.playerIndex]
    },
    turnActive() {
      return this.ctx.currentPlayer == this.playerId
    },
    hand() {
      return this.G.players[this.playerId] && this.G.players[this.playerId].hand
    },
    isActive() {
      return this.playerIndex === 3 && this.turnActive
    },
  },
  methods: {
    push(card) {
      this.$emit('push', card)
    },
  },
}
</script>

