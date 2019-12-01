<template>
  <div class="filter-footer">
    <div class="filter-footer__flats">
      <div class="filter-footer__flats__see">
        <button-main-orange
          :button-text="$t('buttons.see')"
          @click="handleFilter"
        >
          <template v-slot:icon>
            <arrow-right width="13" height="9" icon-color="#fff" />
          </template>
        </button-main-orange>
      </div>
      <div class="filter-footer__flats__label">
        <span>{{ $t('labels.flats_based_on_filters') }}</span>
        <gradient-label
          class="filter-footer__flats__label__gradient"
          :text="totalCount"
        />
        <span>{{ $t('labels.FlatEnglishPlural') }}</span>
      </div>
    </div>
    <div class="filter-footer__controls">
      <div
        v-if="!noSkip"
        class="filter-footer__controls__skip"
        @click="handleSkip"
      >
        <span class="filter-footer__controls__skip__text">
          {{ $t('buttons.skip') }}
        </span>
        <span class="filter-footer__controls__skip__icon">
          <caret-right width="10" height="12" icon-color="#432272" />
          <caret-right width="10" height="12" icon-color="#432272" />
        </span>
      </div>
      <div class="filter-footer__controls__next">
        <button-main-orange
          :button-text="$t('buttons.next')"
          @click="handleNext"
        >
          <template v-slot:icon>
            <caret-right width="14" height="16" icon-color="#fff" />
          </template>
        </button-main-orange>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'
import ButtonMainOrange from '@/components/partials/ButtonMainOrange'
import GradientLabel from '@/components/partials/GradientLabel'
import ArrowRight from '@/components/icons/ArrowRight'
import CaretRight from '@/components/icons/CaretRight'
export default {
  components: { ButtonMainOrange, ArrowRight, CaretRight, GradientLabel },
  props: {
    nextUrl: {
      type: [String, Object],
      required: false,
      default: null
    },
    noSkip: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    ...mapGetters({
      locale: 'locale',
      totalCount: 'Filter/totalCount',
      loading: 'Filter/filterLoading'
    })
  },
  methods: {
    ...mapActions({
      fetchFilteredFlats: 'Filter/fetchFilteredFlats'
    }),
    handleFilter() {
      this.$router.push({
        name: 'lang-model-list',
        params: { lang: this.locale }
      })
    },
    handleNext() {
      if (this.nextUrl) {
        this.$router.push(this.nextUrl)
      }
      this.$emit('next')
    },
    handleSkip() {
      if (this.nextUrl) {
        this.$router.push(this.nextUrl)
      }
      this.$emit('skip')
    }
  }
}
</script>

<style lang="scss" scoped>
.filter-footer {
  display: flex;
  &__flats {
    display: flex;
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
  &__controls {
    display: flex;
    margin-left: auto;
    width: 264px;
    justify-content: space-between;
    align-items: center;
    &__next {
      margin-left: auto;
    }
    &__skip {
      color: #432272;
      font-size: 12px;
      font-family: $font;
      display: flex;
      align-items: center;
      margin-left: auto;
      letter-spacing: 1px;
      &__icon {
        display: flex;
        svg {
          &:last-child {
            margin-left: -6px;
          }
        }
      }
    }
  }
}
</style>
