<template>
  <div class="filter-render">
    <div class="filter-render__project-name">
      <div class="filter-render__project-name__inner">
        <span>{{ $t('labels.project') }}:</span>
      </div>
      <div class="filter-render__project-name__inner--red">
        <span>{{ $t('addresses.m3_gelovani') }}</span>
      </div>
    </div>
    <div class="filter-render__title">
      <div class="filter-render__title__wrapper">
        <title-with-line :title="$t('labels.select_flat_and_lit_it_up')" />
      </div>
      <small>{{ $t('labels.select_only_one') }}</small>
    </div>
    <div class="filter-render__aside">
      <gradient-block>
        <p>
          <span>{{ $t('labels.address') }}:</span
          ><span>{{ $t('addresses.marshal_gelovani') }} </span><span>#832</span>
        </p>
      </gradient-block>
      <gradient-progress
        class="filter-render__aside__progress"
        :label="$t('labels.sold_flat_count')"
        :min="0"
        :max="350"
        :value="project.flats_quantity"
      />
      <gradient-progress
        class="filter-render__aside__progress"
        :label="$t('labels.building_progress')"
        :min="0"
        :max="100"
        :value="project.building_status"
        suffix="%"
      />
    </div>
    <div class="filter-render__render">
      <filter-render @seleted="handleBlockSelect" />
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import TitleWithLine from '@/components/partials/TitleWithLine'
import GradientBlock from '@/components/partials/GradientBlock'
import GradientProgress from '@/components/partials/GradientProgress'
import FilterRender from '@/components/partials/FilterRender'

export default {
  components: { TitleWithLine, GradientBlock, GradientProgress, FilterRender },
  layout: 'ModelFilterLayout',
  middleware: 'RedirectIfNoModel',
  computed: {
    ...mapGetters({
      locale: 'locale',
      project: 'model/model'
    })
  },
  methods: {
    ...mapActions({
      fetchFilteredFlats: 'Filter/fetchFilteredFlats'
    }),
    handleBlockSelect(data) {
      this.$store.commit('Filter/SET_FILTER_ITEM', {
        key: 'block',
        value: data
      })
      this.$router.push({
        name: 'lang-model-filter-price',
        params: { lang: this.locale }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.filter-render {
  display: grid;
  grid-template-areas:
    'header header-right'
    'aside main';
  height: 100%;
  padding: 50px 61px;
  grid-row-gap: 46px;
  grid-column-gap: 44px;
  grid-template-rows: 44px calc(100% - 90px);
  grid-template-columns: 20.5% 1fr;
  &__project-name {
    grid-area: header;
    font-size: 16px;
    color: #494949;
    font-family: $font-caps;
    display: flex;
    flex-direction: column;
    justify-items: center;
    font-weight: 800;
    &__inner {
      font-family: inherit;
      font-size: inherit;
      line-height: 28px;
      letter-spacing: 0.6px;
      > span {
        box-shadow: inset 0px -8px 0px 0px #f2cab1;
      }
      &--red {
        color: #f26529;
        > span {
          box-shadow: inset 0px -8px 0px 0px #f2cab1;
        }
      }
    }
  }
  &__title {
    grid-area: header-right;
    display: flex;
    flex-direction: column;
    align-content: space-between;
    &__wrapper {
      margin-bottom: auto;
    }
    small {
      font-family: $font;
      font-size: 12px;
    }
  }
  &__aside {
    grid-area: aside;
    &__progress {
      margin-top: 10px;
    }
    p {
      display: flex;
      flex-direction: column;
      font-size: 10px;
      font-family: $font;
      span {
        margin-bottom: 8px;
        &:last-child {
          margin-bottom: 0;
        }
      }
    }
  }
  &__render {
    grid-area: main;
    background: #fff;
    border-radius: 12px;
    overflow: hidden;
  }
}
</style>
