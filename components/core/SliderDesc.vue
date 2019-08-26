<template>
  <div class="container">
    <div class="left-content">
      <div class="slider-wrapper">
        <Slider :items="items" @messageFromSlider="messageFromSlider" />
      </div>
      <div class="price-button">
        <GradientButton v-if="price">{{ `${$t('labels.price')}: ${price}` }} $</GradientButton>
      </div>
    </div>
    <div class="right-content">
      <div class="desc-wrapper">
        <div v-for="(item, index) in items" :key="item.id" class="desc_item">
          <Description
            v-if="index == activeItem"
            :title="item.name.hasOwnProperty(locale) ? item.name[locale] : ''"
            :text="item.description.hasOwnProperty(locale) ? item.description[locale] : ''"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Description from '@/components/core/Description'
import Slider from '@/components/core/Slider'
import GradientButton from '@/components/core/GradientButton'
import { mapGetters } from 'vuex';

export default {
  components: {
    Description,
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
    }
  },
  data() {
    return {
      activeItem: 0
    }
  },
  computed: {
    ...mapGetters(['locale'])
  },
  methods: {
    messageFromSlider(count) {
      this.activeItem = count
    }
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

.desc-wrapper {
  margin-top: 150px;
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
