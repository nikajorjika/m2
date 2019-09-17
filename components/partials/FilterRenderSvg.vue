<template>
  <div>
    <!-- <svg-render-image /> -->
    <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
      viewBox="0 0 230.4 149.8" style="enable-background:new 0 0 230.4 149.8;" xml:space="preserve">
    <style type="text/css">
      .st0{fill:#F26529;}
    </style>
    <image style="overflow:visible;enable-background:new;" width="960" height="624" xlink:href="@/assets/renders/render-small.jpg" transform="matrix(0.24 0 0 0.24 0 -6.728313e-06)">
    </image>
    <polygon class="st0" points="148.8,60.4 148.8,58 157,58 157,71 156,71 156,78.1 157,78.1 157.3,78.1 157.3,94.8 156.2,94.8 
      156.2,102.6 157.5,102.6 157.5,111.7 150.4,111.7 150.4,108.6 144.2,105.9 144.2,104.7 136.4,104.7 136,104.7 136,84.9 137.2,84.9 
      137.2,83.8 135.8,83.8 135.5,63.8 143.6,63.8 143.6,61.9 "
      :class="{active: chosenBlock === 1}"
      @click="handleClick(1)" 
    />
    <polygon
      class="st0" 
      points="130.8,50.8 131.5,34.7 196.5,18.4 196.5,34.6 193.1,35.6 193.9,39.2 136.9,54 136,49.7 "
      :class="{active: chosenBlock === 2}"
      @click="handleClick(2)" 
      />
    <polygon 
      class="st0"
      points="175.5,52.4 182.7,50.5 183.3,51.9 190.4,50.1 191.6,54 197.7,52 211.6,105.6 203.9,107.7 204.1,109 
      200.6,111.7 201.6,114.7 192.3,117.2 188.8,103.3 190.1,103 187.6,94.5 186.7,94.9 179.9,68.8 181,68.5 179.6,63.6 178.6,63.8 "
      :class="{active: chosenBlock === 3}"
      @click="handleClick(3)"
      />
    </svg>
  </div>
</template>

<script>
import SvgRenderImage from '@/assets/renders/block.svg'
export default {
  components: { SvgRenderImage },
  data() {
    return {
      chosenBlock: null
    }
  },
  methods: {  
    handleClick(number, event) {
      this.chosenBlock = number
      this.$emit('click', number)
    }
  }
}
</script>

<style lang="scss" scoped>
.st0 {
  opacity: 0;
  &.active {
    opacity: 1;
  }
}
</style>