<template>
  <div class="container">
    <list-block class="area-list" :items="$store.getters['Flats/areaList']" />
    <list-block
      class="area-list"
      list-style="gradient"
      :items="$store.getters['Flats/priceList']"
    />
  </div>
</template>

<script>
import ListBlock from '@/components/partials/ListCard'
export default {
  components: { ListBlock },
  data() {
    return {}
  }
}
</script>
<style lang="scss" scoped>
.container {
  .area-list {
    width: 320px;
  }
}
</style>
