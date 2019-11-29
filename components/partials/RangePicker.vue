<template>
  <div class="range-picker">
    <div
      v-for="(item, index) in ranges"
      :key="index"
      class="range-picker__item"
      :class="{ active: isActive(item) }"
      @click="checkItem(item)"
    >
      <div class="range-picker__item__icon">
        <component :is="item.icon" />
      </div>
      <div class="range-picker__item__label">
        {{ item.name }}
      </div>
      <div v-show="isActive(item)" class="range-picker__item__checked">
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
    },
    multiple: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      selected: this.preselected
    }
  },
  methods: {
    checkItem(item) {
      if(this.multiple) {
        if (this.isActive(item)) {
          this.selected = this.selected.filter((i) => i !== item)
        } else {
          this.selected = [...this.selected, item]
        }
      }else {
        if(this.selected.filter((i) => i === item).length > 0) {
          this.selected = []
        } else {
          this.selected = [ item ]
        }
      }
      this.$emit('change', this.selected)
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
  grid-template-columns: repeat(3, 220px);
  grid-column-gap: 51px;
  grid-row-gap: 52px;
  &__item {
    background: #fbf7f2;
    border-top-left-radius: 22px;
    border-bottom-right-radius: 22px;
    font-family: $font-caps;
    font-weight: bold;
    color: #676766;
    font-size: 11px;
    display: flex;
    align-items: center;
    position: relative;
    transition: transform 200ms;
    &__label {
      padding: 17px 10px;
      flex: 1;
    }
    &.active {
      transform: scale(1.1);
      box-shadow: 0px 4px 21.7px 10.24px rgba(242, 101, 41, 0.1);
    }
    &__icon {
      width: 61px;
      height: 100%;
      margin: auto;
      display: flex;
      justify-content: center;
    }
    &__checked {
      position: absolute;
      right: 16px;
      top: 9px;
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
