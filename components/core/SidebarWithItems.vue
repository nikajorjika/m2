<template>
  <div class="sidebar">
    <nuxt-link class="link" :to="defaultHomepage">
      <logo class="sidebar__logo" />
    </nuxt-link>
    <div class="sidebar__list">
      <nuxt-link
        v-for="(item, index) in items"
        :key="index"
        :to="item.path"
        class="sidebar__list__item"
        :class="{
          hide: !isSales && item.path === `/${locale}/sales/registration`
        }"
      >
        <div class="sidebar__list__item__icon">
          <component
            :is="item.component"
            icon-color="url(#gradient)"
            width="12px"
            height="12px"
          />
        </div>
        <div class="sidebar__list__item__label">
          {{ item.title[locale] }}
        </div>
      </nuxt-link>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Logo from './Logo'
export default {
  components: { Logo },
  props: {
    items: {
      type: Array,
      default: () => []
    },
    homepage: {
      type: [String, Object],
      default: ''
    }
  },
  computed: {
    ...mapGetters(['locale']),
    isSales() {
      return !this.$cookies.get('paveleon-planshet')
    },
    defaultHomepage: function() {
      const app = this.$cookies.get('paveleon-app')
      return this.homepage !== '' ? this.homepage :`/${this.locale}/${app}`
    }
  }
}
</script>

<style lang="scss" scoped>
.sidebar {
  background: #fff;
  width: 7%;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  position: relative;
  margin-right: 3%;
  border-top-right-radius: 80px;
  box-shadow: 2px 3px 21.76px 10.24px rgba(67, 34, 114, 0.07);
  .link {
    display: inherit;
  }
  &__logo {
    width: 43%;
    margin: 89px auto 0;
  }
  &__list {
    position: absolute;
    left: 50%;
    top: 39%;
    display: flex;
    flex-direction: column;
    transform: translateX(-50%);
    &__item {
      margin: 20px 0;
      display: flex;
      flex-direction: column;
      text-decoration: none;
      color: #3c2270;
      &.hide {
        display: none;
      }
      &:last-child {
        display: none;
      }
      &:visited {
        color: #3c2270;
      }
      &__icon {
        background: #f7f6f9;
        border-radius: 16px;
        margin: 0 auto;
        padding: 6px 20px;
      }
      &__label {
        font-size: 12px;
        font-family: $font-caps;
        margin-top: 15px;
        font-weight: 600;
        text-align: center;
      }
    }
  }
}
</style>
<style>
[lang='en'] .sidebar__list__item__label {
  font-weight: 800;
}
</style>
