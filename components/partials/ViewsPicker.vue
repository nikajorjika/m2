<template>
  <div class="views-picker">
    <div
      v-for="(item, index) in views"
      :key="index"
      :class="{ active: isActive(item) }"
      @click="checkItem(item)"
      class="views-picker__item"
    >
      <div class="views-picker__item__direction">
        <compass-icon
          class="compass-icon"
          icon-color="#fff"
          height="14px"
          width="14px"
        />
      </div>
      <div class="views-picker__item__label">
        {{ itemName(item.name) }}
      </div>
      <div v-show="isActive(item)" class="views-picker__item__checked">
        <check-icon icon-color="#f26529" height="11px" width="9px" />
      </div>
    </div>
  </div>
</template>

<script>
import CompassIcon from '@/components/icons/CompassDirectional'
import CheckIcon from '@/components/icons/Check'
export default {
  components: { CheckIcon, CompassIcon },
  props: {
    views: {
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
      selected: [...this.preselected]
    }
  },
  methods: {
    checkItem(item) {
      if (this.isActive(item)) {
        this.selected = this.selected.filter((i) => i.value !== item.value)
      } else {
        this.selected = [...this.selected, item]
      }
      this.$emit('change', this.selected)
    },
    isActive(item) {
      return this.selected.find((i) => i.value === item.value)
    },
    itemName(name) {
      switch (name) {
        case 'გასაქირავებლად':
          return this.$t('labels.forRent')
        case 'ჩემი დიდი ოჯახისთვის':
          return this.$t('labels.forMyBigFamily')
        case 'ახალგაზრდა ოჯახისთვის':
          return this.$t('labels.forYoungFamily')
        case 'წყვილისთვის':
          return this.$t('labels.forCouple')
        case 'მარტო ერთისთვის':
          return this.$t('labels.forAlone')
        default:
          return name
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.views-picker {
  display: grid;
  grid-template-columns: repeat(3, 251px);
  grid-column-gap: 47px;
  grid-row-gap: 44px;
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
    .compass-icon {
      transform: rotate(-45deg);
    }
    &__direction {
      background: linear-gradient(45deg, #684f78 1%, #e26479 100%);
      width: 52px;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    &__label {
      padding: 17px 11px 18px 33px;
      font-size: 13px;
      text-transform: uppercase;
    }
    &.active {
      transform: scale(1.1);
      box-shadow: 0 4px 21.7px 10.24px rgba(242, 101, 41, 0.1);
    }
    &__checked {
      position: absolute;
      right: 19px;
      top: 50%;
      transform: translateY(-50%);
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
