<template>
  <div class="floor-picker">
    <component :is="render" class="flat-picker render-svg"/>
    <transition name="fade">
      <div
        v-if="activeFlat"
        ref="infoBlock"
        class="render__info"
      >
        <block-hover-info
          :flats-count="blockInfo.sellableFlats"
          :block-number="blockInfo.number"
          @click="selectFlat"
        />
      </div>
    </transition>
    <div class="legend">
      <div class="sold legend-item">
        {{$t('labels.sold')}}
      </div>
      <div class="available legend-item">
        {{$t('labels.available')}}
      </div>
      <div class="reserved legend-item">
        {{$t('labels.reserved')}}
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import upperFirst from 'lodash/upperFirst'
import camelCase from 'lodash/camelCase'
import BlockOne from '@/components/partials/renders/BlockOne'
import BlockTwo from '@/components/partials/renders/BlockTwo'
import BlockThree from '@/components/partials/renders/BlockThree'
import BlockHoverInfo from '@/components/partials/BlockHoverInfo'
import { mapGetters } from 'vuex'
export default {
  components: {
    BlockOne,
    BlockHoverInfo,
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
    this.fetchBlockInfo()
    this.floorRender()
    // this.renderSvgs()
  },
  data() {
    return {
      blockInfo: null,
      activeFlat: null,
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
      if(!this.blockInfo) return
      const floors = this.blockInfo.floors.map(item => item.number)
      return floors.sort((a, b) => b - a)
    }
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
    changeFloor(floor) {
      this.activeFloor = floor
      this.$emit('floorChosen', floor)
    },
    floorRender() {
      this.render = () => import(`@/components/floor-renders/block-${this.block}/block-${this.block}-${this.floor}.vue`)
      this.registerEvents()
    },
    registerEvents() {
      this.renderList = document.querySelectorAll('g[data-flat]')
      if(this.renderList.length === 0) {
        setTimeout(() => {
          this.registerEvents()
          this.fetchFlatStatuses()
        }, 200)
      }else {
        this.renderList.forEach(element => {
            element.addEventListener('click', this.chooseFlat)
        });
      }
    },
    fetchFlatStatuses() {
      this.$axios.get(`get/floor/${this.block}/${this.floor}`)
        .then(({data}) => {
          data.map((item) => {
            const domObject = document.querySelector(`g[data-flat="${item.flat_number}"]`)
            if(domObject && item.status && item.status.hasOwnProperty('en')) {
              domObject.classList.add(item.status.en)
            }
          })
        })
    },
    chooseFlat(e) {
      if(!this.blockInfo) {
        this.fetchBlockInfo().then((response) => {
          this.handleClickEvent(e)
        })
      }else {
        this.handleClickEvent(e)
      }
    },
    handleClickEvent(e){ 
      const selected = document.querySelectorAll('g[data-flat].active')
      if(selected.length){
        selected.forEach(element => { 
          element.classList.remove('active')
        })
      }
      let target = e.target.closest('[data-flat]')
      let flatNumber = target.getAttribute('data-flat')
      this.$axios
        .get('/flats', {
          params: { flat_number: flatNumber }
        })
        .then(({ data }) => {
          if(data.data.length) {
            this.activeFlat = data.data[0]
            this.$emit('flatSelected', flatNumber)
          }else {
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
        background: #8393ca;
      }
    }
    .available {
      &::before {
        background: #f69679;
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
.flat-picker  {
  g[data-flat],
  polygon,
  g[data-flat]
  polygon {
    fill: #8393ca !important;
  }
  g[data-flat].for_sale {
    fill: $orange !important;
    polygon {
      fill: $orange !important;
    }
  }
  g[data-flat].sold {
    fill: #8393ca !important;
    polygon {
      fill: #8393ca !important;
    }
  }
  g[data-flat].reserved {
    fill: #bd8cbf !important;
    polygon {
      fill: #bd8cbf !important;
    }
  }
  g[data-flat].sold.active,
  g[data-flat].sold:hover{ 
    polygon {
      fill: $orange !important;
    }
  }
}
</style>