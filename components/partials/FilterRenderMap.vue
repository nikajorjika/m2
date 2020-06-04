<template>
    <div class="render">
        <filter-render-map-svg></filter-render-map-svg>

        <transition name="fade">
            <div
                    v-if="activeBlockNumber && blockInfo"
                    ref="infoBlock"
                    class="render__info"
            >
                <block-hover-info
                        :flats-count="blockInfo.sellableFlats"
                        :block-number="blockInfo.number"
                        :display-button="displayButton"
                        :bottom-label="bottomLabel"
                        @click="handleChoosingBlock"
                />
            </div>
        </transition>
    </div>
</template>

<script>
  import BlockHoverInfo from '@/components/partials/BlockHoverInfo'
  import FilterRenderMapSvg from '@/components/partials/FilterRenderMapSvg'

  export default {
    name: 'FilterRenderMap',
    components: { BlockHoverInfo, FilterRenderMapSvg },
    props: {
      preselected: {
        type: [String, Number],
        default: null
      },
      displayButton: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
        activeBlockNumber: null,
        blockInfo: null
      }
    },
    computed: {
      bottomLabel () {
        return this.$tc(
          'labels.FlatsLeftInThisBlock',
          this.blockInfo.sellableFlats,
          {
            count: this.blockInfo.sellableFlats
          }
        )
      }
    },
    methods: {
      handleChoosingBlock () {
        this.$store.commit('Filter/SET_CHOSEN_BLOCK', this.activeBlockNumber)
        this.$emit('seleted', this.blockInfo.id)
      },
      handleBlockChosing (number) {
        if (! event.target) return
        this.$emit('beforeChange')
        this.blockInfo = null
        this.activeBlockNumber = null
        this.fetchBlockData(number)
      },
      fetchBlockData (number) {
        this.$axios
          .get(`/block/21/${ number }`)
          .then((response) => {
            this.activeBlockNumber = number
            this.blockInfo = response.data
            this.$emit('change', this.blockInfo.id)
            this.$emit('changeNumber', number)
          })
          .catch((e) => console.error(e))
      }
    }
  }
</script>

<style lang="scss" scoped>
    .render {
        width: 100%;
        height: 100%;
        position: relative;

        &__info {
            position: absolute;
            opacity: 0.99;
            top: 19%;
            left: 66%;
        }

        img {
            width: 100%;
            height: 100%;
            object-fit: contain;
        }

        .fade-enter-active,
        .fade-leave-active {
            transition: opacity 0.5s;
        }

        .fade-enter,
        .fade-leave-to {
            opacity: 0;
        }
    }
</style>
