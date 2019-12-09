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
          @submit="handleLoginStageOne"
          @discardLoginErrorMessage="discardLoginErrorMessage"
          :loginErrorMessage="loginErrorMessage"
        />
        <nuxt-link :to="registrationUrl">
          <small class="color-orange">
            {{$t('buttons.register')}}
          </small>
        </nuxt-link>
      </div>
      <div v-else class="page-flat-number__confirm">
        <confirm-phone-form
          :loading="loading"
          @submit="handleLoginStageTwo"
          @resend="handleResend"
          @discardInvalidCodeErrorMessage="discardInvalidCodeErrorMessage"
          :invalidCodeErrorMessage="invalidCodeErrorMessage"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import TitleWithLine from '@/components/partials/TitleWithLine'
import LoginForm from '@/components/partials/LoginForm'
import IllustratedButton from '@/components/partials/IllustratedButton'
import ConfirmPhoneForm from '@/components/partials/ConfirmPhoneForm'
import FilterSearch from '@/components/icons/FilterSearch'
import FilterIconIllustration from '@/components/icons/FilterIllustration'
export default {
  components: {
    TitleWithLine,
    LoginForm,
    ConfirmPhoneForm,
    FilterSearch,
    IllustratedButton,
    FilterIconIllustration
  },
  layout: 'SalesWithoutNavigation',
  auth: 'guest',
  data() {
    return {
      codeSent: false,
      loading: false,
      formData: null,
      loginErrorMessage: '',
      invalidCodeErrorMessage: '',
    }
  },
  computed: {
    ...mapGetters({
      locale: 'locale'
    }),
    registrationUrl() {
      const redirectUrl = this.$route.query.hasOwnProperty('redirect') ? `?redirect=${this.$route.query.redirect}` : ''
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
        .then(response => {
          this.codeSent = true
          this.loading = false
        }).catch(e => {
          this.loading = false
          this.loginErrorMessage = this.$t('errors.NoSuchUserWithSelectedPhoneNumber')
        })
    },
    handleLoginStageTwo(code) {
      this.loading = true
      this.formData = { ...this.formData, ...code }
      this.login(this.formData)
        .then(response => {
          this.loading = false
          // this.$toast.success('Successfully authenticated')
          if(this.$route.query.hasOwnProperty('redirect')) {
            this.$router.push(
              {
                name: this.$route.query.redirect,
                params: {
                  lang: this.locale
                }
              }
            )
          } else {
            this.$router.go(-1)
          }
        }).catch(e =>{
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
    discardLoginErrorMessage() {
      this.loginErrorMessage = '';
    },
    discardInvalidCodeErrorMessage() {
      this.invalidCodeErrorMessage = '';
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
