<template>
  <div class="layout-modal-container">
    <div class="layout-modal">
      <div class="close-button" @click="closeModal">x</div>

      <div class="layout-modal-content">
        <keep-alive>
          <component :is="componentName" v-if="componentName"></component>
        </keep-alive>
      </div>
    </div>
  </div>
</template>

<script>
import ModalContentSaveFlat from '@/components/partials/ModalContentSaveFlat'
import ModalContentCallSales from '@/components/partials/ModalContentCallSales'

export default {
  components: {
    ModalContentSaveFlat,
    ModalContentCallSales
  },
  data() {
    return {
      componentName: null,
      componentData: null
    }
  },
  computed: {
    locationDescriptor() {
      let locationDescriptor = {
        path: this.$router.history.pending.fullPath,
        query: { redirect: 1 }
      }

      if (this.componentData && this.componentData.hasOwnProperty('location')) {
        locationDescriptor = this.componentData.location
      }

      return locationDescriptor
    }
  },
  watch: {
    componentName(newValue) {
      if (newValue) {
        this.$nextTick(function() {
          this.$el.classList.add('active')
        })
      } else {
        this.$nextTick(function() {
          this.$el.classList.remove('active')
        })
      }
    }
  },
  mounted() {
    this.$eventBus.$on('openModal', this.openModal)
    this.$eventBus.$on('closeModal', this.closeModal)
  },
  beforeDestroy() {
    this.$eventBus.$off('openModal')
    this.$eventBus.$off('closeModal')
  },
  methods: {
    openModal(componentName, componentData) {
      this.componentName = componentName
      this.componentData = componentData
    },
    closeModal() {
      this.$router.push(this.locationDescriptor)
    }
  }
}
</script>

<style lang="scss" scoped>
.layout-modal-container {
  visibility: hidden;
  pointer-events: none;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  transition: background-color 200ms ease-out;

  &.active {
    visibility: visible;
    pointer-events: initial;
    z-index: 1000;
  }
}

.layout-modal {
  display: flex;
  flex-direction: column;
  position: relative;
  width: fit(900);
  height: fit(460);
  padding: fit(80) fit(70) fit(70);
  border-radius: 15px;
  background-color: #fff;

  .close-button {
    display: flex;
    justify-content: flex-end;
    align-items: flex-start;
    position: absolute;
    top: fit(-10);
    right: fit(-10);
    z-index: 1;
    margin: fit(30) fit(40) 0 0;
    padding: fit(10);
    color: #8178b7;
  }

  .layout-modal-content {
    display: flex;
    height: 100%;
  }
}
</style>
