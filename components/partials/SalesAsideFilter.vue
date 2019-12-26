<template>
  <div class="sales-aside-filter">
    <div class="bg-block">
      <div class="image"></div>
    </div>
    <div class="checboxes">
      <div
        v-for="(item, index) in checkboxData"
        :key="index"
        class="checbox"
        @click="activate(item)"
      >
        <div
          class="checkbox-container"
          :class="{ active: activeItems.includes(item.value) }"
        >
          <span class="label">{{ item.name[locale] }}</span>
          <div
            v-if="activeItems.includes(item.value)"
            class="checbox-icon-container"
          >
            <check-icon
              class="checbox-icon-container__icon"
              icon-color="#f26529"
              width="8px"
              height="7px"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import CheckIcon from '@/components/icons/Check'
export default {
  components: {
    CheckIcon
  },
  data() {
    return {
      activeItems: [2]
    }
  },
  computed: {
    ...mapGetters({
      locale: 'locale'
    }),
    checkboxData() {
      return [
        {
          name: {
            ka: 'შავი კარკასი',
            en: 'Black Frame'
          },
          value: 0
        },
        {
          name: {
            ka: 'თეთრი კარკასი',
            en: 'White Frame'
          },
          value: 1
        },
        {
          name: {
            ka: 'რემონტით',
            en: 'Renovated'
          },
          value: 2
        },
        {
          name: {
            ka: 'ავეჯით',
            en: 'Furnitured'
          },
          value: 3
        },
        {
          name: {
            ka: 'ავეჯით და დეკორით',
            en: 'Furnitured and Decorated'
          },
          value: 4
        }
      ]
    }
  },
  methods: {
    activate(item) {
      return false
    }
  }
}
</script>

<style lang="scss" scoped>
.sales-aside-filter {
  .bg-block {
    border-radius: 50%;
    overflow: hidden;
    display: inline-block;
    position: relative;
    height: 452px;
    width: 452px;
    .image {
      background: url('~@/assets/images/sidebar-bg.png');
      background-size: 100%;
      width: 100%;
      height: 100%;
    }
  }
  .checbox {
    position: absolute;
    height: 40px;
    width: 99px;
    display: flex;
    .label {
      width: 79px;
    }
    &:nth-child(1) {
      top: 8%;
      left: -3%;
    }
    &:nth-child(2) {
      top: 24%;
      left: -13%;
    }
    &:nth-child(3) {
      top: 43%;
      left: -18%;
    }
    &:nth-child(4) {
      top: 63%;
      left: -14%;
    }
    &:nth-child(5) {
      top: 82%;
      left: -2%;
    }
    .checkbox-container {
      display: flex;
      height: 100%;
      font-family: $font;
      text-align: center;
      padding: 0 12px;
      font-size: 12px;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #684f78;
      background: white;
      border-radius: 32px;
      transition: all 0.2s;
      position: relative;
      &:after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        border-radius: 32px;
        background: rgba(255, 255, 255, 0.4);
      }
      &.active {
        transform: scale(1.2);
        &:after {
          background: transparent;
        }
      }
    }
    .checbox-icon-container {
      display: flex;
      border: 1px dashed $orange;
      border-radius: 7px;
      height: 19.8px;
      width: 19.8px;
      margin-left: 5px;
      .checbox-icon-container__icon {
        margin: auto;
      }
    }
  }
}
</style>
