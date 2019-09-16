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
        :gradient-text="renderLabel"
        :render-image="flat.render_url"
        :plan-image="flat.blueprint_url"
      />
      <room-list-component class="room-list-slider" :room-list="rooms" />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import ListBlock from '@/components/partials/ListCard'
import TitleWithBorder from '@/components/partials/TitleWithLine'
import RenderViewer from '@/components/partials/FlatRenderViewer'
import RoomListComponent from '@/components/partials/RoomListComponent'
import { formatPrice } from '@/utils/Mixed'
export default {
  components: { ListBlock, TitleWithBorder, RenderViewer, RoomListComponent },
  layout: 'RenovationsLayout',
  middleware: 'chosenFlat',
  computed: {
    ...mapGetters({
      locale: 'locale',
      flat: 'Flats/flat'
    }),
    renderLabel() {
      return this.flat.image_label
    },
    priceArray() {
      return this.flat.renovation_flat_properties.filter(
        (item) => item.type === 'price'
      )
    },
    totalArea() {
      return this.flat.renovation_flat_properties.find((item) => {
        return item.type === 'area' && item.name === 'total_area'
      })
    },
    fullPrice() {
      let fullPrice = 0
      this.priceArray.map((item) => (fullPrice += item.number))
      return fullPrice
    },
    decorationPrice() {
      return {
        label: this.$t(`labels.decoration`),
        value: `${
          this.totalArea
            ? formatPrice(
                parseInt(this.flat.decoration.price) *
                  parseInt(this.totalArea.number)
              )
            : 0
        } $`
      }
    },
    flatPrice() {
      const price = this.flat.renovation_flat_properties.find(
        (item) => item.type === 'price' && item.name === 'flat_price'
      )
      return {
        label: this.$t(`labels.flat_price`),
        value: `${price ? formatPrice(price.number) : 0} $`
      }
    },
    furniturePrice() {
      return {
        label: this.$t(`labels.furniture`),
        value: `${
          this.totalArea
            ? formatPrice(
                parseInt(this.flat.furniture.price) *
                  parseInt(this.totalArea.number)
              )
            : 0
        } $`
      }
    },
    appliancePrice() {
      let sum = 0
      this.flat.appliance
        ? this.flat.appliance.appliance_info.map(
            (item) => (sum += parseInt(item.price))
          )
        : 0
      return {
        label: this.$t(`labels.appliance`),
        value: `${formatPrice(sum)} $`
      }
    },
    fullPriceObject() {
      return {
        label: this.$t(`labels.full_price`),
        value: `${formatPrice(this.fullPrice)} $`
      }
    },
    prices() {
      return [
        this.flatPrice,
        this.furniturePrice,
        this.decorationPrice,
        this.appliancePrice,
        this.fullPriceObject
      ]
    },
    areas() {
      const arr = this.flat.renovation_flat_properties.filter(
        (item) => item.type === 'area'
      )
      return arr.map((item) => {
        return {
          label:
            item.name_label && item.name_label.hasOwnProperty(this.locale)
              ? item.name_label[this.locale]
              : this.$t(`labels.${item.name}`),
          value: `${item.number} ${this.$t('labels.m2')}`
        }
      })
    },
    rooms() {
      const arr = this.flat.renovation_flat_properties.filter(
        (item) => item.type === 'room'
      )
      return arr.map((item) => {
        return {
          label:
            item.name_label && item.name_label.hasOwnProperty(this.locale)
              ? item.name_label[this.locale]
              : this.$t(`rooms.${item.name}`),
          value: `${item.number} ${this.$t('labels.m2')}`
        }
      })
    }
  },
  mounted() {
    let timeout
    const refresh = () => {
      clearTimeout(timeout)
      timeout = setTimeout(() => {
        this.$router.push({ path: `/${this.locale}` })
      }, 3 * 60 * 1000)
    }
    refresh()
    document.addEventListener('click', refresh)
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
