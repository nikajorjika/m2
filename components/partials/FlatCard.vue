<template>
  <div class="flat">
      <div class="flat__image">
          <img :src="image" :alt="title">
      </div>
      <div class="flat__title">
          <h2>{{ title }}</h2>
      </div>
      <div class="flat__sub-title">
          <h4>{{ subTitle }}</h4>
      </div>
      <div class="flat__price">
          <gradient-label :text="price" class="price-label" />
      </div>
      <div class="flat__see">
          <button class="btn btn-orange">
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
    }
}
</script>

<style lang="scss" scoped>
.flat {
    display: grid;
    grid-template-areas: 'image image' 'title title' 'subtitle subtitle' 'price button';
    &__image {
        grid-area: image;
        img {
            width: 100%;
        }
    }
    &__title{
        grid-area: title;
        color: #f26529;
        font-family: $font-caps;
        font-size: 11px;
        margin-top: 26px;
        margin-bottom: 10px;
        h2 {
            font-size: inherit;

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
    }
    &__price {
        grid-area: price;
        display: flex;
        .price-label {
            margin: auto auto auto 0;
            font-size: 11px;
            padding: 10px 13px;
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