<template>
  <div class="flat-navigation">
    <ul class="flat-navigation__list" :class="{ inactive: !isFilter }">
      <li
        v-for="(item, index) in navData.filter"
        :key="index"
        class="flat-navigation__list__item to-left"
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
    <ul class="flat-navigation__list" :class="{ inactive: !isCustomize }">
      <li
        v-for="(item, index) in navData.customize"
        :key="index"
        class="flat-navigation__list__item to-right"
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
            height="18"
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
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    ...mapGetters(['locale']),
    isCustomize() {
      return this.isThisRoute('customize')
    },
    isFilter() {
      return this.isThisRoute('filter')
    }
  },
  methods: {
    isSamePath: (a, b) => isSamePath(a, b),
    openInactive(module) {
      if (!this.isThisRoute(module)) {
        this.$router.push({
          name: `lang-sales-${module}`,
          params: { lang: this.locale }
        })
      }
    },
    isThisRoute(module) {
      const regex = new RegExp(`^\\/\\w*\\/sales\\/${module}\\/?(.*)$`, 'i')
      const str = this.$route.fullPath
      if (regex.exec(str) !== null) {
        return true
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.flat-navigation {
  background: $gradient-2;
  border-top-left-radius: 13px;
  display: flex;
  &__list {
    list-style: none;
    display: flex;
    justify-content: space-between;
    margin-right: 25px;
    padding-left: 10px;
    width: 100%;
    transition: 0.4s;
    &__item {
      flex: 1;
      width: 42px;
      display: flex;
      align-items: center;
      height: 60px;
    }
    &.inactive {
      width: 42px;
      margin: 0;
      padding: 0;
      position: relative;
      transition: 0.4s;
      &:first-child {
        margin-left: 54px;
      }
      &:last-child {
        margin-right: 54px;
      }
    }
    &.inactive & {
      &__item {
        background: white;
        min-width: 0;
        max-width: 100%;
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
        transition: 0.4s;
        position: absolute;
        .flat-navigation__link {
          width: 0;
          overflow: hidden;
          min-width: 0;
          padding: 0;
          transition: width 0.3s opacity 0.2s;
          opacity: 0;
        }
        &.to-right:nth-child(5n + 2) {
          opacity: 0.6;
          left: 13px;
        }
        &.to-right:nth-child(5n + 3) {
          opacity: 0.4;
          left: 26px;
        }
        &.to-right:nth-child(5n + 4) {
          opacity: 0.2;
          left: 39px;
        }
        &.to-right:nth-child(5n + 5) {
          opacity: 0.1;
          left: 52px;
        }
        &.to-left:nth-child(6n + 6) {
          z-index: 7;
        }
        &.to-left:nth-child(6n + 5) {
          opacity: 0.6;
          right: 13px;
          z-index: 6;
        }
        &.to-left:nth-child(6n + 4) {
          opacity: 0.5;
          right: 13px;
          z-index: 5;
        }
        &.to-left:nth-child(6n + 4) {
          opacity: 0.4;
          right: 26px;
          z-index: 4;
        }
        &.to-left:nth-child(6n + 2) {
          opacity: 0.2;
          right: 39px;
          z-index: 2;
        }
        &.to-left:nth-child(6n + 1) {
          opacity: 0.1;
          right: 52px;
          z-index: 1;
        }
      }
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
    padding: 0 5px;
    margin: auto;
    width: auto;
    width: 100%;
    min-width: 112px;
    letter-spacing: 1px;
    transition: width 0.7s opacity 0.2s;
    opacity: 1;
    white-space: nowrap;
    &.nuxt-link-exact-active {
      color: inherit;
    }
    &__text {
      margin-top: 10px;
      font-size: 9px;
      font-weight: 900;
      // text-transform: uppercase;
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
