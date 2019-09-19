<template>
  <div class="flat-list">
    <div class="flat-list__title">
      <title-with-line :title="cTitle" />
      <small>{{ $t('titles.YouCanSelectMultipe') }}</small>
      <transition name="fade-up">
        <prompt-alert v-if="showPrompt" class="prompt" :color="color" :text="text" />
      </transition>
    </div>
    <flat-list-table class="flat-list__table" :list="flats" @showPrompt="handlePrompt" />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import TitleWithLine from '@/components/partials/TitleWithLine'
import FlatListTable from '@/components/partials/FlatListTable'
import PromptAlert from '@/components/partials/PromptAlert'
export default {
  layout: 'FullHeightWithoutNavigation',
  components: { TitleWithLine, FlatListTable, PromptAlert },
  computed: {
    ...mapGetters({
      flats: 'Filter/flats',
      locale: 'locale',
      totalFlatCount: 'Filter/totalCount'
    }),
    cTitle() {
      return this.$t('titles.flat-list-result-title').replace(
        '%s',
        this.totalFlatCount
      )
    }
  },
  data() {
    return {
      showPrompt: false,
      text: null,
      color: null
    }
  },
  methods: {
    ...mapActions({
      fetchFilteredFlats: 'Filter/fetchFilteredFlats'
    }),
    generateTextBasedOnColor(id) {
      const planshetsObject = {
        1: this.$t('colors.orange'),
        2: this.$t('colors.purple'),
        3: this.$t('colors.blue'),
        4: this.$t('colors.green'),
        5: this.$t('colors.red'),
        6: this.$t('colors.yellow'),
        7: this.$t('colors.pink')
      }
      const planshetNumbers = {
        1: this.$t('colors.first'),
        2: this.$t('colors.second'),
        3: this.$t('colors.third'),
        4: this.$t('colors.fourth'),
        5: this.$t('colors.fifth'),
        6: this.$t('colors.sixth'),
        7: this.$t('colors.seventh')
      }
      return this.$t('alerts.planshetColorAlert').replace('%s', planshetsObject[id]).replace('%n', planshetNumbers[id])
    },
    handlePrompt({color, id}) {
      this.showPrompt = true
      this.color = `#${color}`
      this.text = this.generateTextBasedOnColor(id)
    }
  }
}
</script>

<style lang="scss" scoped>
.flat-list {
  padding: 48px 0 0 61px;
  height: 100%;
  &__title {
    flex-direction: column;
    display: grid;
    grid-template-areas: 'title prompt' 'sub-title prompt';
    small {
      font-size: 10px;
      font-family: $font;
      margin-top: 12px;
      grid-area: sub-title;
    }
    .prompt {
      grid-area: prompt;
    }
  }
  &__table {
    margin-top: 47px;
    height: 80%;
  }
  
  .fade-up-enter-active, .fade-ups-leave-active {
    transition: opacity .5s;
  }
  .fade-up-enter, .fade-up-leave-to {
    opacity: 0;
  }
}
</style>
