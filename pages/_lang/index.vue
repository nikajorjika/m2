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
      Main Content goes here
    </div>
  </div>
</template>

<script>
import ListBlock from '@/components/partials/ListCard'
import TitleWithBorder from '@/components/partials/TitleWithLine'
export default {
  components: { ListBlock, TitleWithBorder },
  data() {
    return {}
  }
}
</script>
<style lang="scss" scoped>
.container {
  display: grid;
  padding: 50px;
  height: 100%;
  grid-template-areas:
    'header header header header header'
    'sidetop main main main main'
    'sidebottom main main main main';
  .list {
    width: 320px;
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
  }
}
</style>
