<template>
  <button class="session" @click="handleClick">
    <span>{{ buttonText }}</span>
    <login-icon :width="12" icon-color="#3c2270" />
    <popup-confirm
      v-if="showModal"
      :question="$t('modal.end_session_prompt')"
      @accept="handleLogout"
      @decline="showModal = false"
      @closed="showModal = false"
    />
  </button>
</template>

<script>
import LoginIcon from '@/components/icons/Login'
import PopupConfirm from '@/components/partials/modals/PopupWithConfirmation'
import { mapActions, mapGetters } from 'vuex'
export default {
  components: { LoginIcon, PopupConfirm },
  data() {
    return {
      showModal: false
    }
  },
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
        this.showModal = true
      } else {
        this.$router.push({ 
          name: 'lang-sales-login',
          params: {
            lang: this.locale
          } 
        })
      }
    },
    handleLogout() {
      this.logout().then(() => {
        this.showModal = false
        this.$router.push({ 
          name: 'lang-sales',
          params: {
            lang: this.locale
          }
        })
      })
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
