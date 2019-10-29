<template>
  <div class="building-status">
    <div class="checkboxes">
        <div v-for="(item, index) in checkData" :key="index" class="custom-checkbox">
            <checkbox-component :value="item" :checked="isActive(item)" :label="item.name" @check="handleCheck"/>
        </div>
    </div>
    <div class="submit-filter">
        <button-main-orange
        class="button"
        :button-text="$t('buttons.select')"
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
import CheckboxComponent from '@/components/partials/filters/partials/checkbox'
import ButtonMainOrange from '@/components/partials/ButtonMainOrange'
import CaretRight from '@/components/icons/CaretRight'
import { mapGetters, mapMutations } from 'vuex'
export default {
    components: {
        CaretRight,
        CheckboxComponent,
        ButtonMainOrange
    },
    data() {
        return {
            activeItems: [],
            checkData: [
                {
                    name: this.$t('status.finished'),
                    value: 'finished'
                },
                {
                    name: this.$t('status.planned'),
                    value: 'planned'
                },
                {
                    name: this.$t('status.ongoing'),
                    value: 'ongoing'
                },
            ]
        }
    },
    computed: {
        ...mapGetters({
            filters: 'Filter/filters'
        })
    },
    mounted() {
        this.activeItems = this.checkData.filter(item  => this.filters.building_progress.includes(item.value))
    },
    methods: {
        ...mapMutations({
            setFilter: 'Filter/SET_FILTER_ITEM'
        }),
        handleCheck(data) {
            if(this.activeItems.includes(data)) {
                this.activeItems = this.activeItems.filter(item => {
                    return item.value !== data.value
                })
            }else {
                this.activeItems.push(data)
            }
        },
        handleFilter() {
            this.setFilter({
                key: 'building_progress',
                value: this.activeItems.map(item => item.value)
            })
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
    display: flex;
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
