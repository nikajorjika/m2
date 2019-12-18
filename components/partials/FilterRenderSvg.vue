<template>
  <div>
    <svg
      id="Layer_1"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      x="0px"
      y="0px"
      viewBox="0 0 772 389"
      style="enable-background:new 0 0 772 389;"
      xml:space="preserve"
    >
      <style type="text/css">
        .st1 {
          fill: #f26529;
        }
      </style>
      <image
        style="overflow:visible;enable-background:new;"
        width="100%"
        height="100%"
        xlink:href="@/assets/renders/render-small-2.png"
      ></image>
      <a ref="something"></a>
      <g ref="group" class="st0">
        <polygon
          ref="blockOne"
          class="st1"
          points="185.6,134.7 187.8,78.5 414.7,21.5 414.7,78.1 403.3,81.6 405.9,94.3 207.1,145.7 204.1,130.7"
          :class="{ active: chosenBlock === 1 }"
          @click="handleClick(1)"
        />
        <polygon
          ref="blockTwo"
          class="st1"
          points="341.8,139.5 367.7,132.5 369.5,137.8 394.9,131.2 399.3,144.8 420.8,138.2 470.4,329.5 442.8,336.5 
          443.6,341.3 431.3,351 434.9,361.5 401.5,370.3 388.8,321.2 393.6,319.8 384.8,289.6 381.8,291.3 357.2,197.9 361.1,197 
          356.3,179.4 352.8,180.3"
          :class="{ active: chosenBlock === 2 }"
          @click="handleClick(2)"
        />
        <polygon
          ref="blockThree"
          class="st1"
          points="249.3,168 249.3,159.3 278.7,159.3 278.7,205.8 275.1,205.8 275.1,231.2 278.7,231.2 279.5,231.2 
          279.5,290.9 275.6,290.9 275.6,318.5 280.4,318.5 280.4,351.4 255,351.4 255,340 233,330.4 233,326.4 204.9,326.4 203.6,326.4 
          203.6,255.3 208,255.3 208,251.8 203.2,251.8 201.9,180.3 230.8,179.9 230.8,173.3"
          :class="{ active: chosenBlock === 3 }"
          @click="handleClick(3)"
        />
      </g>
    </svg>
  </div>
</template>

<script>
export default {
  props: {
    preselected: {
      type: Number,
      default: null
    }
  },
  data() {
    return {
      chosenBlock: this.preselected ? this.preselected : null
    }
  },
  mounted() {
    if (this.preselected) {
      const event = new Event('click', { bubbles: true, cancelable: false })
      const tmp = {
        42: this.$refs.blockOne,
        43: this.$refs.blockTwo,
        44: this.$refs.blockThree
      }
      tmp[this.preselected].dispatchEvent(event)
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
.st1 {
  opacity: 0;
  &.active {
    opacity: 0.85;
  }
}
</style>
