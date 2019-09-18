<template>
  <div class="sidebar">
    <nuxt-link class="link" :to="homepage">
      <logo class="sidebar__logo" />
    </nuxt-link>
  </div>
</template>

<script>
import Logo from './Logo'
export default {
  components: { Logo },
  props: {
    homepage: {
      type: [String, Object],
      default: ''
    }
  }
}
</script>

<style lang="scss" scoped>
.sidebar {
  background: #fff;
  width: 7%;
  display: flex;
  min-height: 100vh;
  margin-right: 3%;
  border-top-right-radius: 80px;
  box-shadow: 2px 3px 21.759999999999998px 10.24px rgba(67, 34, 114, 0.07);
  .link {
    display: inherit;
  }
  &__logo {
    width: 43%;
    margin: auto;
  }
}
</style>
