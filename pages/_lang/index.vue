<template>
  <div class="container">
    <div class="header">
      <title-with-border :title="$t('titles.FlatPageTitle')" />
    </div>
    <div class="area-list-container">
      <list-block class="list" :items="areas" />
    </div>
    <div class="price-list-container">
      <list-block class="list" list-style="gradient" :items="prices" />
    </div>
    <div class="flat-render">
      <render-viewer
        class="flat-viewer"
        :bedroom-count="numberOfBedrooms"
        :render-image="flat.render_url"
        :plan-image="flat.blueprint_url"
      />
      <room-list-component class="room-list-slider" :room-list="rooms" />
    </div>
  </div>
</template>

<script>
import ListBlock from '@/components/partials/ListCard'
import TitleWithBorder from '@/components/partials/TitleWithLine'
import RenderViewer from '@/components/partials/FlatRenderViewer'
import RoomListComponent from '@/components/partials/RoomListComponent'
import { formatPrice } from '@/utils/Mixed'
import { mapGetters } from 'vuex';
export default {
  components: { ListBlock, TitleWithBorder, RenderViewer, RoomListComponent },
  computed: {
    ...mapGetters({
      locale: 'locale',
      flat: 'Flats/flat'
    }),
    numberOfBedrooms() {
      return this.flat.renovation_flat_properties.filter(
        (item) => item.type === 'room' && item.name === 'bedroom'
      ).length
    },
    prices() {
      const arr = this.flat.renovation_flat_properties.filter(
        (item) => item.type === 'price'
      )
      let fullPrice = 0;
      const prices = arr.map((item) => {
        fullPrice += item.number
        return {
          label: item.name_label && item.name_label.hasOwnProperty(this.locale) ? item.name_label[this.locale] : this.$t(`labels.${item.name}`),
          value: `${formatPrice(item.number)}$`
        }
      })
      const fullPriceObject = {
        label: this.$t(`labels.full_price`),
        value: `${formatPrice(fullPrice)}$`
      }
      return [fullPriceObject, ...prices]
    },
    areas() {
      const arr = this.flat.renovation_flat_properties.filter(
        (item) => item.type === 'area'
      )
      return arr.map((item) => {
        return {
          label: item.name_label && item.name_label.hasOwnProperty(this.locale) ? item.name_label[this.locale] : this.$t(`labels.${item.name}`),
          value: `${item.number}${this.$t('labels.m2')}`
        }
      })
    },
    rooms() {
      const arr = this.flat.renovation_flat_properties.filter(
        (item) => item.type === 'room'
      )
      return arr.map((item) => {
        return {
          label: item.name_label && item.name_label.hasOwnProperty(this.locale) ? item.name_label[this.locale] : this.$t(`rooms.${item.name}`),
          value: `${item.number}${this.$t('labels.m2')}`
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.container {
  display: grid;
  padding: 49px 33px 36px;
  height: 100%;
  grid-template-areas:
    'header header header header header'
    'sidetop main main main main'
    'sidebottom main main main main';
  grid-template-columns: 216px 1fr 1fr 1fr 1fr;
  grid-template-rows: 65px 166px 261px;
  grid-column-gap: 41px;
  .list {
    width: 100%;
  }
  .header {
    grid-area: header;
  }
  .area-list-container {
    grid-area: sidetop;
  }
  .price-list-container {
    grid-area: sidebottom;
  }
  .flat-render {
    grid-area: main;
    height: 100%;
    display: flex;
    .room-list-slider {
      width: 42.11%;
      background: #f7ede2;
      border-top-right-radius: 17px;
      border-bottom-right-radius: 17px;
    }
    .flat-viewer {
      flex: 1;
    }
  }
}
</style>
