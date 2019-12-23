<template>
  <div class="container">
    <div class="header">
      <title-with-border :title="title" />
    </div>
    <div class="area-list-container">
      <list-block class="list" :items="areas" />
    </div>
    <!-- <div class="price-list-container">
      <list-block class="list" list-style="gradient" :items="prices" />
    </div> -->
    <div class="flat-render flat-render-renovation">
      <render-viewer
        class="flat-viewer"
        :gradient-text="renderLabel"
        :render-image="flat.render_url"
        :plan-image="flat.blueprint_url"
      />
      <room-list-component
        v-if="rooms.length"
        class="room-list-slider"
        :room-list="rooms"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import ListBlock from '@/components/partials/ListCard'
import TitleWithBorder from '@/components/partials/TitleWithLine'
import RenderViewer from '@/components/partials/FlatRenderViewer'
import RoomListComponent from '@/components/partials/RoomListComponent'
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
      return {
        label: this.$t(`labels.full_price`),
        value: `${this.flat.total_price} $`
      }
    },
    decorationPrice() {
      const decorationPrice = this.flat.renovation_flat_properties.find(
        (item) => item.type === 'price' && item.name === 'decoration_price'
      )

      return {
        label: this.$t(`labels.decoration`),
        value: `${decorationPrice ? decorationPrice.number : 0} $`
      }
    },
    flatPrice() {
      const price = this.flat.renovation_flat_properties.find(
        (item) => item.type === 'price' && item.name === 'flat_price'
      )
      return {
        label: this.$t(`labels.flat_price`),
        value: `${price ? price.number : 0} $`
      }
    },
    furniturePrice() {
      const furniturePrice = this.flat.renovation_flat_properties.find(
        (item) => item.type === 'price' && item.name === 'furniture_price'
      )

      return {
        label: this.$t(`labels.furniture`),
        value: `${furniturePrice ? furniturePrice.number : 0} $`
      }
    },
    appliancePrice() {
      const appliancesPrice = this.flat.renovation_flat_properties.find(
        (item) => item.type === 'price' && item.name === 'appliances_price'
      )

      return {
        label: this.$t(`labels.appliance`),
        value: `${appliancesPrice ? appliancesPrice.number : 0} $`
      }
    },
    prices() {
      return [
        this.flatPrice,
        this.furniturePrice,
        this.decorationPrice,
        this.appliancePrice,
        this.fullPrice
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
    },
    title() {
      const titles = {
        11: this.$t('titles.FlatPageTitleGinger'),
        3: this.$t('titles.FlatPageTitleCinnamon'),
        9: this.$t('titles.FlatPageTitleMuscat'),
        8: this.$t('titles.FlatPageTitleVanilla'),
        10: this.$t('titles.FlatPageTitleUlumbo')
      }

      return titles[this.flat.id]
    }
  },
  mounted() {
    let timeout
    const refresh = () => {
      clearTimeout(timeout)
      timeout = setTimeout(() => {
        this.$router.push({ path: `/${this.locale}/renovations/makeover` })
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
  grid-template-rows: 65px 160px 261px;
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
      width: 45%;
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

<style lang="scss">
.flat-render-renovation {
  .flat-view__image {
    height: 245px;
  }
}
</style>
