<template>
  <div class="flat-navigation">
    <ul class="flat-navigation__list">
      <li
        v-for="(item, index) in navData"
        :key="index"
        class="flat-navigation__list__item"
      >
        <nuxt-link :to="item.route" class="flat-navigation__link">
          <default-icon
            :icon-name="item.icon"
            :inactive-styles="inactiveStyle"
            :active-styles="$route.path === item.route ? activeStyles : null"
          />
          <span class="flat-navigation__link__text">{{ item.title }}</span>
        </nuxt-link>
      </li>
    </ul>
  </div>
</template>

<script>
import DefaultIcon from '../partials/DefaultIcon'
export default {
  components: { DefaultIcon },
  data() {
    return {
      inactiveStyle: {
        backgroundImage:
          'linear-gradient(0,rgba(255,255,255, 1),rgba(255,255,255, 1) 100%)',
        height: '23px',
        width: '28px'
      },
      activeStyles: {
        backgroundImage:
          'linear-gradient(0, rgba(104,79,120,1) 50%, rgba(226,100,121,1) 100%)',
        height: '23px',
        width: '28px'
      },
      navData: [
        {
          icon: 'appartament',
          route: `/`,
          title: this.$t('navigation.flat')
        },
        {
          icon: 'makeover',
          route: `${this.$store.state.locale}/makeover`,
          title: this.$t('navigation.renovation')
        },
        {
          icon: 'furniture',
          route: `${this.$store.state.locale}/furniture`,
          title: this.$t('navigation.furniture')
        },
        {
          icon: 'decor',
          route: `${this.$store.state.locale}/decoration`,
          title: this.$t('navigation.decoration')
        },
        {
          icon: 'technick',
          route: `${this.$store.state.locale}/supply`,
          title: this.$t('navigation.supply')
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
