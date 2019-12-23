<template>
  <div class="flat-list-table">
    <div class="flat-list-table__header">
      <div class="flat-list-table__header__title medium">
        {{ $t('labels.floor') }}
      </div>
      <div class="flat-list-table__header__title medium">
        {{ $t('labels.number') }}
      </div>
      <div class="flat-list-table__header__title large">
        {{ $t('labels.status') }}
      </div>
      <div class="flat-list-table__header__title large">
        {{ $t('labels.view') }}
      </div>
      <div class="flat-list-table__header__title medium">
        {{ $t('labels.area') }}
      </div>
      <div class="flat-list-table__header__title medium">
        {{ $t('labels.price') }}
      </div>
      <div v-if="showLightAllButton" class="flat-list-table__header__button">
        <custom-button
          :label="$t('labels.LitUpAll')"
          @click="handleLightAllButton"
        >
          <template v-slot:icon>
            <light-icon
              class="flat-list-table__header__button__icon"
              icon-color="#fff"
            />
          </template>
        </custom-button>
      </div>
    </div>
    <div class="flat-list-table__body">
      <div
        v-for="(item, index) in list"
        :key="index"
        class="flat-list-table__body__item"
      >
        <flat-list-item
          :item="item"
          class="flat-list-table__body__item__component"
        />
        <div
          class="flat-list-table__body__item__color-mark"
          :style="{ backgroundColor: `#${item.planshet.color}` }"
        >
          <span :style="{ backgroundColor: `#${item.planshet.color}` }"></span>
        </div>
        <div class="flat-list-table__body__item__button">
          <custom-button
            v-if="showLightAllButton"
            :label="$t('labels.LitIt')"
            button-color="orange"
            class="ma"
            :disabled="item.planshet.id !== chosenPlanshet"
            @click="litCurrentItem(item)"
          >
            <template v-slot:icon>
              <light-icon
                class="flat-list-table__header__button__icon"
                icon-color="#fff"
              />
            </template>
          </custom-button>
        </div>
      </div>
      <list-loading v-if="!done" @load="handleLoadMore" />
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import FlatListItem from '@/components/partials/FlatListItem'
import CustomButton from '@/components/partials/CustomButton'
import ListLoading from '@/components/partials/ListLoading'
import LightIcon from '@/components/icons/Light'
export default {
  components: { FlatListItem, ListLoading, CustomButton, LightIcon },
  props: {
    list: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      timeout: null,
      page: 1,
      observer: null,
      done: false,
      requesting: false
    }
  },
  computed: {
    ...mapGetters({
      totalFlatCount: 'Filter/totalCount',
      flatNumber: 'Filter/flatNumber'
    }),
    chosenPlanshet() {
      return parseInt(this.$cookies.get('paveleon-planshet'))
    },
    showLightAllButton() {
      return !!this.$cookies.get('paveleon-planshet')
    }
  },
  beforeDestroy() {
    this.$store.commit('Filter/SET_FLATS_DATA', [])
    this.$store.commit('Filter/SET_FLAT_NUMBER', null)
  },
  mounted() {
    if (this.totalFlatCount === 0) {
      this.fetchFilteredDataCount()
    }
  },
  methods: {
    ...mapActions({
      lightUpFlat: 'Filter/lightUpFlat',
      fetchFlats: 'Filter/fetchFilteredFlats',
      fetchFilteredDataCount: 'Filter/fetchFilteredDataCount'
    }),
    handleLoadMore() {
      if (!this.done && !this.requesting) {
        this.requesting = true
        this.fetchFlats({ page: this.page }).then((response) => {
          this.page++
          this.requesting = false
          if (response.length < 10) {
            this.done = true
          }
        })
      }
    },
    handleLightAllButton() {
      const planshetFlats = this.list.filter(
        (item) => item.planshet.id === this.chosenPlanshet
      )
      if (this.timeout) clearTimeout(this.timeout)
      this.lightUpFlat(planshetFlats).then((timeout) => {
        this.timeout = timeout
      })
    },
    litCurrentItem(item) {
      if (item.planshet.id !== this.chosenPlanshet) {
        this.$emit('showPrompt', item.planshet)
      } else {
        if (this.timeout) clearTimeout(this.timeout)
        this.lightUpFlat([item]).then((timeout) => {
          this.timeout = timeout
        })
        this.$emit('showLightBulb')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.flat-list-table {
  display: flex;
  flex-direction: column;
  background: #f6ece1;
  border-top-left-radius: 26px;
  position: relative;
  .center {
    text-align: center;
  }
  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    top: 80%;
    right: 0;
    left: 0;
    pointer-events: none;
    background: linear-gradient(
      to bottom,
      rgba(255, 255, 255, 0) 0%,
      rgba(242, 227, 211, 0.7) 100%
    );
  }
  .ma {
    margin: auto;
  }
  &__header {
    display: flex;
    padding-left: 47px;
    padding-right: 0;
    height: 92px;
    align-items: center;
    font-size: 12px;
    font-family: $font-caps;
    color: #7e73ae;
    font-weight: 800;
    &__title {
      &.medium {
        width: 104px;
      }
      &.large {
        width: 136px;
      }
    }
    &__button {
      margin: auto;
      margin-right: 11px;
      &__icon {
        margin-left: 22px;
      }
    }
  }
  &__body {
    overflow-y: auto;
    max-height: calc(100% - 92px);
    margin-right: 4px;

    &::-webkit-scrollbar {
      width: 14px;
    }

    /* Track */
    &::-webkit-scrollbar-track {
      background: #f2cab1;
      border-radius: 10px;
      width: 7px;
    }

    /* Handle */
    &::-webkit-scrollbar-thumb {
      background: #f2a27b;
      width: 2px;
      border-radius: 4px;
    }

    /* Handle on hover */
    &::-webkit-scrollbar-thumb:hover {
      background: #f26529;
    }
    &__item {
      border-top: 1px solid #faf4ed;
      padding: 13px 0px 13px 22px;
      display: flex;
      align-items: center;
      background: #f4e7d9;
      &__color-mark {
        width: 14px;
        height: 14px;
        border-radius: 50%;
        position: relative;
        span {
          display: block;
          position: absolute;
          height: 22px;
          width: 22px;
          top: -4px;
          left: -4px;
          opacity: 0.25;
          border-radius: 50%;
        }
      }
      &__component {
        margin-right: auto;
        max-height: 61%;
      }
      &__button {
        width: 114px;
        margin-right: 10px;
        margin-left: auto;
        display: flex;
        justify-content: center;
      }
    }
  }
}
</style>
