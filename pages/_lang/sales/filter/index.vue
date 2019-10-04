<template>
  <div class="page-flat-container">
    <div class="page-flat-number">
      <div class="page-flat-number__title-container">
        <title-with-line
          class="page-flat-number__title"
          :title="$t('titles.IAmLookingFor')"
        />
      </div>
      <picker-with-gradient-label :items="presets"/>
      <sale-filter-footer />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import TitleWithLine from '@/components/partials/TitleWithLine'
import LoginForm from '@/components/partials/LoginForm'
import PickerWithGradientLabel from '@/components/partials/PickerWithGradientLabel'
import IllustratedButton from '@/components/partials/IllustratedButton'
import ConfirmPhoneForm from '@/components/partials/ConfirmPhoneForm'
import FilterSearch from '@/components/icons/FilterSearch'
import SaleFilterFooter from '@/components/partials/SaleFilterFooter'
import FilterIconIllustration from '@/components/icons/FilterIllustration'
export default {
  components: {
    TitleWithLine,
    LoginForm,
    SaleFilterFooter,
    ConfirmPhoneForm,
    PickerWithGradientLabel,
    FilterSearch,
    IllustratedButton,
    FilterIconIllustration
  },
  layout: 'SalesFilterLayout',
  auth: 'auth',
  data() {
    return {
      codeSent: false,
      formData: null,
      presets: [
        {
          name: 'მშობლისთვის',
          component: FilterSearch,
          value: 'for-parent'
        } 
      ]
    }
  },
  computed: {
    ...mapGetters({
      locale: 'locale'
    })
  },
  methods: {
    ...mapActions({
      loginUser: 'Sales/loginUser'
    }),
    handleLoginStageOne(data) {
      this.formData = { ...data }
      this.loginUser(this.formData).then((response) => {
        this.codeSent = true
      })
    },
    handleLoginStageTwo(code) {
      this.formData = { ...code, ...this.formData }
      this.loginUser(this.formData).then(({ data }) => {
        if (data.hasOwnProperty('access_token')) {
          this.$auth.setUserToken(data.access_token)
        }
      })
    },
    handleResend() {
      this.loginUser(this.formData).then((response) => {
        this.codeSent = true
      })
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
  height: 100%;
  flex-direction: column;
  justify-content: space-between;
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
