<template>
  <div class="list-card" :class="`list-card--${listStyle}`">
    <div
      v-for="(item, index) in filteredItems"
      :key="index"
      class="list-card__item"
      :class="`list-card__item--${listStyle}`"
    >
      <div class="list-card__item__label">
        {{ item.label }}
      </div>
      <div
        class="list-card__item__value"
        :class="`list-card__item__value--${listStyle}`"
      >
        {{ item.value }}
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    items: {
      type: Array,
      default: () => []
    },
    listStyle: {
      type: String,
      default: 'white'
    }
  },
  computed: {
    filteredItems() {
      return this.items.filter((item) => !!item)
    }
  }
}
</script>
<style lang="scss">
.list-card {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border-radius: 17px;
  &--white {
    color: #494949;
    background: #fff;
    font-family: $font-caps;
    font-size: 11px;
    letter-spacing: 1px;
    font-weight: 900;
    box-shadow: 4px 6px 34.56px 1.44px rgba(242, 101, 41, 0.16);
  }
  &--gradient {
    color: #ffffff;
    position: relative;
    opacity: 0.6;
    font-family: $font;
    font-size: 13px;
    &:before {
      content: '';
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      z-index: 0;
      position: absolute;
      background: linear-gradient(
        to right,
        rgba(104, 79, 120, 1) 0%,
        rgba(226, 100, 121, 1) 100%
      );
    }
  }
  &__item {
    border-bottom: 1px solid #f3ede7;
    display: flex;
    justify-content: space-between;
    z-index: 1;
    &--white {
      padding: 19px 23px 14px 25px;
    }
    &--gradient {
      padding: 19px 9px 19px 25px;
      &:last-child {
        border-bottom: none;
      }
    }
    &__label {
      color: inherit;
      font-family: inherit;
      font-size: inherit;
      letter-spacing: 1px;
    }
    &__value {
      &--white {
        color: #4b3f99;
        margin-left: auto;
      }
      &--gradient {
        color: #fff;
      }
    }
  }
}
</style>
