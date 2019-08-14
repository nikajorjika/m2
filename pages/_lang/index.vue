<template>
  <div class="container">
    <div class="header">
      <title-with-border :title="$t('titles.FlatPageTitle')" />
    </div>
    <div class="area-list-container">
      <list-block class="list" :items="$store.getters['Flats/areaList']" />
    </div>
    <div class="price-list-container">
      <list-block
        class="list"
        list-style="gradient"
        :items="$store.getters['Flats/priceList']"
      />
    </div>
    <div class="flat-render">
      <render-viewer class="flat-viewer" />
      <room-list-component class="room-list-slider" />
    </div>
  </div>
</template>

<script>
import ListBlock from '@/components/partials/ListCard'
import TitleWithBorder from '@/components/partials/TitleWithLine'
import RenderViewer from '@/components/partials/FlatRenderViewer'
import RoomListComponent from '@/components/partials/RoomListComponent'
export default {
  components: { ListBlock, TitleWithBorder, RenderViewer, RoomListComponent }
}
</script>
<style lang="scss" scoped>
.container {
  display: grid;
  padding: 70px 50px 55px;
  height: 100%;
  grid-template-areas:
    'header header header header header'
    'sidetop main main main main'
    'sidebottom main main main main';
  grid-template-columns: 320px 1fr 1fr 1fr 1fr;
  grid-template-rows: 95px 250px 390px;
  grid-column-gap: 62px;
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
    margin-top: auto;
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
