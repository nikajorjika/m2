<template>
  <div class="floor-picker">
    floor
  </div>
</template>

<script>
import BlockOne from '@/components/partials/renders/BlockOne'
import BlockTwo from '@/components/partials/renders/BlockTwo'
import BlockThree from '@/components/partials/renders/BlockThree'
export default {
  components: {
    BlockOne,
    BlockTwo,
    BlockThree,
  },
  props: {
    block: {
      type: Number,
      default: 3
    },
    floor: {
      type: Number,
      default: 0
    }
  },
  mounted() {
    this.$axios
        .get(`/block/21/${this.block}`)
        .then((response) => {
          this.blockInfo = response.data
        })
        .catch((e) => console.error(e))
  },
  data() {
    return {
      blockInfo: null,
      activeFloor: 0,
      distance: 0,
      isDragging: false
    }
  },
  computed: {
    sortedFloors() {
      if(!this.blockInfo) return
      const floors = this.blockInfo.floors.map(item => item.number)
      return floors.sort((a, b) => b - a)
    }
  },
  methods: {
    changeFloor(floor) {
      this.activeFloor = floor
      this.$emit('floorChosen', floor)
    }
  },
}
</script>

<style lang="scss" scoped>
.floor-picker {
  height: 100%;
  width: 100%;
  background: white;
  position: relative;
  font-family: $font;
  .floor-slider {
    position: absolute;
    right: 25px;
    top: calc(50% - 153.5px);
    height: 307px;
    width: 48px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: space-between;
    overflow-y: auto;
    .floor-item {
      color: #a59fcc;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      margin: 15px 0;
      .line {
        width: 25px;
        display: flex;
        margin-left: auto;
        &:after{ 
          content: '';
          display: inline-block;
          width: 6px;
          height: 6px;
          background: #a59fcc;
          opacity: 0.5;
          margin: auto 0 auto auto;
        }
        &.active {
          &:after{ 
            width: 19px;
            opacity: 1;
          }
        }
      }
    }
  }
  .floor-slider-inner {
    position: absolute;
    width: 100%;
    left: 0;
  }
}
</style>