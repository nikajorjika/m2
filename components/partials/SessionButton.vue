<template>
  <button class="session" @click="handleClick">
    <span>{{ buttonText }}</span>
    <login-icon :width="12" icon-color="#3c2270" />
  </button>
</template>

<script>
import LoginIcon from '@/components/icons/Login'
import { mapActions, mapGetters } from 'vuex'
export default {
  components: { LoginIcon },
  computed: {
    ...mapGetters({
      user: 'auth/user',
      locale: 'locale'
    }),
    isLoggedIn() {
      return this.user && this.$cookies.get('auth._token.local')
    },
    buttonText() {
      return this.isLoggedIn
        ? this.$t('buttons.EndSession')
        : this.$t('buttons.authorize')
    }
  },
  methods: {
    ...mapActions({
      logout: 'auth/logout'
    }),
    handleClick() {
      if (this.isLoggedIn) {
        this.logout().then(() => {
          this.$router.push({ 
            name: 'lang-sales',
            params: {
              lang: this.locale
            }
          })
        })
      } else {
        this.$router.push({ 
          name: 'lang-sales-login',
          params: {
            lang: this.locale
          } 
        })
      }
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
