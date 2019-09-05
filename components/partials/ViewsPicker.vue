<template>
  <div class="views-picker">
    <div v-for="(item, index) in views" :key="index" class="views-picker__item" :class="{ active: isActive(item) }" @click="checkItem(item)">
      <div class="views-picker__item__direction">
        <check-icons icon-color="#fff" height="11px" width="9px" />
      </div>
      <div class="views-picker__item__label">
        {{item}}
      </div>
      <div class="views-picker__item__checked" v-show="isActive(item)">
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
    views: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      selected: []
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
.views-picker {
  display: grid;
  grid-template-columns: repeat(2, 251px);
  grid-column-gap: 116px;
  grid-row-gap: 74px;
  &__item {
    background: #fbf7f2;
    border-top-left-radius: 22px;
    border-bottom-right-radius: 22px;
    font-family: $font;
    color: #676766;
    font-size: 11px;
    display: flex;
    align-items: center;
    position: relative;
    transition: transform 200ms;
    overflow: hidden;
    height: 100%;
    &__direction {
      background: linear-gradient(45deg, #684f78 1%,#e26479 100%); 
      width: 52px;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;  
    }
    &__label {   
      padding: 17px 11px 18px 33px;
    }
    &.active {
      transform: scale(1.1);
      box-shadow: 0px 4px 21.7px 10.24px rgba(242, 101, 41, 0.1);
    }
    &__checked {
      position: absolute;
      right: 19px;
      top: 10px;
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