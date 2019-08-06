<template>
  <div class="flat-navigation">
    <ul class="flat-navigation__list">
      <li
        v-for="(item, index) in navData"
        :key="index"
        class="flat-navigation__list__item"
      >
        <nuxt-link to="/">
          <default-icon :icon-name="item.icon" :custom-styles="inactiveStyle" />
          <span>{{ item.title }}</span>
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
          'linear-gradient(0,rgba(255,255,255, 1),rgba(255,255,255, 1) 100%)'
      },
      navData: [
        {
          icon: 'appartament',
          route: `${this.$store.state.locale}/appartament`,
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
  &__list {
    list-style: none;
    display: flex;
    justify-content: space-between;
    &__item {
      flex: 1;
      width: 168px;
    }
  }
}
</style>
