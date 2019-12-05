<template>
  <div class="flat">
    <div class="flat__image" @click="goToFlat">
      <div v-if="loading" class="loading"></div>
      <div v-else class="image-wrapper">
        <img :src="image" :alt="title" />
        <div v-if="sold" class="sold">
          <span>{{$t('labels.IsSold')}}</span>
        </div>
      </div>
      <gradient-block v-if="!loading" class="flat__bedroom-count">
        <span>{{ bedroomCount }}</span>
        <sleeping-room icon-color="#fff" height="13px" width="13px" />
      </gradient-block>
      <div
        v-if="!loading"
        class="flat__save"
        :class="{ active: isFavourite }"
        @click.stop="saveFlat()"
      >
        <favourite-icon
          class="icon"
          icon-color="#fff"
          height="13px"
          width="13px"
        />
      </div>
    </div>
    <div class="flat__title">
      <div v-if="loading" class="loading"></div>
      <h2 v-else>{{ title }}</h2>
    </div>
    <div class="flat__sub-title">
      <div v-if="loading" class="loading"></div>
      <h4 v-else>{{ subTitle }}</h4>
    </div>
    <div class="flat__price">
      <div v-if="loading" class="loading"></div>
      <price-component class="price-label" :price="price" v-else />
      <!-- <gradient-label v-else :text="price" class="price-label" /> -->
    </div>
    <div class="flat__see">
      <div v-if="loading" class="loading"></div>
      <button v-else class="btn btn-orange" @click="goToFlat">
        <span>{{ $t('buttons.see') }}</span>
        <div class="icon-wrapper">
          <arrow-right
            class="icon"
            width="13px"
            height="9px"
            icon-color="#fff"
          />
        </div>
      </button>
    </div>
  </div>
</template>

<script>
import GradientLabel from '@/components/partials/GradientLabel'
import GradientBlock from '@/components/partials/GradientBlock'
import PriceComponent from '@/components/partials/Price'
import ArrowRight from '@/components/icons/ArrowRight'
import SleepingRoom from '@/components/icons/SleepingRoom'
import FavouriteIcon from '@/components/icons/Favourite'
export default {
  components: {
    GradientLabel,
    GradientBlock,
    PriceComponent,
    FavouriteIcon,
    SleepingRoom,
    ArrowRight
  },
  props: {
    image: {
      type: String,
      default: ''
    },
    sold: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ''
    },
    subTitle: {
      type: String,
      default: ''
    },
    price: {
      type: [String, Number],
      default: ''
    },
    flatId: {
      type: [String, Number],
      required: true
    },
    bedroomCount: {
      type: [String, Number],
      default: 0
    },
    url: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      isFavourite: false
    }
  },
  methods: {
    goToFlat() {
      this.$router.push(this.url)
    },
    saveFlat() {
      this.$axios
        .post('user/save-flat', {
          flat_id: this.flatId,
          renovation_id: null,
          furniture_id: null,
          decoration_id: null,
          appliances_ids: null
        })
        .then((response) => {
          if (response.status === 200) {
            this.isFavourite = true
          }

          this.$root.$emit('flatIsSaved')
        })
        .catch((e) => {
          this.$root.$emit('flatIsSaved')

          console.error(e)
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.flat {
  display: grid;
  grid-template-areas: 'image image' 'title title' 'subtitle subtitle' 'price button';
  .image-wrapper {
    height: 100%;
    width: 100%;
    position: relative;
    .sold {
      display: flex;
      position: absolute;
      z-index: 9;
      background: rgba(125, 122, 170, 0.7);
      color: #fff;
      height: 100%;
      width: 100%;
      top: 0;
      left: 0;
      span {
        font-family: $font-caps;
        margin: auto;
        font-weight: bold;
      }
    }
  }
  &__bedroom-count {
    position: absolute;
    top: 9px;
    left: 12px;
    display: inline-block;
    padding: 10px 13px;
    outline: none;
  }
  &__save {
    background: #7d70aa;
    border-radius: 50%;
    color: white;
    position: absolute;
    top: 9px;
    right: 12px;
    height: 33px;
    width: 33px;
    display: flex;
    outline: none;
    &.active {
      background: $orange;
    }
    .icon {
      margin: auto;
    }
  }
  .loading {
    background: #c7c7c7;
    width: 100%;
  }
  &__image {
    grid-area: image;
    position: relative;
    img {
      width: 100%;
    }
    .loading {
      height: 112px;
    }
  }
  &__title {
    grid-area: title;
    color: #f26529;
    font-family: $font-caps;
    font-size: 11px;
    margin-top: 26px;
    margin-bottom: 10px;
    h2 {
      font-size: inherit;
    }
    .loading {
      height: 9px;
      width: 79px;
    }
  }
  &__sub-title {
    grid-area: subtitle;
    font-family: $font;
    color: #615e5b;
    font-size: 11px;
    margin-bottom: 20px;
    h4 {
      font-size: inherit;
    }
    .loading {
      height: 9px;
      width: 153px;
    }
  }
  &__price {
    grid-area: price;
    display: flex;
    .price-label {
      margin: auto auto auto 0;
      font-size: 10px;
      padding: 10px 13px;
      height: 31px;
    }
    .loading {
      height: 33px;
      width: 66px;
      border-radius: 13px;
    }
  }
  &__see {
    .loading {
      height: 33px;
      width: 99px;
      border-radius: 13px;
      margin-left: auto;
    }
  }
  &__button {
    grid-area: button;
    justify-content: right;
  }
}
.btn {
  background: $orange;
  border: none;
  border-radius: 13px;
  padding: 6px 23px;
  display: flex;
  margin: auto;
  margin-right: 0;
  font-family: $font-caps;
  color: #fff;
  outline: none;
  span {
    margin: auto 0;
    font-size: 11px;
    font-weight: bold;
  }
  .icon-wrapper {
    height: 19px;
    width: 19px;
    border: 1px dashed #fff;
    border-radius: 50%;
    margin-left: 12px;
    display: flex;
    .icon {
      margin: auto;
    }
  }
}
</style>
