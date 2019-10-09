<template>
  <div class="flat-view">
    <div class="flat-view__header">
      <session-button class="sales-session-button"/>
      <language-switcher class="flat-view__switcher" />
    </div>
    <sales-navigation class="flat-view__navigation" :nav-data="navData" />
    <slot />
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'
import SalesNavigation from './SalesNavigation'
import FaqButton from './FAQButton'
import FlatIcon from '@/components/icons/Appartament'
import RenovationIcon from '@/components/icons/Makeover'
import FurnitureIcon from '@/components/icons/Furniture'
import SupplyIcon from '@/components/icons/Technic'
import DecorationIcon from '@/components/icons/Decor'
import SessionButton from '@/components/partials/SessionButton'
import LanguageSwitcher from '@/components/core/LanguageSwitcher'
export default {
  components: {
    SalesNavigation,
    FaqButton,
    LanguageSwitcher,
    SessionButton,
    FlatIcon,
    RenovationIcon,
    FurnitureIcon,
    SupplyIcon,
    DecorationIcon
  },
  mounted() {
    this.fetchPresets()
      .then(data => {
        // console.log(data)
      })
      .catch(err => console.log(err))
    this.fetchFilterDefaults()
      .then(data => {
        // console.log(data)
      })
      .catch(err => console.log(err))
  },
  computed: {
    ...mapGetters(['locale']),
    navData() {
      return {
          customize:
          [
              {
                route: `/sales/customize`,
                title: 'navigation.flat',
                component: FlatIcon
              },
              {
                route: `/sales/customize/makeover`,
                title: 'navigation.renovation',
                component: RenovationIcon
              },
              {
                route: `/sales/customize/furniture`,
                title: 'navigation.furniture',
                component: FurnitureIcon
              },
              {
                route: `/sales/customize/decoration`,
                title: 'navigation.decoration',
                component: DecorationIcon
              },
              {
                route: `/sales/customize/appliance`,
                title: 'navigation.appliance',
                component: SupplyIcon
              }
          ],
          filter: [
            {
              route: `/sales/filter`,
              title: 'navigation.IAmLookingFor',
              component: FlatIcon
            },
            {
              route: `/sales/filter/price`,
              title: 'navigation.price',
              component: RenovationIcon
            },
            {
              route: `/sales/filter/building-status`,
              title: 'navigation.BuildingStatus',
              component: FurnitureIcon
            },
            {
              route: `/renovations/bedrooms`,
              title: 'navigation.bedrooms',
              component: DecorationIcon
            },
            {
              route: `/renovations/project`,
              title: 'navigation.project',
              component: SupplyIcon
            },
            {
              route: `/renovations/floor`,
              title: 'navigation.floor',
              component: SupplyIcon
            }
          ]
        }
    }
  },
  methods: {
    ...mapActions({
      fetchPresets: 'Filter/fetchFilterPresets',
      fetchFilterDefaults: 'Filter/fetchFilterDefaults'
    }),
    goToFaq() {
      this.$router.push({ path: `/${this.locale}/renovations/faq` })
    }
  }
}
</script>

<style lang="scss" scoped>
.flat-view {
  flex: 1;
  display: flex;
  flex-direction: column;
  .sales-session-button {
    margin: auto 12px auto auto;
  }
  &__switcher {
    margin-right: 67px;
  }
  &__header {
    display: flex;

  }
  .faq-container {
    margin: auto 0;
  }
}
</style>
