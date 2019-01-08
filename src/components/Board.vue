<template>
  <div class="board-game">
    <div class="columns is-multiline is-mobile">
      <div class="card-1 column is-12">
        <card :card="pushedCards[1]" />
      </div>
      <div class="card-0 column is-4">
        <card :card="pushedCards[0]" />
      </div>
      <div class="card-0 column is-4">
        <card :card="G.triumph" />
      </div>
      <div class="card-2 column is-4">
        <card :card="pushedCards[2]" />
      </div>
      <div class="card-3 column is-12">
        <card :card="pushedCards[3]" />
      </div>
    </div>
    <slot />
  </div>
</template>
<script>
import { mapState } from 'vuex'
import Card from '@/components/Card'
export default {
  components: {
    Card,
  },
  props: {
    displayOrder: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    ...mapState('game', ['G']),
    pushedCards() {
      return (
        this.displayOrder &&
        this.G.players &&
        [0, 1, 2, 3].map(id => this.G.players[this.displayOrder[id]].pushedCard)
      )
    },
  },
}
</script>

