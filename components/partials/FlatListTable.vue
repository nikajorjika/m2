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
      <div class="flat-list-table__header__button">
        <custom-button :label="$t('labels.LitUpAll')">
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
        <div class="flat-list-table__body__item__button">
          <custom-button
            :label="$t('labels.LitIt')"
            button-color="orange"
            class="ma"
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
    </div>
  </div>
</template>

<script>
import FlatListItem from '@/components/partials/FlatListItem'
import CustomButton from '@/components/partials/CustomButton'
import LightIcon from '@/components/icons/Light'
export default {
  components: { FlatListItem, CustomButton, LightIcon },
  props: {
    list: {
      type: Array,
      default: []
    }
  },
  methods: {
    litCurrentItem(item) {
      console.log(item)
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
    padding-left: 80px;
    padding-right: 58px;
    height: 92px;
    align-items: center;
    font-size: 12px;
    font-family: $font-caps;
    color: #7e73ae;
    justify-content: space-between;
    &__title {
      &.medium {
        width: 104px;
      }
      &.large {
        width: 136px;
      }
    }
    &__button {
      &__icon {
        margin-left: 22px;
      }
    }
  }
  &__body {
    overflow-y: auto;
    max-height: 100%;
    &__item {
      border-top: 1px solid #faf4ed;
      padding: 13px 58px 13px 47px;
      display: flex;
      background: #f4e7d9;
      &__component {
        margin-right: 35px;
        max-height: 61%;
      }
      &__button {
        width: 166px;
        display: flex;
        justify-content: center;
      }
    }
  }
}
</style>