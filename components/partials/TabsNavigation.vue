<template>
  <div class="flat-navigation">
    <ul class="flat-navigation__list">
      <li
        v-for="(item, index) in tabData"
        :key="index"
        class="flat-navigation__list__item"
      >
        <div
          @click="handleTabChange(index)"
          class="flat-navigation__link"
          :class="{active: index === activeTabIndex}"
        >
          <component
            :is="item.component"
            :icon-color="
              index === activeTabIndex
                ? 'url(#gradient)'
                : '#fff'
            "
            width="16"
            height="16"
            class="flat-navigation__link__icon"
          />
          <span class="flat-navigation__link__text">{{ $t(item.title) }}</span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { isSamePath } from '@/utils/Route'

export default {
  props: {
    tabData: {
      type: Array,
      default: () => []
    },
    activeTabIndex: {
      type: Number,
      default: () => 0
    }
  },
  computed: {
    ...mapGetters(['locale'])
  },
  methods: {
    isSamePath: (a, b) => isSamePath(a, b),
    handleTabChange(index) {
      this.$emit('tabChange', index)
    }
  }
}
</script>

<style lang="scss" scoped>
.flat-navigation {
  background: $gradient-2;
  border-top-left-radius: 13px;
  &__list {
    list-style: none;
    display: flex;
    justify-content: space-between;
    margin-right: 60px;
    &__item {
      flex: 1;
      width: 140px;
      align-items: center;
      height: 60px;
    }
  }
  &__link {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-decoration: none;
    color: #fff;
    height: 100%;
    font-family: $font-caps;
    padding: 0 44px;
    margin: auto;
    width: 140px;
    letter-spacing: 1px;
    &.active {
      color: inherit;
    }
    &__text {
      margin-top: 10px;
      font-size: 12px;
      font-weight: 900;
      text-transform: uppercase;
      white-space: nowrap;
    }
    &__icon {
      z-index: 1;
    }
    &.active {
      position: relative;
      &:before {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        border-top-left-radius: 26px;
        border-top-right-radius: 26px;
        height: calc(100% + 22px);
        background: #fff;
        z-index: 0;
      }
      .flat-navigation__link__text {
        color: #594495;
        z-index: 1;
      }
    }
  }
}
</style>
