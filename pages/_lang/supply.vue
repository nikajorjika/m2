<template>
  <div class="container">
    <div class="title">რეპლიკებზე წარმოდგენილი რემონტი</div>
    <div class="items">
      <div v-for="item in items" :key="item.id" class="item">
        <TechnicCard :item="item" />
      </div>
    </div>
  </div>
</template>

<script>
import TechnicCard from '@/components/core/TechnicCard'
export default {
  components: {
    TechnicCard
  },

  asyncData({ store }) {
    return {
      items: store.getters['supply/itemList']
    }
  }
}
</script>

<style lang="scss" scoped>
.title {
  font-family: $font-caps;
  margin: 40px 0 40px 35px;
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
