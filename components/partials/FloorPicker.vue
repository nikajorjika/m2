<template>
  <div v-if="blockInfo" class="floor-picker">
    <block-one
      v-if="block === 1"
      :active-floor="activeFloor"
      @change="changeFloor"
    />
    <block-two
      v-if="block === 2"
      :active-floor="activeFloor"
      @change="changeFloor"
    />
    <block-three
      v-if="block === 3"
      :active-floor="activeFloor"
      @change="changeFloor"
    />
    <no-ssr>
      <div v-show="blockInfo" ref="SliderInner" class="floor-slider">
        <div class="floor-slider-inner">
          <div v-for="(item, index) in sortedFloors" :key="index">
            <div class="floor-item" :class="{ active: activeFloor === item }">
              <span v-show="item === activeFloor">{{ item }} </span>
              <span
                class="line"
                :class="{ active: activeFloor === item }"
              ></span>
            </div>
          </div>
        </div>
      </div>
    </no-ssr>
    <transition name="fade">
      <div
        v-if="activeFloor !== null && block && blockInfo"
        ref="infoBlock"
        class="render__info"
      >
        <block-hover-info
          :flats-count="floorFlatCount"
          :block-number="activeFloor"
          :top-label="$t('labels.floor')"
          :bottom-label="
            $tc('labels.FlatsLeftOnThisFloor', floorFlatCount, {
              count: floorFlatCount
            })
          "
          @click="selectFloor"
        />
      </div>
    </transition>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import BlockOne from '@/components/partials/renders/BlockOne'
import BlockTwo from '@/components/partials/renders/BlockTwo'
import BlockThree from '@/components/partials/renders/BlockThree'
import BlockHoverInfo from '@/components/partials/BlockHoverInfo'
export default {
  components: {
    BlockOne,
    BlockHoverInfo,
    BlockTwo,
    BlockThree
  },
  props: {
    block: {
      type: Number,
      default: 3
    }
  },
  data() {
    return {
      blockInfo: null,
      activeFloor: null,
      distance: 0,
      isDragging: false
    }
  },
  computed: {
    sortedFloors() {
      if (!this.blockInfo) return
      const floors = this.blockInfo.floors.map((item) => item.number)
      return floors.sort((a, b) => b - a)
    },
    floorFlatCount() {
      const floor = this.blockInfo.floors.find(
        (item) => item.number === this.activeFloor
      )
      const sellableFlats = floor.flats.filter(
        (flat) => flat.status === 'for_sale'
      )
      return sellableFlats.length
    }
  },
  mounted() {
    this.changeFloor(1)
    this.$axios
      .get(`/block/21/${this.block}`)
      .then((response) => {
        this.blockInfo = response.data
      })
      .catch((e) => console.error(e))
  },
  beforeDestroy() {
    this.setFilter({
      key: 'showFloorFooter',
      value: false
    })
  },
  methods: {
    ...mapMutations({
      setFilter: 'Filter/SET'
    }),
    changeFloor(floor) {
      this.activeFloor = floor
      this.setFilter({
        key: 'showFloorFooter',
        value: true
      })
      this.$emit('floorChosen', floor)
    },
    selectFloor() {
      this.$emit('floorSelect', this.activeFloor)
    }
  }
}
</script>

<style lang="scss" scoped>
.floor-picker {
  height: 100%;
  width: 100%;
  background: white;
  position: relative;
  font-family: $font;
  .render__info {
    position: absolute;
    opacity: 0.99;
    top: 6%;
    left: 55%;
  }
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
        &:after {
          content: '';
          display: inline-block;
          width: 6px;
          height: 6px;
          background: #a59fcc;
          opacity: 0.5;
          margin: auto 0 auto auto;
        }
        &.active {
          &:after {
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
