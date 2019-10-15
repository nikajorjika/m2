<template>
  <div class="page-flat-container">
    <div class="page-flat-number">
      <div class="page-flat-number__title-container">
        <title-with-line
          class="page-flat-number__title"
          :title="$t('titles.FillInPhoneNumber')"
        />
        <small>{{ $t('titles.FillInPhoneNumberSubTitle') }}</small>
      </div>
      <div v-if="!codeSent" class="page-flat-number__form">
        <login-form @submit="handleLoginStageOne" />
      </div>
      <div v-else class="page-flat-number__confirm">
        <confirm-phone-form
          @submit="handleLoginStageTwo"
          @resend="handleResend"
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
  layout: 'SalesFilterLayout',
  auth: 'auth',
  data() {
    return {
      codeSent: false,
      formData: null
    }
  },
  computed: {
    ...mapGetters({
      locale: 'locale'
    })
  },
  created() {
    this.$store.dispatch('customize/fetchFlat')
  },
  mounted() {
    this.$store.dispatch('customize/fetchRenovations')
    this.$store.dispatch('customize/fetchFurniture')
    this.$store.dispatch('customize/fetchDecorations')
    this.$store.dispatch('customize/fetchAppliances')
  },
  methods: {
    ...mapActions('customize', [
      'fetchRenovations',
      'fetchFurniture',
      'fetchDecorations',
      'fetchAppliances'
    ])
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
