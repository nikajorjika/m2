<template>
  <div class="page-flat-container">
    <div class="page-flat-number">
      <div class="page-flat-number__title-container">
        <title-with-line
          :title="$t('titles.FillPrivateInformation')"
          class="page-flat-number__title"
        />
        <!-- eslint-disable-next-line vue/no-v-html -->
        <small v-html="subtitle" />
      </div>
      <div v-if="!codeSent" class="page-flat-number__form">
        <registration-form
          :loading="loading"
          :errorKey="errorKey"
          :error="error"
          @removeErrors="() => (error = '')"
          @register="handleRegistration"
        />
      </div>
      <div v-else class="page-flat-number__confirm">
        <confirm-phone-form
          :button-text="$t('buttons.register')"
          @submit="handleSendVerifyPhoneRequest"
          @resend="handleResendVerifyPhoneRequest"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import TitleWithLine from '@/components/partials/TitleWithLine'
import RegistrationForm from '@/components/partials/RegistrationForm'
import ConfirmPhoneForm from '@/components/partials/ConfirmPhoneForm'
export default {
  components: {
    TitleWithLine,
    RegistrationForm,
    ConfirmPhoneForm
  },
  layout: 'SalesWithoutNavigation',
  auth: 'guest',
  data() {
    return {
      codeSent: false,
      loading: false,
      formData: null,
      errorKey: '',
      error: ''
    }
  },
  computed: {
    ...mapGetters({
      locale: 'locale'
    }),
    subtitle() {
      return !this.codeSent
        ? this.$t('titles.YouWillRecieveCode')
        : this.$t('titles.CodeWasSentTo').replace(
            '%s',
            this.formData.phone_number
          )
    }
  },
  methods: {
    ...mapActions({
      registerUser: 'Sales/registerUser',
      setUserData: 'auth/setUserData'
    }),
    sendVerifyPhoneRequest() {
      this.loading = true
      this.errorKey = ''
      this.error = ''
      this.registerUser(this.formData)
        .then(({ data }) => {
          this.codeSent = true
          this.loading = false
          if (data.hasOwnProperty('access_token')) {
            this.setUserData(data).then(() => {
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
          }
        })
        .catch((err) => {
          if (err.response.status === 400) {
            this.loading = false

            if (err.response.data.msg.hasOwnProperty('email')) {
              this.errorKey = 'email'
              this.error = this.$t('errors.EmailAlreadyRegistered')
            } else {
              this.errorKey = 'phone'
              this.error = this.$t('errors.PhoneAlreadyRegistered')
            }
          }
        })
    },
    handleResendVerifyPhoneRequest(code) {
      this.formData = { resend: true, ...this.formData }
      this.sendVerifyPhoneRequest()
    },
    handleSendVerifyPhoneRequest(code) {
      this.formData = { ...code, ...this.formData }
      this.sendVerifyPhoneRequest()
    },
    handleRegistration(data) {
      this.formData = data
      this.sendVerifyPhoneRequest()
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
