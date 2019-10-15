<template>
  <div class="container">
    <div class="left-content">
      <div class="slider-wrapper">
        <Slider :items="items" @messageFromSlider="messageFromSlider" />
      </div>

      <div class="price-button">
        <GradientButton v-if="price">
          {{ `${$t('labels.price')}: ${formatPrice(price)}` }} $
        </GradientButton>

        <GradientButton v-if="itemPrice">
          + {{ `${formatPrice(itemPrice)}` }} $
        </GradientButton>
      </div>
    </div>

    <div class="right-content">
      <slot
        name="slider-right-content"
        @thumbnailChanged="thumbnailChanged"
      ></slot>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Slider from '@/components/core/Slider'
import GradientButton from '@/components/core/GradientButton'
import { formatPrice } from '@/utils/Mixed'

export default {
  components: {
    Slider,
    GradientButton
  },
  props: {
    items: {
      type: Array,
      required: true
    },
    price: {
      type: Number,
      default: 0
    },
    itemPrice: {
      type: Number,
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
    },
    formatPrice
  }
}
</script>

<style lang="scss" scoped>
.container {
  padding: 50px 20px;
}

.left-content,
.right-content {
  display: inline-block;
  vertical-align: top;
}

.left-content {
  width: 680px;
  margin-right: 4%;
}

.right-content {
  width: calc(100% - 5% - 680px);
}

.price-button {
  margin-top: 20px;
  button {
    font-size: 13px;
  }
}
</style>
