<template>
  <button class="session" @click="handleClick">
    <span>{{ buttonText }}</span>
    <login-icon :width="12" icon-color="#3c2270" />
  </button>
</template>

<script>
import LoginIcon from '@/components/icons/Login'
export default {
  components: { LoginIcon },
  computed: {
    buttonText() {
      return this.$auth.loggedIn
        ? this.$t('buttons.EndSession')
        : this.$t('buttons.authorize')
    }
  },
  methods: {
    handleClick() {
      if (this.$auth.loggedIn) {
        this.$auth.logout()
      }
      this.$router.push({ name: 'lang-sales-login' })
    }
  }
}
</script>

<style lang="scss" scoped>
.session {
  outline: none;
  border-radius: 18px;
  color: $purple;
  border: 1px solid $purple;
  padding: 7px 20px;
  background: transparent;
  display: flex;
  justify-items: center;
  font-family: $font;
  span {
    margin: auto;
    margin-right: 18px;
  }
}
</style>
