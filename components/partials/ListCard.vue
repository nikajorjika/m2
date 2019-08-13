<template>
  <div class="list-card" :class="`list-card--${listStyle}`">
    <div
      v-for="(item, index) in items"
      :key="index"
      class="list-card__item"
      :class="`list-card__item--${listStyle}`"
    >
      <div class="list-card__item__label">
        {{ $t(item.label) }}
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
      type: [Array],
      default: () => []
    },
    listStyle: {
      type: [String],
      default: 'white'
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
    font-size: 14px;
  }
  &--gradient {
    color: #ffffff;
    background: $gradient-1;
    font-family: $font;
    font-size: 18px;
  }
  &__item {
    border-bottom: 1px solid #f3ede7;
    display: flex;
    &--white {
      padding: 26px 33px 22px 42px;
    }
    &--gradient {
      padding: 10px 33px 10px 42px;
    }
    &__label {
      color: inherit;
      font-family: inherit;
      font-size: inherit;
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
