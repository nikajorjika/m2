<template>
  <div class="flat-navigation">
    <ul class="flat-navigation__list">
      <li
        v-for="(item, index) in navData"
        :key="index"
        class="flat-navigation__list__item"
      >
        <nuxt-link
          :to="`/${locale}${item.route}`"
          class="flat-navigation__link"
        >
          <component
            :is="item.component"
            :icon-color="
              isSamePath($route.path, `/${locale}${item.route}`)
                ? 'url(#gradient)'
                : '#fff'
            "
            width="16"
            height="16"
            class="flat-navigation__link__icon"
          />
          <span class="flat-navigation__link__text">{{ $t(item.title) }}</span>
        </nuxt-link>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { isSamePath } from '@/utils/Route'

export default {
  props: {
    navData: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    ...mapGetters(['locale'])
  },
  methods: {
    isSamePath: (a, b) => isSamePath(a, b)
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
      width: 112px;
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
    width: 112px;
    letter-spacing: 1px;
    &.nuxt-link-exact-active {
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
    &.nuxt-link-exact-active {
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
