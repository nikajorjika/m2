<template>
  <div class="building-status">
    <div class="checkboxes">
        <div v-for="(item, index) in checkData" :key="index" class="custom-checkbox">
            <checkbox-component :value="item" :checked="true" :label="item.name" @check="handleCheck"/>
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
import { mapGetters } from 'vuex'
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
                    name: this.$t('addresses.m3_gelovani'),
                    value: 0
                }
            ],
        }
    },
    computed: {
        ...mapGetters({
            filters: 'Filter/filters'
        })
    },
    mounted() {
        console.log(this.filters)
        this.activeItems = this.checkData.filter(item  => this.filters.bedroom_count.includes(item.value))
    },
    methods: {
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
