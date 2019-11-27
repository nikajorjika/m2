<template>
  <div
    v-if="formattedPrice && currencySymbol"
    class="gradient-label price-label"
  >
    <span>
      {{ formattedPrice
      }}<i :class="classObject" style="font-style: normal">{{
        currencySymbol
      }}</i>
    </span>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  props: {
    textBeforePrice: {
      type: String,
      default: ''
    },
    price: {
      type: [String, Number],
      required: true
    },
    textAfterPrice: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      formattedPrice: '',
      currencySymbol: ''
    }
  },
  computed: {
    ...mapGetters({
      defaultCurrency: 'GET_DEFAULT_CURRENCY',
      currency: 'GET_CURRENCY'
    }),
    classObject() {
      return {
        'gel-sign': this.currencySymbol === 'i',
        right: this.currencySymbol === 'i'
      }
    }
  },
  mounted() {
    this.formatPrice()
  },
  created() {
    this.$store.watch(
      (state, getters) => getters.GET_CURRENCY,
      (newValue, oldValue) => {
        this.currencyConverter(this.price, oldValue, newValue)
      }
    )
  },
  methods: {
    formatPrice() {
      this.currencyConverter(this.price, this.defaultCurrency, this.currency)
    },
    currencyConverter(price, currencyFrom, currencyTo) {
      return this.$currencyConverter(price, currencyFrom, currencyTo).then(
        (price) => {
          this.formattedPrice = `${this.textBeforePrice} ${price} ${this.textAfterPrice}`
          this.currencySymbol = this.getCurrencySymbol()
        }
      )
    },
    getCurrencySymbol() {
      switch (this.currency) {
        case 'GEL':
          return 'i'
        case 'USD':
          return '$'
        default:
          return this.currency
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.gradient-label {
  color: #ffffff;
  position: relative;
  display: flex;
  align-items: center;
  height: 42px;
  margin: auto 15px auto 0;
  padding: 0 fit(30);
  font-family: $font;
  font-size: 14px;
  opacity: 0.6;
  border-radius: 14px;
  overflow: hidden;
  letter-spacing: 0.8px;
  transition: width 200ms ease-in;

  span {
    position: relative;
    z-index: 1;
  }

  &:before {
    content: '';
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 0;
    position: absolute;
    background: linear-gradient(60deg, #684f78 0%, #e26479 100%);
  }
}

/* GEL Sign */

.gel-sign {
  font-family: 'lari-symbol-v2', Arial, 'Times New Roman', 'Bitstream Charter',
    Times, serif !important;
  font-style: normal !important;
}

.gel-sign.left {
  padding-right: 2px;
}

.gel-sign.right {
  padding-left: 2px;
}
</style>
