<template>
  <div class="filter-flat">
    <div class="filter-flat__title">
      <title-with-line :title="cTitle" />
    </div>
    <div class="filter-flat__content">
      <div class="filter-flat__content__info">
        <flat-gradient-info :info="flatLocationInfo" />
        <list-card :items="listCardData" />
        <gradient-progress
          class="filter-render__aside__progress"
          :label="$t('labels.building_progress')"
          :min="0"
          :max="100"
          :value="builingStatus"
          suffix="%"
        />
      </div>
      <div class="filter-flat__content__render">
        <filter-render @seleted="handleBlockSelect" @change="handleBlockChange" @beforeChange="handleBeforeChange" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
import TitleWithLine from '@/components/partials/TitleWithLine'
import RenderViewer from '@/components/partials/FlatRenderViewer'
import RoomListComponent from '@/components/partials/RoomListComponent'
import ListCard from '@/components/partials/ListCard'
import GradientProgress from '@/components/partials/GradientProgress'
import GradientLabel from '@/components/partials/GradientLabel'
import FlatGradientInfo from '@/components/partials/combinations/FlatGradientInfo'
import { formatPrice } from '@/utils/Mixed'
import ButtonMainOrange from '@/components/partials/ButtonMainOrange'
import LightIcon from '@/components/icons/Light'
import CaretRight from '@/components/icons/CaretRight'
import FilterRender from '@/components/partials/FilterRender'

export default {
  layout: 'RenderFilterLayout',
  components: {
    TitleWithLine,
    RenderViewer,
    FilterRender,
    RoomListComponent,
    FlatGradientInfo,
    ListCard,
    GradientProgress,
    GradientLabel,
    ButtonMainOrange,
    LightIcon,
    CaretRight,
    GradientLabel
  },
  data() {
    return {
      flat: null
    }
  },
  computed: {
    ...mapGetters({
      locale: 'locale',
      showPrompt: 'Filter/showPrompt'
    }),
    planshetColor() {
      return !!this.$cookies.get('paveleon-planshet')
    },
    cTitle() {
    return `${this.$t('labels.project')}: <span class="color-orange">${this.$t('projects.m3_gelovani')}</span>  `
    },
    buttonDisabled() {
      if (!this.flat) return true
      return this.flat.planshet.id !== this.$cookies.get('paveleon-planshet')
    },
    builingStatus() {
      if (!this.flat) return 0
      return parseInt(this.flat.building_status)
    },
    flatLocationInfo() {
      if (!this.flat) return null
      const infoArray = [
        {
          label: this.$t('labels.block'),
          value: this.flat.block
        },
        {
          label: this.$t('labels.floor'),
          value: this.flat.floor.number
        },
        {
          label: this.$t('labels.flat'),
          value: this.flat.flat_number
        }
      ]
      return infoArray
    }
  },
  mounted() {
    this.$axios.get(`/flats/${this.$route.params.id}`).then((response) => {
      this.flat = response.data.data
      if (this.$cookies.get('paveleon-planshet') !== this.flat.planshet.id) {
        this.setAlertData({
          show: true,
          text: this.generateTextBasedOnColor(this.flat.planshet.id),
          color: `#${this.flat.planshet.color}`
        })
      }
    })
  },
  beforeDestroy() {
    this.setAlertData({
      show: false,
      text: null,
      color: null
    })
  },
  methods: {
    ...mapMutations({
      setAlertData: 'Filter/SET_PROMPT_DATA'
    }),
    ...mapActions({
      lightUpFlat: 'Filter/lightUpFlat'
    }),
    handleLightUp() {
      this.lightUpFlat([this.flat])
    },
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
    }
  }
}
</script>

<style lang="scss" scoped>
.filter-flat {
  height: 580px;
  width: 100%;
  padding: 49px 60px 38px 46px;
  display: grid;
  grid-template-areas: 'header header header' 'content content content';
  grid-template-rows: 79px 415px;
  box-sizing: border-box;
  &__title {
    grid-area: header;
  }
  &__content {
    grid-area: content;
    height: 100%;
    display: flex;
    width: 100%;
    &__info {
      width: 199px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
    &__render {
      width: 724px;
      margin-left: auto;
      display: flex;
      .room-list-slider {
        width: 305px;
        background: #f7ede2;
        border-top-right-radius: 17px;
        border-bottom-right-radius: 17px;
      }
      .flat-viewer {
        width: 419px;
      }
    }
  }
}
</style>
