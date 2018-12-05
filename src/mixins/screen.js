export default {
  data() {
    return {
      screenWidth: 0,
      screenHeight: 0,
    }
  },
  computed: {
    isLandScape() {
      return this.screenWidth > this.screenHeight
    },
  },
  mounted() {
    this._handleResize = () => {
      const e = document.documentElement
      const g = document.getElementsByTagName('body')[0]
      this.screenWidth = window.innerWidth || e.clientWidth || g.clientWidth
      this.screenHeight = window.innerHeight || e.clientHeight || g.clientHeight
    }
    window.addEventListener('resize', this._handleResize)
    this.$nextTick(this._handleResize)
    this._handleResize()
  },
  beforeDestroy() {
    window.removeEventListener('resize', this._handleResize)
  },
}
