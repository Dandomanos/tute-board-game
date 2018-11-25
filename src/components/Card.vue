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
export default {
  props:{
      card: {
          type: Object,
          default:null,
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
      this.$emit('push', this.card)
    }
  }
}
</script>

