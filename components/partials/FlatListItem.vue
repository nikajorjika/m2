<template>
  <nuxt-link class="flat-list-link" :to="redirectRoute">
    <ul class="flat-list-item">
      <li class="flat-list-item__li medium">{{ floor }}</li>
      <li class="flat-list-item__li medium">
        <span class="bordered">{{ item.flat_number }}</span>
      </li>
      <li class="flat-list-item__li large">{{ status }}</li>
      <li class="flat-list-item__li large">{{ views }}</li>
      <li class="flat-list-item__li medium">{{ area }}</li>
      <li class="flat-list-item__li xs">{{ price }} $</li>
    </ul>
  </nuxt-link>
</template>

<script>
import { mapGetters } from 'vuex'
import { formatPrice } from '@/utils/Mixed'
export default {
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  computed: {
    ...mapGetters({
      locale: 'locale'
    }),
    redirectRoute() {
      return `/${this.locale}/model/flat/${this.item.id}`
    },
    floor() {
      return this.item.floor.hasOwnProperty('number')
        ? this.item.floor.number
        : this.item.floor
    },
    views() {
      const viewsLabels = this.item.flat_views.map((item) => {
        return item.name[this.locale]
      })
      return viewsLabels.length ? viewsLabels.join(', ') : ''
    },
    price() {
      return formatPrice(parseInt(this.item.price))
    },
    area() {
      return `${this.item.total_area} ${this.$t('labels.m2')}`
    },
    status() {
      return this.item.status.hasOwnProperty(this.locale)
        ? this.item.status[this.locale]
        : this.$t('labels.ongoing')
    }
  }
}
</script>

<style lang="scss" scoped>
.flat-list-link {
  text-decoration: none;
}
.flat-list-item {
  background: linear-gradient(85deg, #ae9ba8 0%, #eba5a9 100%);
  display: flex;
  list-style: none;
  padding: 0;
  justify-content: space-between;
  align-items: center;
  padding-left: 36px;
  padding-right: 40px;
  height: 46px;
  border-radius: 11px;
  width: 100%;
  &__li {
    color: #fff;
    font-family: $font;
    font-size: 12px;
    .bordered {
      border: 1px solid #fff;
      padding: 6px;
      border-radius: 5px;
      width: 46px;
      display: block;
      text-align: center;
      height: 26px;
      line-height: 14px;
    }
    &.medium {
      width: 104px;
    }
    &.large {
      width: 136px;
    }
    &.xs {
      width: 86px;
    }
  }
}
</style>
