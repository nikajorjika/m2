<template>
  <div class="flat-view">
    <div class="flat-view__header">
      <div class="flat-view__back-button" @click="handleBack">
        <span class="flat-view__back-button__icon">
          <caret-right width="10" height="12" icon-color="#432272" />
          <caret-right width="10" height="12" icon-color="#432272" />
        </span>
        <span>{{ $t('labels.back') }}</span>
      </div>
      <session-button class="sales-session-button" />
      <language-switcher class="flat-view__switcher" />
    </div>
    <sales-navigation class="flat-view__navigation" :nav-data="navData" />
    <slot />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import SalesNavigation from './SalesNavigation'
import ToFind from '@/components/icons/ToFind'
import CostIcon from '@/components/icons/Cost'
import StatusIcon from '@/components/icons/Status'
import SleepingRoom from '@/components/icons/SleepingRoom'
import ProjectIcon from '@/components/icons/Project'
import FlatIcon from '@/components/icons/Completed'
import RenovationIcon from '@/components/icons/Makeover'
import FurnitureIcon from '@/components/icons/Furniture'
import FloorIcon from '@/components/icons/Floor'
import SupplyIcon from '@/components/icons/Technic'
import DecorationIcon from '@/components/icons/Decor'
import SessionButton from '@/components/partials/SessionButton'
import LanguageSwitcher from '@/components/core/LanguageSwitcher'
import CaretRight from '@/components/icons/CaretRight'

export default {
  components: {
    SalesNavigation,
    CaretRight,
    LanguageSwitcher,
    SessionButton
  },
  computed: {
    ...mapGetters({
      locale: 'locale',
      flat: 'customize/flat',
      filters: 'Filter/filters',
      filterDefaults: 'Filter/filterDefaults'
    }),
    navData() {
      return {
        customize: [
          {
            route: `/sales/customize/${this.$route.params.id}`,
            title: 'navigation.flat',
            component: FlatIcon
          },
          {
            route: `/sales/customize/${this.$route.params.id}/makeover`,
            title: 'navigation.renovation',
            component: RenovationIcon
          },
          {
            route: `/sales/customize/${this.$route.params.id}/furniture`,
            title: 'navigation.furniture',
            component: FurnitureIcon
          },
          {
            route: `/sales/customize/${this.$route.params.id}/decoration`,
            title: 'navigation.decoration',
            component: DecorationIcon
          },
          {
            route: `/sales/customize/${this.$route.params.id}/appliance`,
            title: 'navigation.appliance',
            component: SupplyIcon
          }
        ],
        filter: [
          {
            route: `/sales/filter`,
            title: 'navigation.IAmLookingFor',
            component: ToFind
          },
          {
            route: `/sales/filter/price`,
            title: 'navigation.price',
            component: CostIcon
          },
          {
            route: `/sales/filter/building-status`,
            title: 'navigation.BuildingStatus',
            component: StatusIcon
          },
          {
            route: `/sales/filter/bedrooms`,
            title: 'navigation.bedrooms',
            component: SleepingRoom
          },
          {
            route: `/sales/filter/projects`,
            title: 'navigation.projects',
            component: ProjectIcon
          },
          {
            route: `/sales/filter/floor`,
            title: 'navigation.floor',
            component: FloorIcon
          }
        ]
      }
    }
  },
  mounted() {
    this.fetchPresets()
      .then((data) => {
        // console.log(data)
      })
      .catch((err) => console.error(err))
    if (
      this.filterDefaults.min_floor === null ||
      this.filterDefaults.max_floor === null
    ) {
      this.fetchFilterDefaults()
        .then((data) => {
          // console.log(data)
        })
        .catch((err) => console.error(err))
    }
  },
  methods: {
    ...mapActions({
      fetchPresets: 'Filter/fetchFilterPresets',
      fetchFilterDefaults: 'Filter/fetchFilterDefaults'
    }),
    goToFaq() {
      this.$router.push({ path: `/${this.locale}/renovations/faq` })
    },
    handleBack() {
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="scss" scoped>
.flat-view {
  display: flex;
  flex-direction: column;
  width: calc(100% - 99px);
  margin-left: auto;
  &__back-button {
    color: #3c2270;
    font-family: $font;
    font-size: 10px;
    display: flex;
    align-items: center;
    &__icon {
      svg {
        margin-top: 4px;
        transform: rotate(180deg);
        &:lang(en) {
          margin-top: 2px;
        }
        &:last-child {
          margin-left: -9px;
        }
      }
    }
  }
  .sales-session-button {
    margin: auto 12px auto auto;
  }
  &__switcher {
    margin-right: 67px;
  }
  &__header {
    display: flex;
    margin-bottom: 12px;
  }
  .faq-container {
    margin: auto 0;
  }
}
</style>
