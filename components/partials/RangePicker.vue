<template>
  <div class="range-picker">
    <div v-for="(item, index) in ranges" :key="index" class="range-picker__item" :class="{ active: isActive(item) }" @click="checkItem(item)">
      <div class="range-picker__item__label">
        {{item}}
      </div>
      <div class="range-picker__item__checked" v-show="isActive(item)">
        <check-icons icon-color="#f26529" height="11px" width="9px" />
      </div>
    </div>
  </div>
</template>

<script>
import CheckIcons from '@/components/icons/Check'
export default {
  components: { CheckIcons },
  props: {
    ranges: {
      type: Array,
      default: () => []
    },
    preselected: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      selected: this.preselected
    }
  },
  methods: {
    checkItem(item) {
      if(this.isActive(item)) {
        this.selected = this.selected.filter((i)=> i !== item)
      } else {
        this.selected.push(item)
      }
    },
    isActive(item) {
      return this.selected.includes(item)
    }
  }
}
</script>

<style lang="scss" scoped>
.range-picker {
  display: grid;
  grid-template-columns: repeat(3, 153px);
  grid-column-gap: 79px;
  grid-row-gap: 57px;
  &__item {
    background: #fbf7f2;
    padding: 26px 11px 26px 33px;
    border-top-left-radius: 22px;
    border-bottom-right-radius: 22px;
    font-family: $font;
    color: #676766;
    font-size: 11px;
    display: flex;
    align-items: center;
    position: relative;
    transition: transform 200ms;
    &.active {
      transform: scale(1.1);
      box-shadow: 0px 4px 21.7px 10.24px rgba(242, 101, 41, 0.1);
    }
    &__checked {
      position: absolute;
      right: 11px;
      top: 19px;
      border: dashed 1px #f26529;
      border-radius: 7px;
      width: 24px;
      height: 24px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
}
</style>