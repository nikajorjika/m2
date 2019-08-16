<template>
  <div class="container">
    <div class="title">რეპლიკებზე წარმოდგენილი რემონტი</div>
    <div class="items">
      <div v-for="item in items" :key="item.id" class="item">
        <TechnicCard button-title="asfasf" />
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

  asyncData() {
    return {
      items: [
        {
          id: 1
        },
        {
          id: 2
        },
        {
          id: 3
        }
      ]
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
    width: 285px;
    margin: auto;
  }
}
</style>
