<template>
  <div class="building-status">
    <div class="checkboxes">
      <div
        v-for="(item, index) in checkData"
        :key="index"
        class="custom-checkbox"
      >
        <checkbox-component
          :value="item"
          :checked="isActive(item)"
          :label="item.name"
          @check="handleCheck"
        />
      </div>
    </div>
    <div class="submit-filter">
      <button-main-orange
        class="button"
        :button-text="$t('buttons.select')"
        text-padding="0 15px 0 32px"
        @click="handleFilter"
      >
        <template v-slot:icon>
          <caret-right width="14" height="16" icon-color="#fff" />
        </template>
      </button-main-orange>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import CheckboxComponent from '@/components/partials/filters/partials/checkbox'
import ButtonMainOrange from '@/components/partials/ButtonMainOrange'
import CaretRight from '@/components/icons/CaretRight'
export default {
  components: {
    CaretRight,
    CheckboxComponent,
    ButtonMainOrange
  },
  data() {
    return {
      activeItem: null
    }
  },
  computed: {
    ...mapGetters({
      filters: 'Filter/filters',
      blocks: 'Filter/blocks'
    }),
    checkData() {
      return this.blocks.map((item, index) => {
        return {
          name: `${item.number} ${this.$t('labels.block')}`,
          value: item.id
        }
      })
    }
  },
  mounted() {
    this.activeItem = this.checkData.find(
      (item) => parseInt(this.filters.block) === parseInt(item.value)
    )
  },
  methods: {
    ...mapMutations({
      setFilter: 'Filter/SET_FILTER_ITEM'
    }),
    handleCheck(data) {
      this.activeItem = this.activeItem === data ? null : data
    },
    handleFilter() {
      this.setFilter({
        key: 'block',
        value: this.activeItem ? this.activeItem.value : null
      })
      this.$emit('change')
    },
    isActive(item) {
      return this.activeItem === item
    }
  }
}
</script>

<style lang="scss" scoped>
.building-status {
  display: flex;
  padding: 0 84px;
}
.checkboxes {
  width: 73%;
  display: grid;
  grid-template-columns: repeat(3, 171px);
  grid-row-gap: 22px;
  grid-column-gap: 59px;
  flex-wrap: wrap;
  margin: auto 0;
  justify-content: space-between;
}
.submit-filter {
  width: 218px;
  margin-left: auto;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
</style>
