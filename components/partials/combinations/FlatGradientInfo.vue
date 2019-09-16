<template>
  <div class="labels-combo">
    <gradient-shape
      v-for="(item, index) in info"
      :key="index"
      :value="item.value"
      :label="item.label"
    />
  </div>
</template>

<script>
import GradientShape from '@/components/partials/combinations/used/GradientShape'
export default {
  components: { GradientShape },
  props: {
    info: {
      type: Array,
      default: () => []
    }
  }
}
</script>

<style lang="scss" scoped>
.labels-combo {
  display: flex;
  justify-content: space-between;
}
</style>
