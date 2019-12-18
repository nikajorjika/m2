<template>
  <div class="page-flat-container">
    <div class="page-flat-number">
      <div v-if="!codeSent" class="page-flat-number__title-container">
        <title-with-line
          class="page-flat-number__title"
          :title="$t('titles.FillInPhoneNumber')"
        />
        <small>{{ $t('titles.FillInPhoneNumberSubTitle') }}</small>
      </div>
      <div v-else class="page-flat-number__title-container">
        <title-with-line
          class="page-flat-number__title"
          :title="$t('titles.CodeHasBeenSent')"
        />
        <small>{{ $t('titles.CodeHasBeenSentSubTitle') }}</small>
      </div>
      <div v-if="!codeSent" class="page-flat-number__form">
        <login-form
          :loading="loading"
          :login-error-message="loginErrorMessage"
          @submit="handleLoginStageOne"
          @discardLoginErrorMessage="discardLoginErrorMessage"
        />
        <div class="register-suggestion">
          <p>
            {{ $t('titles.not_already_registered') }}
          </p>
          <button class="session" @click="redirectToRegistration">
            <span>{{ $t('buttons.register') }}</span>
            <login-icon :width="12" icon-color="#3c2270" />
          </button>
        </div>
      </div>
      <div v-else class="page-flat-number__confirm">
        <confirm-phone-form
          :loading="loading"
          :invalid-code-error-message="invalidCodeErrorMessage"
          @submit="handleLoginStageTwo"
          @resend="handleResend"
          @discardInvalidCodeErrorMessage="discardInvalidCodeErrorMessage"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import TitleWithLine from '@/components/partials/TitleWithLine'
import LoginIcon from '@/components/icons/Login'
import LoginForm from '@/components/partials/LoginForm'
import ConfirmPhoneForm from '@/components/partials/ConfirmPhoneForm'
export default {
  components: {
    TitleWithLine,
    LoginIcon,
    LoginForm,
    ConfirmPhoneForm
  },
  layout: 'SalesWithoutNavigation',
  auth: 'guest',
  data() {
    return {
      codeSent: false,
      loading: false,
      formData: null,
      loginErrorMessage: '',
      invalidCodeErrorMessage: ''
    }
  },
  computed: {
    ...mapGetters({
      locale: 'locale'
    }),
    registrationUrl() {
      const redirectUrl = this.$route.query.hasOwnProperty('redirect')
        ? `?redirect=${this.$route.query.redirect}`
        : ''
      return `/${this.locale}/sales/registration${redirectUrl}`
    }
  },
  methods: {
    ...mapActions({
      loginUser: 'Sales/loginUser',
      login: 'auth/loginUser'
    }),
    handleLoginStageOne(data) {
      this.loading = true
      this.formData = { ...data }
      this.login(this.formData)
        .then((response) => {
          this.codeSent = true
          this.loading = false
        })
        .catch((e) => {
          this.loading = false
          this.loginErrorMessage = this.$t(
            'errors.NoSuchUserWithSelectedPhoneNumber'
          )
        })
    },
    handleLoginStageTwo(code) {
      this.loading = true
      this.formData = { ...this.formData, ...code }
      this.login(this.formData)
        .then((response) => {
          this.loading = false
          // this.$toast.success('Successfully authenticated')
          if (this.$route.query.hasOwnProperty('redirect')) {
            this.$router.push({
              name: this.$route.query.redirect,
              params: {
                lang: this.locale
              }
            })
          } else {
            this.$router.go(-1)
          }
        })
        .catch((e) => {
          this.invalidCodeErrorMessage = this.$t('errors.InvalidCode')
          this.loading = false
          // this.$toast.error('Error while authenticating')
        })
    },
    handleResend() {
      delete this.formData.code
      this.loginUser(this.formData).then((response) => {
        this.codeSent = true
      })
    },
    redirectToRegistration() {
      this.$router.push({
        name: 'lang-sales-registration',
        params: {
          lang: this.locale
        }
      })
    },
    discardLoginErrorMessage() {
      this.loginErrorMessage = ''
    },
    discardInvalidCodeErrorMessage() {
      this.invalidCodeErrorMessage = ''
    }
  }
}
</script>

<style lang="scss" scoped>
.page-flat-container {
  display: flex;
  flex-direction: column;
  height: 100%;
}
.register-suggestion {
  display: flex;
  p {
    margin: auto 30px auto 0;
    font-size: 12px;
    color: #424242;
  }
}
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
a {
  text-decoration: none;
}
.page-flat-number {
  margin: 60px;
  display: flex;
  flex-direction: column;
  &__title {
    display: inline-block;
  }
  &__title-container {
    display: flex;
    flex-direction: column;

    small {
      font-size: 10px;
      font-family: $font;
      color: #424242;
      margin-top: 13px;
    }
  }
  &__confirm,
  &__form {
    margin-top: 62px;
  }
  &__buttons {
    display: flex;
    flex-direction: column;
    margin-top: auto;
    small {
      font-size: 10px;
      color: #424242;
      font-family: $font;
      margin-bottom: 42px;
    }
    .filter-illustation-icon {
      margin: 0 0 0 -12px;
    }
  }
}
</style>
