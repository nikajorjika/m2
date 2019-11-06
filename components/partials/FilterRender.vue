<template>
  <div class="render">
    <filter-render-svg @click="handleBlockChosing" />
    <transition name="fade">
      <div
        v-if="activeBlockNumber && blockInfo"
        ref="infoBlock"
        class="render__info"
      >
        <block-hover-info
          :flats-count="blockInfo.sellableFlats"
          :block-number="blockInfo.number"
          @click="handleChoosingBlock"
        />
      </div>
    </transition>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { objectMethod } from '@babel/types'
import BlockHoverInfo from '@/components/partials/BlockHoverInfo'
import FilterRenderSvg from '@/components/partials/FilterRenderSvg'
export default {
  components: { BlockHoverInfo, FilterRenderSvg },
  data() {
    return {
      activeBlockNumber: null,
      blockInfo: null
    }
  },
  methods: {
    handleChoosingBlock() {
      this.$store.commit('Filter/SET_CHOSEN_BLOCK', this.activeBlockNumber)
      this.$emit('seleted', this.blockInfo.id)
    },
    handleBlockChosing(number) {
      if (!event.target) return
      this.$emit('beforeChange')
      this.blockInfo = null
      this.activeBlockNumber = null
      this.fetchBlockData(number)
    },
    fetchBlockData(number) {
      this.$axios
        .get(`/block/21/${number}`)
        .then((response) => {
          this.activeBlockNumber = number
          this.blockInfo = response.data
          this.$emit('change', this.blockInfo.id)
        })
        .catch((e) => console.error(e))
    }
  }
}
</script>

<style lang="scss" scoped>
.render {
  width: 100%;
  height: 100%;
  position: relative;
  &__info {
    position: absolute;
    opacity: 0.99;
    top: 19%;
    left: 68%;
  }
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.5s;
  }
  .fade-enter,
  .fade-leave-to {
    opacity: 0;
  }
}
</style>
