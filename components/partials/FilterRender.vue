<template>
  <div class="render">
    <filter-render-svg @click="handleBlockChosing"/>
    <div v-if="activeBlockNumber && blockInfo" ref="infoBlock" class="render__info">
      <block-hover-info :flats-count="blockInfo.sellableFlats" :block-number="blockInfo.number" @click="handleChoosingBlock" />
    </div>
  </div>
</template>

<script>
import BlockHoverInfo from '@/components/partials/BlockHoverInfo'
import FilterRenderSvg from '@/components/partials/FilterRenderSvg'
import { mapGetters } from 'vuex'
import { objectMethod } from '@babel/types'
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
      this.$emit('seleted', this.blockInfo.id)
    },
    handleBlockChosing(number) {
      if(!event.target) return
      this.fetchBlockData(number)
    },
    fetchBlockData(number) {
      this.$axios
        .get(`/block/21/${number}`)
        .then(response => {
          this.activeBlockNumber = number
          this.blockInfo = response.data
        })
        .catch(e => console.error(e))
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
    top: 30%;
    left: 30%;
  }
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
}
</style>
