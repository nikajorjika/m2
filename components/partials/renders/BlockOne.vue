<template>
  <div>
    <svg
      id="Layer_1"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      x="0px"
      y="0px"
      viewBox="0 0 960 607"
      style="enable-background:new 0 0 960 607;"
      xml:space="preserve"
    >
      <style type="text/css">
        .block-one-0 {
          opacity: 0;
        }
      </style>
      <image
        style="overflow:visible;"
        width="960"
        height="607"
        xlink:href="@/assets/renders/block-one.png"
      ></image>
      <polygon
        class="block-one-0"
        :class="{ active: active === 9 }"
        points="205,50.7 443.7,81.3 443.7,86.7 538.3,98 544.3,94.7 564.3,98 564.3,100.8 647.1,110.4 652.6,108.6 
      670.6,110.4 670.6,114 742.4,123.1 750,120.9 765.6,121.4 765.6,126 816.8,134.3 816.8,138.4 802.4,143.5 802.5,152.6 805.4,152.6 
      805.4,161.6 815.4,161.6 815.3,169.4 215,106.7 214.5,102.2 212,102.2 203.7,58.2 203.7,50.7 "
        @click="activateFloor(9)"
      />
      <polygon
        class="block-one-0"
        :class="{ active: active === 8 }"
        points="215,106.7 815.3,169.4 801.8,173.3 801.8,180.5 806.5,180.5 806,194.8 802.5,194.8 215,146 "
        @click="activateFloor(8)"
      />
      <polygon
        class="block-one-0"
        :class="{ active: active === 7 }"
        points="215,146 806,194.8 802,196.4 802.1,210 806,210 806,224.2 215,182.5 "
        @click="activateFloor(7)"
      />
      <polygon
        class="block-one-0"
        :class="{ active: active === 6 }"
        points="215,182.5 806,224.2 802.9,224.8 803,237.9 806,237.9 806,252.1 215,220 "
        @click="activateFloor(6)"
      />
      <polygon
        class="block-one-0"
        :class="{ active: active === 5 }"
        points="215,220 806,252.1 802.8,252.4 803,265.9 806.9,265.9 806.9,279 803,280 215,257.3 "
        @click="activateFloor(5)"
      />
      <polygon
        class="block-one-0"
        :class="{ active: active === 4 }"
        points="215,257.3 803,280 803,294 806.9,294 806.9,308 215,295 "
        @click="activateFloor(4)"
      />
      <polygon
        class="block-one-0"
        :class="{ active: active === 3 }"
        points="215,295 806.9,308 803.9,308.4 804,322 806.9,322 806.9,336 804.1,336 212.7,332.7 "
        @click="activateFloor(3)"
      />
      <polygon
        class="block-one-0"
        :class="{ active: active === 2 }"
        points="212.7,332.7 806.9,336 803.8,336.7 803.9,350.8 806.9,350.8 806.9,360.8 817.1,360.8 212.7,364.7 "
        @click="activateFloor(2)"
      />
      <polygon
        class="block-one-0"
        :class="{ active: active === 1 }"
        points="233.7,401.3 294.5,408.8 440.5,405.3 440,397.3 811.5,389 811.5,379.8 798.8,378.9 798.7,367.7 
      233.7,372.8 "
        @click="activateFloor(1)"
      />
      <polygon
        class="block-one-0"
        :class="{ active: active === 0 }"
        points="233.7,401.3 294.5,408.8 440.5,405.3 440,397.3 811.5,389 813.2,389 813.2,417.7 778.8,417.7 
      773.3,417.7 773.3,420 765,420 765,422.3 731.5,422.3 679.8,424.7 628,426.2 614.3,426.2 614.3,427.8 513.3,430.5 434,434.3 
      434,438.3 436.5,438.3 436.5,448.5 291.7,455.3 247,442.3 233.7,441.7 "
        @click="activateFloor(0)"
      />
    </svg>
  </div>
</template>

<script>
export default {
  props: {
    activeFloor: {
      type: Number,
      default: null
    }
  },
  data() {
    return {
      active: this.activeFloor
    }
  },
  methods: {
    activateFloor(floor) {
      this.active = floor
      this.$emit('change', floor)
    }
  }
}
</script>

<style lang="scss" scoped>
svg {
  height: 100%;
  width: auto;
}
.block-one-0 {
  &.active {
    opacity: 0.45;
    fill: #e28d39;
  }
}
</style>
