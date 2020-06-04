<template>
    <div class="filter-render-map-svg-container">
        <map-svg id="filter-render-map-svg" class="filter-render-map-svg-container__svg"></map-svg>

        <div class="filter-render-map-svg__control">
            <div id="zoom-in" class="filter-render-map-svg__control__zoom-in"
                 @click="zoomIn"></div>

            <div id="zoom-reset" class="filter-render-map-svg__control__reset-zoom"
                 @click="resetZoom"></div>

            <div id="zoom-out" class="filter-render-map-svg__control__zoom-out"
                 @click="zoomOut"></div>
        </div>
    </div>
</template>

<script>
  import svgPanZoom from 'svg-pan-zoom'
  import Hammer from 'hammerjs'
  import MapSvg from '@/assets/renders/render-map.svg'

  export default {
    name: 'FilterRenderMapSvg',
    components: { MapSvg },
    mounted () {
      this.panZoom()
    },
    methods: {
      panZoom () {
        // Expose to window namespace for testing purposes
        window.panZoom = svgPanZoom('#filter-render-map-svg', {
          zoomEnabled: true,
          minZoom: 1,
          maxZoom: 5,
          // controlIconsEnabled: true,
          fit: 1,
          center: 1,
          customEventsHandler: this.hammer.init
        })
      },
      hammer () {
        return {
          haltEventListeners: ['touchstart', 'touchend', 'touchmove', 'touchleave', 'touchcancel'],

          init: function (options) {
            const instance = options.instance
            let initialScale = 1,
              pannedX = 0,
              pannedY = 0

            // Init Hammer
            // Listen only for pointer and touch events
            this.hammer = Hammer(options.svgElement, {
              inputClass: Hammer.SUPPORT_POINTER_EVENTS ? Hammer.PointerEventInput : Hammer.TouchInput
            })

            // Enable pinch
            this.hammer.get('pinch').set({ enable: true })

            // Handle double tap
            this.hammer.on('doubletap', function (e) {
              instance.zoomIn()
            })

            // Handle pan
            this.hammer.on('panstart panmove', function (e) {
              // On pan start reset panned variables
              if (e.type === 'panstart') {
                pannedX = 0
                pannedY = 0
              }

              // Pan only the difference
              instance.panBy({ x: e.deltaX - pannedX, y: e.deltaY - pannedY })
              pannedX = e.deltaX
              pannedY = e.deltaY
            })

            // Handle pinch
            this.hammer.on('pinchstart pinchmove', function (e) {
              // On pinch start remember initial zoom
              if (e.type === 'pinchstart') {
                initialScale = instance.getZoom()
                instance.zoomAtPoint(initialScale * e.scale, { x: e.center.x, y: e.center.y })
              }

              instance.zoomAtPoint(initialScale * e.scale, { x: e.center.x, y: e.center.y })
            })

            // Prevent moving the page on some devices when panning over SVG
            options.svgElement.addEventListener('touchmove', function (e) { e.preventDefault() })
          },

          destroy: function () {
            this.hammer.destroy()
          }
        }
      },

      zoomIn () {
        panZoom.zoomIn()
      },

      resetZoom () {
        panZoom.resetZoom()
        panZoom.center()
      },

      zoomOut () {
        panZoom.zoomOut()
      }
    }
  }
</script>

<style lang="scss" scoped>
    .filter-render-map-svg-container {
        position: relative;
    }

    .filter-render-map-svg-container__svg {
        width: 100%;
        height: 100%;
    }

    .filter-render-map-svg__control {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        position: absolute;
        right: 15px;
        bottom: 15px;
        z-index: 1;
        height: 66px;

        & > * {
            position: relative;
            width: 18px;
            height: 18px;
            border: none;
            border-radius: 50%;
            background-color: #f26529;
            cursor: pointer;
        }
    }

    .filter-render-map-svg__control__zoom-in,
    .filter-render-map-svg__control__zoom-out {
        &::before {
            content: '';
            position: absolute;
            top: 50%;
            left: 15%;
            z-index: 1;
            width: 70%;
            height: 2px;
            margin-top: -1px;
            background-color: #FFFFFF;
        }
    }

    .filter-render-map-svg__control__zoom-in {
        &::after {
            content: '';
            position: absolute;
            top: 15%;
            left: 50%;
            z-index: 1;
            width: 2px;
            height: 70%;
            margin-left: -1px;
            background-color: #FFFFFF;
        }
    }
</style>
