<template>
  <div class="page-flat-container">
    <div class="page-flat-number">
      <div class="page-flat-number__title-container">
        <title-with-line
          class="page-flat-number__title"
          :title="$t('titles.FillPrivateInformation')"
        />
      </div>
      <div class="page-flat-number__form">
        <registration-form @register="handleRegistration" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import TitleWithLine from '@/components/partials/TitleWithLine'
import RegistrationForm from '@/components/partials/RegistrationForm'
import IllustratedButton from '@/components/partials/IllustratedButton'
import FilterSearch from '@/components/icons/FilterSearch'
import FilterIconIllustration from '@/components/icons/FilterIllustration'
export default {
  components: {
    TitleWithLine,
    RegistrationForm,
    FilterSearch,
    IllustratedButton,
    FilterIconIllustration
  },
  layout: 'SalesWithoutNavigation',
  auth: 'guest',
  computed: {
    ...mapGetters({
      locale: 'locale'
    })
  },
  methods: {
    ...mapActions({
      saveLead: 'Lead/saveLead'
    }),
    handleRegistration(data) {
      this.saveLead(data).then(() => {
        this.$router.push({ name: 'lang-model', params: { lang: this.locale } })
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
  margin: auto 60px;
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
