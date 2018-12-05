<template>
  <button :disabled="disabled" class="card-container" @click="push">
    <div class="card-visible" :style="{backgroundColor: bg[card && card.suit] || bg._default}">
      <template v-if="card && card.suit && card.rank">
        <span class="card-rank">
          <b>{{ card.rank }}</b>
        </span>
        <span class="card-suit">{{ card.suit }}</span>
      </template>
    </div>
  </button>
</template>
<script>
import Debug from 'debug'
const debug = Debug('app:card')
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
      _default: 'grey',
    },
  }),
  computed: {
    disabled() {
      return this.card && !this.isAllowed
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
      if (this.isActive) this.$emit('push', this.card)
      else debug('not your turn')
    },
  },
}
</script>
<style lang="scss">
@import '@/style/_const.scss';
.is-landScape {
  .card-container {
    width: getHor(7);
    max-width: getHor(7);
    .card-rank {
      left: getHor(1);
      top: getHor(1);
      font-size: getHor(3);
    }
    .card-suit {
      right: getHor(1);
      bottom: getHor(1);
      font-size: getHor(1.5);
    }
  }
}

.card-container {
  width: getVer(7);
  max-width: getVer(7);
  // flex: 1;
  padding: 0;
  margin: 0;
  display: inline-block;
  cursor: pointer;
  border: none;
  &[disabled='disabled'] {
    .card-visible {
      opacity: 0.5;
    }
    cursor: not-allowed;
  }
}
.card-visible {
  border: 1px solid #ccc;
  background-color: transparent;
  margin: 0;
  padding: 0;
  display: block;
  position: relative;
  padding-top: 140%;
}
.card-rank {
  position: absolute;
  left: getVer(1);
  top: getVer(1);
  font-size: getVer(3);
}
.card-suit {
  position: absolute;
  right: getVer(1);
  bottom: getVer(1);
  font-size: getVer(1.5);
}
</style>


