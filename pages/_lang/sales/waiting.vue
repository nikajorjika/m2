<template>
  <div class="page-flat-container">
    <div class="page-flat-number">
      <queue-info />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import QueueInfo from '@/components/partials/waiting/QueueInfo'
export default {
  components: {
    QueueInfo
  },
  layout: 'SalesWithoutNavigation',
  auth: 'auth',
  computed: {
    ...mapGetters({
      locale: 'locale'
    })
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
.page-flat-container {
  display: flex;
  flex-direction: column;
  height: 100%;
  background: #f1ece6;
}
.page-flat-number {
  margin: auto 60px;
  display: flex;
  flex-direction: column;
}
</style>
