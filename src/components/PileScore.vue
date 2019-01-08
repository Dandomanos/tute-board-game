<template>
  <div>
    <div class="song-container">
      <card
        v-for="(card,index) in songCards"
        :key="`team-score-${index}`"
        :card="card"
        :is-active="false"
        :style="{position: 'absolute', left: (5 * index) + 5 + 'px', bottom: '5px' }"
      />
    </div>
    <div class="score-container">
      <card
        v-for="(card,index) in collectedCads"
        :key="`team-score-${index}`"
        :card="{}"
        :is-active="false"
        :style="{position: 'absolute', right: 0.02 + index + 'px', bottom: 0.02 + index + 'px' }"
      />
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
  computed: {
    collectedCads() {
      return this.score && this.score.collectedCards
    },
    teamSongs() {
      return this.score && this.score.songs
    },
    songCards() {
      return this.teamSongs && getSongCards(this.teamSongs)
    },
  },
}
</script>
<style lang="scss">
@import '@/style/_const.scss';

.song-container {
  transform: rotate(270deg);
}
.team-score {
  position: absolute;
  right: getVer(13);
  bottom: getVer(2);
  transform: rotate(90deg);
}
.enemy-score {
  position: absolute;
  left: getVer(2);
  bottom: getVer(13);
  transform: rotate(180deg);
}
.is-landScape {
  .team-score {
    right: getHor(13);
    bottom: getHor(2);
  }
  .enemy-score {
    left: getHor(2);
    bottom: getHor(13);
  }
}
</style>


