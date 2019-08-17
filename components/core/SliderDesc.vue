<template>
  <div class="container">
    <div class="slider-wrapper">
      <Slider :items="items" />
    </div>
    <div class="desc-wrapper">
      <div class="desc_item" v-for="(item, index) in items" :key="item.id">
        <Description v-if="index == 1" :title="item.title" :text="item.text" />
      </div>
    </div>
  </div>
</template>

<script>
import Description from '@/components/core/Description'
import Slider from '@/components/core/Slider'

export default {
  components: {
    Description,
    Slider
  },
  props: ['items']
}
</script>

<style lang="scss" scoped>
.container {
  padding: 50px 20px;
}
.slider-wrapper,
.desc-wrapper {
  display: inline-block;
  vertical-align: middle;
}

.slider-wrapper {
  width: 55%;
  margin-right: 4%;
}

.desc-wrapper {
  width: 40%;
}
</style>