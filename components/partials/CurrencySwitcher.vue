<template>
  <div
    v-if="!loading && currency"
    :class="['currency-switcher', currency === 'GEL' ? 'on' : '']"
    :data-currency="currency"
    @click="toggle"
  >
    <span :class="usdClassObject">$</span>

    <span :class="gelClassObject">
      <i class="gel-sign right">i</i>
    </span>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      loading: true
    }
  },
  computed: {
    ...mapGetters({
      currency: 'GET_CURRENCY'
    }),
    usdClassObject() {
      return {
        usd: 'usd',
        active: this.currency === 'USD'
      }
    },
    gelClassObject() {
      return {
        gel: 'gel',
        active: this.currency === 'GEL'
      }
    }
  },
  mounted() {
    this.$nextTick(function() {
      this.loading = false
    })
  },
  methods: {
    toggle(e) {
      const switcher = e.target.closest('.currency-switcher')

      if (switcher.classList.contains('on')) {
        switcher.classList.remove('on')
      } else {
        switcher.classList.add('on')
      }

      const currency =
        switcher.getAttribute('data-currency') === 'GEL' ? 'USD' : 'GEL'

      switcher.setAttribute('data-currency', currency)

      // Change currency

      this.$store.commit('SET_CURRENCY', currency)
    }
  }
}
</script>

<style lang="scss" scoped>
.currency-switcher {
  display: flex;
  align-items: center;
  position: relative;
  z-index: 1;
  width: calc(#{fit(80)} + 20px);
  height: 42px;
  margin: auto 0;
  padding: 0 10px;
  cursor: pointer;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    z-index: -2;
    width: 100%;
    height: 100%;
    border-radius: 30px;
    background-color: rgba(242, 101, 41, 0.15);
  }

  &::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 0;
    z-index: -1;
    width: fit(40);
    height: fit(40);
    margin: 0 10px;
    border-radius: 20px;
    background-color: #f26529;
    transform: translate3d(0, -50%, 0);
    transition: transform 200ms ease-out;
  }

  &.on::after {
    transform: translate3d(100%, -50%, 0);
  }

  .usd,
  .gel {
    width: fit(40);
    padding-top: 3px;
    text-align: center;
    transition: color 200ms ease-out;
  }

  .usd {
    color: #fff;
  }

  .gel {
    padding-right: 2px;
    color: #494949;
  }

  &.on {
    .usd {
      color: #494949;
    }

    .gel {
      color: #fff;
    }
  }
}

/* GEL Sign */

.gel-sign {
  font-family: 'lari-symbol-v2', Arial, 'Times New Roman', 'Bitstream Charter',
    Times, serif;
  font-style: normal !important;
}

.gel-sign.left {
  padding-right: 2px;
}

.gel-sign.right {
  padding-left: 2px;
}
</style>
