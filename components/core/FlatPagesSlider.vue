<template>
  <div class="container">
    <div class="left-content">
      <div class="slider-wrapper">
        <Slider :items="items" @messageFromSlider="messageFromSlider" />
      </div>
    </div>

    <div class="right-content">
      <slot @thumbnailChanged="thumbnailChanged" name="slider-right-content" />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Slider from '@/components/core/Slider'

export default {
  components: {
    Slider
  },
  props: {
    items: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      activeItem: 0,
      activeThumbnail: 0
    }
  },
  computed: {
    ...mapGetters(['locale'])
  },
  methods: {
    messageFromSlider(count) {
      this.activeItem = count
    },
    thumbnailChanged(activeThumbnail) {
      this.activeThumbnail = activeThumbnail

      this.$emit('thumbnailChanged', this.activeThumbnail)
    }
  }
}
</script>

<style lang="scss" scoped>
.left-content,
.right-content {
  display: inline-block;
  vertical-align: top;
}

.left-content {
  width: 570px;
  margin-right: 4%;
}

.right-content {
  width: calc(100% - 5% - 570px);
}
</style>

<style lang="scss">
.flat-pages-container {
  .swiper__image {
    height: 316px;
    padding-top: 0 !important;
  }
}
</style>
