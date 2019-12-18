<template>
  <div class="floor-picker">
    <div v-if="loading" class="loading">
      <!-- eslint-disable-next-line vue/no-v-html -->
      <div class="lds-default" v-html="generateLoadingDivs()" />
    </div>
    <component :is="render" v-show="!loading" class="flat-picker render-svg" />
    <transition name="fade">
      <div v-if="activeFlat && !loading" ref="infoBlock" class="render__info">
        <block-hover-info
          :flats-count="0"
          :top-label="$t('labels.flat')"
          :block-number="chosenFlataNumber"
          :display-bottom-block="false"
          @click="selectFlat"
        />
      </div>
    </transition>
    <div class="legend">
      <div class="sold legend-item">
        {{ $t('labels.sold') }}
      </div>
      <div class="available legend-item">
        {{ $t('labels.available') }}
      </div>
      <div class="reserved legend-item">
        {{ $t('labels.reserved') }}
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
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
    },
    floor: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      blockInfo: null,
      activeFlat: null,
      chosenFlataNumber: null,
      loading: true,
      distance: 0,
      isDragging: false,
      render: null,
      renderList: null,
      flat: null
    }
  },
  computed: {
    ...mapGetters({
      locale: 'locale'
    }),
    sortedFloors() {
      if (!this.blockInfo) return
      const floors = this.blockInfo.floors.map((item) => item.number)
      return floors.sort((a, b) => b - a)
    }
  },
  mounted() {
    this.fetchBlockInfo()
    this.floorRender()
    // this.renderSvgs()
  },
  methods: {
    fetchBlockInfo() {
      return new Promise((resolve, reject) => {
        this.$axios
          .get(`/block/21/${this.block}`)
          .then((response) => {
            this.blockInfo = response.data
            resolve(response)
          })
          .catch((e) => reject(e))
      })
    },
    generateLoadingDivs() {
      let divs = ''
      for (let i = 0; i < 12; i++) {
        divs += '<div></div>'
      }
      return divs
    },
    changeFloor(floor) {
      this.activeFloor = floor
      this.$emit('floorChosen', floor)
    },
    floorRender() {
      this.render = () =>
        import(
          `@/components/floor-renders/block-${this.block}/block-${this.block}-${this.floor}.vue`
        )
      this.registerEvents()
    },
    registerEvents() {
      this.renderList = document.querySelectorAll('g[data-flat]')
      if (this.renderList.length === 0) {
        setTimeout(() => {
          this.registerEvents()
        }, 200)
      } else {
        this.fetchFlatStatuses()
        this.renderList.forEach((element) => {
          element.addEventListener('click', this.chooseFlat)
        })
      }
    },
    fetchFlatStatuses() {
      this.$axios
        .get(`get/floor/${this.block}/${this.floor}`)
        .then(({ data }) => {
          data.map((item) => {
            const domObject = document.querySelector(
              `g[data-flat="${item.flat_number}"]`
            )
            if (domObject && item.status) {
              domObject.classList.add(item.status)
            }
          })
          window.setTimeout(() => (this.loading = false), 200)
        })
    },
    chooseFlat(e) {
      if (!this.blockInfo) {
        this.fetchBlockInfo().then((response) => {
          this.handleClickEvent(e)
        })
      } else {
        this.handleClickEvent(e)
      }
    },
    handleClickEvent(e) {
      const selected = document.querySelectorAll('g[data-flat].active')
      if (selected.length) {
        selected.forEach((element) => {
          element.classList.remove('active')
        })
      }
      const target = e.target.closest('[data-flat]')
      this.chosenFlataNumber = target.getAttribute('data-flat')
      this.$axios
        .get('/flats', {
          params: { flat_number: this.chosenFlataNumber }
        })
        .then(({ data }) => {
          if (data.data.length) {
            this.activeFlat = data.data[0]
            this.$emit('flatSelected', this.chosenFlataNumber)
          } else {
            this.activeFlat = null
          }
        })
    },
    selectFlat() {
      this.$router.push({
        name: 'lang-sales-customize-id',
        params: {
          lang: this.locale,
          id: this.activeFlat.id
        }
      })
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
  .legend {
    display: flex;
    margin-left: 42px;
    position: absolute;
    bottom: 17px;
    &-item {
      display: flex;
      align-items: center;
      margin-left: 42px;
      font-family: $font;
      color: #494949;
      font-size: 11px;
      &::before {
        content: '';
        height: 6px;
        width: 16px;
        display: inline-block;
        margin: auto 12px;
      }
    }
    .sold {
      &::before {
        background: rgb(118, 120, 122);
      }
    }
    .available {
      &::before {
        background: rgb(0, 152, 121);
      }
    }
    .reserved {
      &::before {
        background: #bd8cbf;
      }
    }
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
}
.render-svg {
  height: 100%;
  width: 100%;
}
.render__info {
  position: absolute;
  opacity: 0.99;
  top: 19%;
  left: 68%;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
<style lang="scss">
.flat-picker {
  g[data-flat],
  polygon,
  g[data-flat] polygon {
    fill: rgb(118, 120, 122) !important;
  }
  g[data-flat].for_sale {
    fill: rgb(0, 152, 148) !important;
    polygon {
      fill: rgb(0, 152, 148) !important;
    }
  }
  g[data-flat].sold {
    fill: rgb(118, 120, 122) !important;
    polygon {
      fill: rgb(118, 120, 122) !important;
    }
  }
  g[data-flat].reserved {
    fill: #bd8cbf !important;
    polygon {
      fill: #bd8cbf !important;
    }
  }
  g[data-flat].for_sale.active,
  g[data-flat].for_sale:hover {
    polygon {
      fill: $orange !important;
    }
  }
}
.loading {
  display: flex;
  height: 100%;
  .lds-default {
    display: inline-block;
    position: relative;
    margin: auto;
    width: 80px;
    height: 80px;
  }
  .lds-default div {
    position: absolute;
    width: 6px;
    height: 6px;
    background: #494949;
    border-radius: 50%;
    animation: lds-default 1.2s linear infinite;
  }
  .lds-default div:nth-child(1) {
    animation-delay: 0s;
    top: 37px;
    left: 66px;
  }
  .lds-default div:nth-child(2) {
    animation-delay: -0.1s;
    top: 22px;
    left: 62px;
  }
  .lds-default div:nth-child(3) {
    animation-delay: -0.2s;
    top: 11px;
    left: 52px;
  }
  .lds-default div:nth-child(4) {
    animation-delay: -0.3s;
    top: 7px;
    left: 37px;
  }
  .lds-default div:nth-child(5) {
    animation-delay: -0.4s;
    top: 11px;
    left: 22px;
  }
  .lds-default div:nth-child(6) {
    animation-delay: -0.5s;
    top: 22px;
    left: 11px;
  }
  .lds-default div:nth-child(7) {
    animation-delay: -0.6s;
    top: 37px;
    left: 7px;
  }
  .lds-default div:nth-child(8) {
    animation-delay: -0.7s;
    top: 52px;
    left: 11px;
  }
  .lds-default div:nth-child(9) {
    animation-delay: -0.8s;
    top: 62px;
    left: 22px;
  }
  .lds-default div:nth-child(10) {
    animation-delay: -0.9s;
    top: 66px;
    left: 37px;
  }
  .lds-default div:nth-child(11) {
    animation-delay: -1s;
    top: 62px;
    left: 52px;
  }
  .lds-default div:nth-child(12) {
    animation-delay: -1.1s;
    top: 52px;
    left: 62px;
  }
  @keyframes lds-default {
    0%,
    20%,
    80%,
    100% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.5);
    }
  }
}
</style>
