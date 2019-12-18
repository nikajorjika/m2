<template>
  <div class="page-flat-number">
    <div class="page-flat-number__title-container">
      <title-with-line
        class="page-flat-number__title"
        :title="$t('titles.SearchByFlatNumber')"
      />
      <small>{{ $t('titles.SearchByFlatNumberSubTitle') }}</small>
    </div>
    <div class="page-flat-number__form">
      <search-form @submit="handleSearch" />
    </div>
    <div class="page-flat-number__buttons">
      <small>{{ $t('titles.ByFlatNumberButtonsTitle') }}</small>
      <div class="buttons">
        <illustrated-button
          class="buttons__button"
          :label="buttonLabels.byPhoneNumberLabel"
          :to-route="{
            name: 'lang-model-by-auth',
            params: { lang: locale }
          }"
        >
          <template v-slot:illustration>
            <login-illustration
              width="50px"
              height="auto"
              :margin="'0 0 0 -21px'"
            />
          </template>

          <template v-slot:icon>
            <phone-icon icon-color="#fff" width="18px" height="9px" />
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
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import TitleWithLine from '@/components/partials/TitleWithLine'
import SearchForm from '@/components/partials/SearchForm'
import IllustratedButton from '@/components/partials/IllustratedButton'
import FilterSearch from '@/components/icons/FilterSearch'
import FilterIconIllustration from '@/components/icons/FilterIllustration'
import PhoneIcon from '@/components/icons/Phone'
import LoginIllustration from '@/components/icons/SearchByPhoneNumberIllustration'
export default {
  components: {
    PhoneIcon,
    LoginIllustration,
    TitleWithLine,
    SearchForm,
    FilterSearch,
    IllustratedButton,
    FilterIconIllustration
  },
  layout: 'WithoutNavigation',
  computed: {
    ...mapGetters({
      locale: 'locale'
    })
  },
  data() {
    return {
      buttonLabels: {
        byPhoneNumberLabel: this.$t('labels.ByPhoneNumber'),
        byFlatNumberLabel: this.$t('labels.ByFlatNumber'),
        byFilterLabel: this.$t('labels.ByFilter')
      }
    }
  },
  methods: {
    ...mapActions({
      fetchByFlatNumber: 'Filter/fetchByFlatNumber'
    }),
    handleSearch(searchBy) {
      this.$store.commit('Filter/SET_FLAT_NUMBER', searchBy)
      this.$router.push({
        name: 'lang-model-list',
        params: { lang: this.locale }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.buttons {
  display: flex;
  &__button {
    margin-right: 20px;
  }
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
