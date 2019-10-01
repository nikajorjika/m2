<template>
  <div class="page-flat-container">
    <div class="page-flat-number">
      <div class="page-flat-number__title-container">
        <title-with-line
          class="page-flat-number__title"
          :title="$t('titles.FillPrivateInformation')"
        />
        <small v-html="subtitle"></small>
      </div>
      <div v-if="!codeSent" class="page-flat-number__form">
        <registration-form @register="handleRegistration" />
      </div>
      <div v-else class="page-flat-number__confirm">
        <confirm-phone-form @submit="handelVerification" @resend="sendVerifyPhoneRequest"/>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import TitleWithLine from '@/components/partials/TitleWithLine'
import RegistrationForm from '@/components/partials/RegistrationForm'
import IllustratedButton from '@/components/partials/IllustratedButton'
import ConfirmPhoneForm from '@/components/partials/ConfirmPhoneForm'
import FilterSearch from '@/components/icons/FilterSearch'
import FilterIconIllustration from '@/components/icons/FilterIllustration'
export default {
  components: {
    TitleWithLine,
    RegistrationForm,
    ConfirmPhoneForm,
    FilterSearch,
    IllustratedButton,
    FilterIconIllustration
  },
  layout: 'WithoutNavigation',
  auth: 'guest',
  data() {
    return {
      codeSent: false,
      formData: null
    }
  },
  computed: {
    ...mapGetters({
      locale: 'locale'
    }),
    subtitle() {
      return !this.codeSent ? this.$t('titles.YouWillRecieveCode') : this.$t('titles.CodeWasSentTo').replace('%s', this.formData.phone)
    }
  },
  methods: {
    ...mapActions({
      sendVerificationCode: 'Sales/sendVerificationCode',
      verifyPhone: 'Sales/verifyPhone'
    }),
    sendVerifyPhoneRequest() {
      this.sendVerificationCode(this.formData).then(() => {
        this.codeSent = true
      })
    },
    handleRegistration(data) {
      this.formData = data
      this.sendVerifyPhoneRequest()
    },
    handelVerification({ code }) {
      this.formData = data
      this.verifyPhone({formData: this.formData, code})
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
