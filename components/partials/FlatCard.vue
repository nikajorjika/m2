<template>
  <div class="flat">
      <div class="flat__image">
          <div v-if="loading" class="loading"> </div>
          <img v-else :src="image" :alt="title">
      </div>
      <div class="flat__title">
          <div v-if="loading" class="loading"> </div>
          <h2 v-else>{{ title }}</h2>
      </div>
      <div class="flat__sub-title">
          <div v-if="loading" class="loading"> </div>
          <h4 v-else>{{ subTitle }}</h4>
      </div>
      <div class="flat__price">
          <div v-if="loading" class="loading"> </div>
          <gradient-label v-else :text="price" class="price-label" />
      </div>
      <div class="flat__see">
          <div v-if="loading" class="loading"> </div>
          <button v-else class="btn btn-orange" @click="goToFlat">
                <span>{{$t('buttons.see')}}</span>
                <div class="icon-wrapper">
                    <arrow-right class="icon" width="13px" height="9px" icon-color="#fff" />
                </div>
          </button>
      </div>
  </div>
</template>

<script>
import GradientLabel from '@/components/partials/GradientLabel'
import ButtonMainOrange from '@/components/partials/ButtonMainOrange'
import ArrowRight from '@/components/icons/ArrowRight'
export default {
    components: {
        GradientLabel,
        ButtonMainOrange,
        ArrowRight
    },
    props: {
        image: {
            type: String,
            default: ''
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
        url: {
            type: String,
            default: ''
        }
    },
    methods: {
        goToFlat() {
            this.$router.push(this.url)
        }
    },
}
</script>

<style lang="scss" scoped>
.flat {
    display: grid;
    grid-template-areas: 'image image' 'title title' 'subtitle subtitle' 'price button';
    .loading {
        background: #c7c7c7;
        width: 100%;
    }
    &__image {
        grid-area: image;
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
    border:none;
    border-radius: 13px;
    padding: 6px 23px;
    display: flex;
    margin: auto;
    margin-right: 0;
    font-family: $font-caps;
    color: #fff;
    span {
        margin: auto 0;
        font-size: 11px;
        font-weight: bold;
    }
    .icon-wrapper{ 
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