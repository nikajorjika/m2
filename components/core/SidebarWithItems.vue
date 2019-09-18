<template>
  <div class="sidebar">
    <logo class="sidebar__logo" />
    <div class="sidebar__list">
      <nuxt-link
        v-for="(item, index) in items"
        :key="index"
        :to="item.path"
        class="sidebar__list__item"
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
    }
  },
  computed: {
    ...mapGetters(['locale'])
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
  &__logo {
    width: 43%;
    margin: 89px auto 0;
  }
  &__list {
    position: absolute;
    left: 20%;
    top: 39%;
    display: flex;
    flex-direction: column;
    &__item {
      margin: 20px 0;
      display: flex;
      flex-direction: column;
      text-decoration: none;
      color: #3c2270;
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
        font-family: $font;
        margin-top: 15px;
        text-align: center;
      }
    }
  }
}
</style>
