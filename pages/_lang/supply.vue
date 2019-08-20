<template>
  <div class="container">
    <div class="title">
      <title-with-border :title="$t('titles.SupplyPageTitle')" />
    </div>
    <div class="items">
      <div v-for="item in items" :key="item.id" class="item">
        <TechnicCard :item="item" />
      </div>
    </div>
  </div>
</template>

<script>
import TechnicCard from '@/components/core/TechnicCard'
import TitleWithBorder from '@/components/partials/TitleWithLine'
export default {
  components: {
    TechnicCard,
    TitleWithBorder
  },

  asyncData({ store }) {
    return {
      items: store.getters['Flats/flat'].appliance.appliance_info
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  padding-top: 53px;
}
.title {
  font-family: $font-caps;
  margin-left: 33px;
  margin-bottom: 40px;
}
.items {
  display: flex;
  justify-content: center;
  flex-flow: wrap;
  .item {
    width: 300px;
    margin: auto;
  }
}
</style>
