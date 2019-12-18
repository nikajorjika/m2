<template>
  <div class="page-flat-container">
    <div class="page-flat-number">
      <div class="page-flat-number__title-container">
        <title-with-line
          class="page-flat-number__title"
          :title="$t('titles.FillInPhoneNumber')"
        />
        <small>{{ $t('titles.FillInPhoneNumberSubTitle') }}</small>
        <div v-if="!codeSent" class="page-flat-number__form">
          <login-form
            :login-error-message="loginErrorMessage"
            @submit="handleLoginStageOne"
            @discardLoginErrorMessage="discardLoginErrorMessage"
          />
        </div>
        <div v-else class="page-flat-number__confirm">
          <confirm-phone-form
            :invalid-code-error-message="invalidCodeErrorMessage"
            @submit="handleLoginStageTwo"
            @resend="handleResend"
            @discardInvalidCodeErrorMessage="discardInvalidCodeErrorMessage"
          />
        </div>
      </div>
      <div class="page-flat-number__buttons">
        <small>{{ $t('titles.ByFlatNumberButtonsTitle') }}</small>
        <div class="buttons">
          <illustrated-button
            class="buttons__button"
            :label="buttonLabels.byFlatNumberLabel"
            :to-route="{
              name: 'lang-model-by-flat-number',
              params: { lang: locale }
            }"
          >
            <template v-slot:illustration>
              <search-by-flat-number-illustration
                width="50px"
                height="auto"
                :margin="'0 0 0 -21px'"
              />
            </template>

            <template v-slot:icon>
              <search-by-flat-number
                icon-color="#fff"
                width="18px"
                height="9px"
              />
            </template>
          </illustrated-button>
          <illustrated-button
            class="buttons__button"
            :label="buttonLabels.byFilterLabel"
            :to-route="{
              name: 'lang-model-filter',
              params: { lang: locale }
            }"
          >
            <template v-slot:illustration>
              <filter-icon-illustration
                class="filter-illustation-icon"
                width="50px"
                height="100%"
              />
            </template>

            <template v-slot:icon>
              <filter-search icon-color="#fff" width="18px" height="9px" />
            </template>
          </illustrated-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'
import TitleWithLine from '@/components/partials/TitleWithLine'
import LoginForm from '@/components/partials/LoginForm'
import IllustratedButton from '@/components/partials/IllustratedButton'
import ConfirmPhoneForm from '@/components/partials/ConfirmPhoneForm'
import FilterSearch from '@/components/icons/FilterSearch'
import SearchByFlatNumber from '@/components/icons/SearchByFlatNumber'
import FilterIconIllustration from '@/components/icons/FilterIllustration'
import SearchByFlatNumberIllustration from '@/components/icons/SearchByFlatNumberIllustration'
export default {
  components: {
    TitleWithLine,
    LoginForm,
    SearchByFlatNumberIllustration,
    SearchByFlatNumber,
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
      formData: null,
      loginErrorMessage: '',
      invalidCodeErrorMessage: '',
      buttonLabels: {
        byPhoneNumberLabel: this.$t('labels.ByPhoneNumber'),
        byFlatNumberLabel: this.$t('labels.ByFlatNumber'),
        byFilterLabel: this.$t('labels.ByFilter')
      }
    }
  },
  computed: {
    ...mapGetters({
      locale: 'locale',
      temporaryToken: 'Sales/temporaryToken'
    })
  },
  methods: {
    ...mapActions({
      loginUser: 'Sales/loginUser'
    }),
    ...mapMutations({
      setItem: 'Sales/SET'
    }),
    handleLoginStageOne(data) {
      this.formData = { ...data }
      this.loginUser(this.formData)
        .then((response) => {
          this.codeSent = true
        })
        .catch(
          (e) =>
            (this.loginErrorMessage = this.$t(
              'errors.NoSuchUserWithSelectedPhoneNumber'
            ))
        )
    },
    handleLoginStageTwo(code) {
      this.formData = { ...this.formData, ...code }
      this.loginUser(this.formData)
        .then(({ data }) => {
          if (data.hasOwnProperty('access_token')) {
            this.setItem({ key: 'temporaryToken', value: data.access_token })
            this.$router.push({
              name: 'lang-model-favourites',
              params: {
                lang: this.locale
              }
            })
          }
        })
        .catch(
          (e) => (this.invalidCodeErrorMessage = this.$t('errors.InvalidCode'))
        )
    },
    handleResend() {
      delete this.formData.code
      this.loginUser(this.formData).then((response) => {
        this.codeSent = true
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
.buttons {
  display: flex;
  &__button {
    margin-right: 20px;
  }
}
a {
  text-decoration: none;
}
.page-flat-number {
  margin: 124px 60px;
  height: calc(100% - 248px);
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
