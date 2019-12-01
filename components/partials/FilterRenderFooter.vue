<template>
  <div v-if="showFloorFooter" class="render-footer">
    <div class="render-footer__flats">
      <div class="render-footer__flats__see">
        <button-main-orange
          :button-text="$t('buttons.see')"
          :button-custom-styles="buttonStyles"
          :text-styles="textStyles"
          :icon-styles="iconStyles"
          @click="handleFilter"
        >
          <template v-slot:icon>
            <arrow-right width="13" height="9" icon-color="#fff" />
          </template>
        </button-main-orange>
      </div>
      <div class="render-footer__flats__label">
        <span>{{ $t('labels.SeeAllFlatsOnThisFloor') }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import ButtonMainOrange from '@/components/partials/ButtonMainOrange'
import ArrowRight from '@/components/icons/ArrowRight'
import { mapGetters } from 'vuex'
export default {
  components: {
    ArrowRight,
    ButtonMainOrange
  },
  data() {
    return {
      buttonStyles: {
        width: '100px',
        height: '31px'
      },
      textStyles: { 
        fontSize: '11px', 
        paddingLeft: '12px' 
      },
      iconStyles: {
        height: '19px', 
        width: '19px',
        marginLeft: '0', 
        marginRight: '0' 
      }
    }
  },
  computed: {
    ...mapGetters({
      locale: 'locale',
      filters: 'Filter/filters',
      showFloorFooter: 'Filter/showFloorFooter'
    })
  },
  methods: {
    handleFilter() {
      this.$router.push({
        name: 'lang-sales-list',
        params: {
          lang: this.locale
        },
        query: {
          filters: JSON.stringify(this.filters)
        }
      })
    }
  },
}
</script>

<style lang="scss" scoped>
.render-footer {
  display: flex;
  flex: 1;
 &__flats {
    display: flex;
    margin: auto 0;
    align-items: center;
    background: #f2d0ba;
    padding: 12px 21px;
    border-radius: 20px;
    &__see {
      margin-right: 15px;
    }
    &__label {
      display: flex;
      align-items: center;
      font-family: $font;
      font-size: 13px;
      color: #494949;
      &__gradient {
        margin: 0 15px;
        min-width: 75px;
        text-align: center;
      }
    }
  }
}
</style>