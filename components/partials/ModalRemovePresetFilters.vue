<template>
  <div class="content">
    <h1 class="title">{{ title }}</h1>

    <p class="description">{{ description }}</p>

    <div class="buttons">
      <confirm-button
        :width="'auto'"
        :height="'40px'"
        :padding="'0 21px'"
        :border="'1px solid #3c2270'"
        :background="'transparent'"
        :label="$t('modal.continue')"
        :label-color="'#3c2270'"
        :icon-margin-left="'0'"
        @regularBtnClick="closeAndResetFilters"
      />
      <confirm-button
        :width="'auto'"
        :height="'40px'"
        :padding="'0 21px'"
        :border="'1px solid red'"
        :background="'transparent'"
        :label="$t('modal.cancel')"
        label-color="red"
        :icon-margin-left="'0'"
        @regularBtnClick="close"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import ConfirmButton from '@/components/partials/RegularButton'

export default {
  components: {
    ConfirmButton
  },
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  computed: {
    ...mapGetters({
      locale: 'locale',
      filterDefaults: 'Filter/filterDefaults',
      filters: 'Filter/filters'
    }),
    title() {
      return this.data.hasOwnProperty('title')
        ? this.data.title
        : this.$t('modal.FiltersWillBeClearedTitle')
    },
    description() {
      return this.data.hasOwnProperty('description')
        ? this.data.description
        : this.$t('modal.FiltersWillBeClearedDescription')
    }
  },
  methods: {
    ...mapMutations({
      setFilterDefaults: 'Filter/SET_FILTER_DEFAULTS',
      setFilterItem: 'Filter/SET_FILTER_ITEM',
      setState: 'Filter/SET'
    }),
    closeAndResetFilters() {
      return new Promise((resolve) => {
        resolve(this.$eventBus.$emit('closeModal'))
      }).then(() => {
        this.setFilterDefaults(this.filterDefaults)
        this.setFilterItem({
          key: this.data.change.key,
          value: this.data.change.value
        })
        this.setState({
          key: 'setByPresets',
          value: false
        })
        this.$eventBus.$emit('reset-filters')
      })
    },
    close() {
      return new Promise((resolve) => {
        resolve(this.$eventBus.$emit('closeModal'))
      }).then(() => {
        this.setFilterItem({
          key: this.data.change.key,
          value: this.data.filters[this.data.change.key]
        })
        this.$eventBus.$emit('reset-filters')
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.content {
  width: 100%;
  display: flex;
  flex-direction: column;
}

.title {
  font: 24px/1 $font-caps;
  color: $font-color;
}

.description {
  margin-top: fit(30);
  font: 16px/1.4 $font;
  color: $font-color;
}

.buttons {
  width: 100%;
  display: flex;
  align-self: flex-start;
  justify-self: flex-start;
  margin-top: fit(40);

  .regular-btn:first-child {
    margin-right: fit(30);
  }
}
</style>
