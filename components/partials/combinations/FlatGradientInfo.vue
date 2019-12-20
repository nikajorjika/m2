<template>
  <div class="labels-combo">
    <div v-for="(item, index) in info" :key="index" class="labels-combo__item">
      <gradient-shape
        v-if="item.value !== null"
        :value="item.value"
        :label="item.label"
      />
    </div>
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
  justify-content: flex-start;
  width: calc(33% - 5px);

  &__item {
    margin-right: 8px;

    &:last-child {
      margin-right: 0;
    }
  }
}
</style>
