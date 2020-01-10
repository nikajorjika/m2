<template>
  <div class="building-status">
    <div class="checkboxes">
      <div class="checkboxes__group">
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
      <hr />
      <div class="checkboxes__group">
        <div
          v-for="(item, index) in roomTypes"
          :key="index"
          class="custom-checkbox"
        >
          <checkbox-component
            :value="item"
            :checked="activeType === item.value"
            :label="item.name"
            @check="handleTypeCheck"
          />
        </div>
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
      activeItems: [],
      activeType: null,
      checkData: [
        {
          name: this.$t('rooms.NoBedroom'),
          value: 0
        },
        {
          name: this.$t('rooms.OneBedroom'),
          value: 1
        },
        {
          name: this.$t('rooms.TwoBedrooms'),
          value: 2
        },
        {
          name: this.$t('rooms.ThreeBedrooms'),
          value: 3
        },
        {
          name: this.$t('rooms.FourBedrooms'),
          value: 4
        }
      ],
      roomTypes: [
        {
          name: this.$t('rooms.KitchenDetached'),
          value: 'normal'
        },
        {
          name: this.$t('rooms.Studio'),
          value: 'studio'
        }
      ]
    }
  },
  computed: {
    ...mapGetters({
      filters: 'Filter/filters'
    })
  },
  mounted() {
    const activeBedroomsArray = this.filters.bedroom_count.map((item) =>
      item.hasOwnProperty('value') ? item.value : parseInt(item)
    )
    this.activeItems = this.checkData.filter((item) =>
      activeBedroomsArray.includes(item.value)
    )
    this.activeType = this.filters.type
  },
  methods: {
    ...mapMutations({
      setFilterItem: 'Filter/SET_FILTER_ITEM'
    }),
    handleCheck(data) {
      if (this.activeItems.includes(data)) {
        this.activeItems = this.activeItems.filter((item) => {
          return item.value !== data.value
        })
      } else {
        this.activeItems.push(data)
      }
    },
    handleTypeCheck(data) {
      if (this.activeType !== data.value) {
        this.activeType = data.value
      } else {
        this.activeType = null
      }
    },
    handleFilter() {
      const activeItems = this.activeItems.map((item) => {
        return item.value
      })
      this.setFilterItem({
        key: 'bedroom_count',
        value: [...activeItems]
      })
      this.setFilterItem({
        key: 'type',
        value: this.activeType
      })
      this.$emit('change')
    },
    isActive(item) {
      return this.activeItems.includes(item)
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
  margin: 18px 0;
  &__group {
    display: grid;
    grid-template-columns: repeat(3, 171px);
    grid-row-gap: 22px;
    grid-column-gap: 59px;
    flex-wrap: wrap;
    justify-content: space-between;
    &:first-child {
      margin-bottom: 20px;
    }
    &:not(:first-child) {
      margin-top: 12px;
    }
  }
}
.submit-filter {
  width: 218px;
  margin-left: auto;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
</style>
