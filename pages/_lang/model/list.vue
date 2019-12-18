<template>
  <div class="flat-list">
    <div class="flat-list__title">
      <title-with-line :title="cTitle" />
      <small>{{ $t('titles.YouCanSelectMultipe') }}</small>
      <currency-switcher class="switcher" />
      <transition name="fade-up">
        <prompt-alert
          v-if="showPrompt"
          class="prompt"
          :color="color"
          :text="text"
        />
      </transition>
    </div>
    <flat-list-table
      class="flat-list__table"
      :list="flats"
      @showLightBulb="showAnimation"
      @showPrompt="handlePrompt"
    />
    <div v-if="animating" class="light-bulb-animation">
      <light-icon width="100%" height="100%" icon-color="#fff" />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import TitleWithLine from '@/components/partials/TitleWithLine'
import FlatListTable from '@/components/partials/FlatListTable'
import PromptAlert from '@/components/partials/PromptAlert'
import CurrencySwitcher from '@/components/partials/CurrencySwitcher'
import LightIcon from '@/components/icons/Light'
export default {
  layout: 'FullHeightWithoutNavigation',
  components: {
    TitleWithLine,
    CurrencySwitcher,
    FlatListTable,
    PromptAlert,
    LightIcon
  },
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
      color: null,
      animating: false
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
      return this.$t('alerts.planshetColorAlert')
        .replace('%s', planshetsObject[id])
        .replace('%n', planshetNumbers[id])
    },
    handlePrompt({ color, id }) {
      this.showPrompt = true
      this.color = `#${color}`
      this.text = this.generateTextBasedOnColor(id)
    },
    showAnimation() {
      this.animating = true
      setTimeout(() => {
        this.animating = false
      }, 300)
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
    grid-template-areas: 'title switcher' 'sub-title prompt';
    .switcher {
      grid-area: switcher;
      margin-left: auto;
      margin-right: 60px;
    }
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

  .fade-up-enter-active,
  .fade-ups-leave-active {
    transition: opacity 0.5s;
  }
  .fade-up-enter,
  .fade-up-leave-to {
    opacity: 0;
  }
}
.light-bulb-animation {
  position: fixed;
  top: calc(50% - 35px);
  left: calc(50% - 20px);
  width: 40px;
  height: 70px;
  animation: lightScale 0.3s;
}
@keyframes lightScale {
  0% {
    opacity: 0.7;
  }
  100% {
    transform: scale(5);
    opacity: 0;
  }
}
</style>
