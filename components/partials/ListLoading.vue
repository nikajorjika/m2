<template>
  <div class="loading" ref="Loading">
    <div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
  </div>
</template>

<script>
  export default {
    props: {
      shouldLoadMore: {
        type: Boolean,
        default: true
      },
      isFetching: {
        type: Boolean,
        default: true
      }
    },
    data() {
      return {
        observer: null
      }
    },
    mounted() {
        this.observer = new IntersectionObserver(this.callback, this.options)
        this.observer.observe(this.$refs.Loading)
    },
    methods: {
      callback(data) {
        if(data[0].isIntersecting) {
          this.$emit('load')
        }
      },
    }
  }
</script>

<style lang="scss" scoped>
.loading {
  display: flex;
  justify-content: center;
  align-items: center;
}
.lds-ellipsis {
  display: inline-block;
  position: relative;
  width: 80px;
  height: 30px;
}
.lds-ellipsis div {
  position: absolute;
  top: 11px;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: $orange;
  animation-timing-function: cubic-bezier(0, 1, 1, 0);
}
.lds-ellipsis div:nth-child(1) {
  left: 8px;
  animation: lds-ellipsis1 0.6s infinite;
}
.lds-ellipsis div:nth-child(2) {
  left: 8px;
  animation: lds-ellipsis2 0.6s infinite;
}
.lds-ellipsis div:nth-child(3) {
  left: 32px;
  animation: lds-ellipsis2 0.6s infinite;
}
.lds-ellipsis div:nth-child(4) {
  left: 56px;
  animation: lds-ellipsis3 0.6s infinite;
}
@keyframes lds-ellipsis1 {
  0% {
    transform: scale(0);
  }
  100% {
    transform: scale(1);
  }
}
@keyframes lds-ellipsis3 {
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(0);
  }
}
@keyframes lds-ellipsis2 {
  0% {
    transform: translate(0, 0);
  }
  100% {
    transform: translate(24px, 0);
  }
}

</style>