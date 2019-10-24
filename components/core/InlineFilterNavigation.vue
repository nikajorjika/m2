<template>
  <div class="flat-navigation">
    <ul 
      class="flat-navigation__list" 
      >
      <li
        v-for="(item, index) in navigation"
        :key="index"
        class="flat-navigation__list__item to-left"
        @click="activeItem = item"
      >
        <div class="flat-navigation__link" :class="{active: activeItem === item}">
          <component
            :is="item.component"
            :icon-color="activeItem === item ? 'url(#gradient)' : '#fff'"
            width="16"
            height="16"
            class="flat-navigation__link__icon"
          />
          <span class="flat-navigation__link__text">{{ $t(item.title) }}</span>
        </div>
        <component v-if="activeItem === item" :is="item.filter" class="filter-block" />
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import CostIcon from '@/components/icons/Cost'
import FloorIcon from '@/components/icons/Floor'
import StatusIcon from '@/components/icons/Status'
import SleepingRoom from '@/components/icons/SleepingRoom'
import ProjectIcon from '@/components/icons/Project'
import PriceFilter from '@/components/partials/filters/PriceFilter'

export default {
    mounted() {
        const {min_floor, max_floor, min_price, max_price} = this.filterDefaults
        if(min_floor === null || max_floor === null  || min_price === null  || max_price === null ) {
            this.$router.push({ name: 'lang-sales-filter', params: {
                lang: this.locale
            }})
        }
    },
    data() {
      return {
          activeItem: null,
          navigation: [
          {
            title: 'navigation.price',
            component: CostIcon,
            filter: PriceFilter
          },
          {
            title: 'navigation.BuildingStatus',
            component: StatusIcon,
          },
          {
            title: 'navigation.bedrooms',
            component: SleepingRoom,
          },
          {
            title: 'navigation.projects',
            component: ProjectIcon,
          },
          {
            title: 'navigation.floor',
            component: FloorIcon,
          }
        ]
      }
    },
    computed: {
        ...mapGetters({
          locale: 'locale',
          filterDefaults: 'Filter/filterDefaults'
        })
    }
}
</script>

<style lang="scss" scoped>
.filter-block {
    background: #fff;
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    z-index: 3;
}
.flat-navigation {
  background: $gradient-2;
  border-top-left-radius: 13px;
  display: flex;
  position: relative;
  &__list {
    list-style: none;
    display: flex;
    justify-content: space-between;
    margin-right: 60px;
    width: 100%;
    transition: 0.4s;
    &__item {
      flex: 1;
      width: 42px;
      display: flex;
      align-items: center;
      height: 60px;
    }
  }
  &__link {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-decoration: none;
    color: #fff;
    height: 100%;
    font-family: $font-caps;
    padding: 0 5px;
    margin: auto;
    width: auto;
    min-width: 112px;
    letter-spacing: 1px;
    transition: width 0.7s opacity 0.2s;
    opacity: 1;
    position: relative;
    white-space: nowrap;
    &.active{
      color: inherit;
    }
    &__text {
      margin-top: 10px;
      font-size: 10px;
      font-weight: 900;
      text-transform: uppercase;
    }
    &__icon {
      z-index: 1;
    }
    &.active {
      position: relative;
      &:before {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        border-top-left-radius: 26px;
        border-top-right-radius: 26px;
        height: calc(100% + 22px);
        background: #fff;
        z-index: 0;
      }
      .flat-navigation__link__text {
        color: #594495;
        z-index: 1;
      }
    }
  }
}
</style>
