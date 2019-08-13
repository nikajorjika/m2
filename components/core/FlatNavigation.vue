<template>
  <div class="flat-navigation">
    <ul class="flat-navigation__list">
      <li
        v-for="(item, index) in navData"
        :key="index"
        class="flat-navigation__list__item"
      >
        <nuxt-link :to="item.route" class="flat-navigation__link">
          <component
            :is="item.component"
            :icon-color="$route.path === item.route ? 'url(#gradient)' : '#fff'"
            class="flat-navigation__link__icon"
          />
          <span class="flat-navigation__link__text">{{ item.title }}</span>
        </nuxt-link>
      </li>
    </ul>
  </div>
</template>

<script>
import ArrowIcon from '@/components/icons/ArrowRight'
import FlatIcon from '@/components/icons/Appartament'
import RenovationIcon from '@/components/icons/Makeover'
import FurnitureIcon from '@/components/icons/Furniture'
import SupplyIcon from '@/components/icons/Technic'
import DecorationIcon from '@/components/icons/Decor'

export default {
  components: {
    ArrowIcon,
    FlatIcon,
    RenovationIcon,
    FurnitureIcon,
    SupplyIcon,
    DecorationIcon
  },
  data() {
    return {
      navData: [
        {
          icon: 'appartament',
          route: `/${this.$store.state.locale}`,
          title: this.$t('navigation.flat'),
          component: FlatIcon
        },
        {
          icon: 'makeover',
          route: `/${this.$store.state.locale}/makeover`,
          title: this.$t('navigation.renovation'),
          component: RenovationIcon
        },
        {
          icon: 'furniture',
          route: `/${this.$store.state.locale}/furniture`,
          title: this.$t('navigation.furniture'),
          component: FurnitureIcon
        },
        {
          icon: 'decor',
          route: `/${this.$store.state.locale}/decoration`,
          title: this.$t('navigation.decoration'),
          component: DecorationIcon
        },
        {
          icon: 'technick',
          route: `/${this.$store.state.locale}/supply`,
          title: this.$t('navigation.supply'),
          component: SupplyIcon
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.flat-navigation {
  margin-top: 97px;
  background: $gradient-2;
  border-top-left-radius: 13px;
  &__list {
    list-style: none;
    display: flex;
    justify-content: space-between;
    &__item {
      flex: 1;
      width: 168px;
      align-items: center;
      height: 92px;
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
    padding: 18px 66px;
    margin: auto;
    width: 168px;
    letter-spacing: 1px;
    &__text {
      margin-top: 15px;
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
