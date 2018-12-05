<template>
  <div>
    <div class="team-title">
      <div><slot>Score</slot></div>
      <div>{{ countedPoints + countedSongs }}</div>
    </div>
    <div class="collectedCards columns is-mobile">
      <div class="collected-score column is-2">
        {{ countedPoints }}
      </div>
      <div class="column is-10">
        <card
          v-for="card in countedCards"
          :key="`${card.rank}-${card.suit}`"
          :card="card"
          :is-active="false"
        />
      </div>
    </div>
    <div v-if="countedSongs" class="collectedSongs columns is-mobile">
      <div class="collected-score column is-2">
        {{ countedSongs }}
      </div>
      <div class="column is-10">
        <card
          v-for="card in songCards"
          :key="`${card.rank}-${card.suit}`"
          :card="card"
          :is-active="false"
        />
      </div>
    </div>
  </div>
</template>
<script>
import Card from '@/components/Card'
import { getSongCards } from '@/../game/utils'

export default {
  components: {
    Card,
  },
  props: {
    score: {
      type: Object,
      default: () => ({}),
    },
  },
  data: () => ({
    cardValues: {
      1: 11,
      3: 10,
      12: 4,
      11: 3,
      10: 2,
    },
  }),
  computed: {
    countedCards() {
      return (
        this.score &&
        this.score.collectedCards &&
        this.score.collectedCards.filter(card =>
          [1, 3, 12, 11, 10].includes(card.rank)
        )
      )
    },
    countedPoints() {
      return (
        this.countedCards &&
        this.countedCards.reduce(
          (prev, cur) => prev + this.cardValues[cur.rank],
          0
        )
      )
    },
    songCards() {
      return this.score && this.score.songs && getSongCards(this.score.songs)
    },
    countedSongs() {
      return (
        this.score &&
        this.score.songs &&
        this.score.songs.reduce((prev, cur) => prev + cur.value, 0)
      )
    },
  },
}
</script>
<style lang="scss">
@import '@/style/_const.scss';

.collected-score {
  font-size: getVer(4);
  font-weight: bold;
  color: white;
}
.team-title {
  font-size: getVer(4);
  font-weight: bold;
  color: white;
  display: flex;
  justify-content: space-evenly;
  div {
    font-size: getVer(6);
  }
}
</style>

