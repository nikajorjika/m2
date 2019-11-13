<template>
  <div v-if="formattedPrice && currencySymbol" class="gradient-label">
    <span>
      {{ formattedPrice }}<i :class="classObject">{{ currencySymbol }}</i>
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
      currencySymbol: '',
      previousCurrency: ''
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
  methods: {
    formatPrice() {
      if (this.previousCurrency === '') {
        this.previousCurrency = this.defaultCurrency
      }

      return this.$currencyConverter(
        this.price,
        this.previousCurrency,
        this.currency
      ).then((price) => {
        let textBeforePrice = this.textBeforePrice

        if (textBeforePrice === '') {
          textBeforePrice = this.$t('labels.price')
        }

        this.formattedPrice = `${textBeforePrice} ${price} ${this.textAfterPrice}`
        this.currencySymbol = this.getCurrencySymbol()
        this.previousCurrency = this.currency
      })
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
  display: inline-block;
  font-family: $font;
  font-size: 14px;
  padding: 14px 24px 12px;
  opacity: 0.6;
  border-radius: 14px;
  overflow: hidden;
  letter-spacing: 0.8px;

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
