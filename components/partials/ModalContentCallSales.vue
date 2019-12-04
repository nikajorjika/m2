<template>
  <div>
    <illustrated-button :label="question">
      <template v-slot:illustration>
        <manager-icon
          :width="49"
          :height="114"
          :style="{ marginTop: '-3px' }"
        />
      </template>
    </illustrated-button>

    <div class="buttons">
      <button-main-orange
        :button-text="firstBtnLabel"
        :text-padding="'0 0 0 12px'"
        class="summon-sale"
        @click.native.prevent="summonSale"
      >
        <template v-slot:icon>
          <sells width="15" height="15" icon-color="#fff" />
        </template>
      </button-main-orange>

      <button-main-orange
        v-if="isAvailable"
        :button-text="secondBtnLabel"
        :text-padding="'0 0 0 12px'"
        class="cancel-summon-sale"
        @click.native.prevent="cancelSummonSale"
      >
        <template v-slot:icon>
          <sells width="13" height="13" icon-color="#3c2270" />
        </template>
      </button-main-orange>

      <button-main-orange
        v-if="!isAvailable"
        :button-text="secondBtnLabel"
        :text-padding="'0 0 0 12px'"
        class="cancel-summon-sale"
        @click.native.prevent="waitSale"
      >
        <template v-slot:icon>
          <sells width="13" height="13" icon-color="#3c2270" />
        </template>
      </button-main-orange>
    </div>
  </div>
</template>

<script>
import IllustratedButton from '@/components/partials/IllustratedButton'
import ManagerIcon from '@/assets/icons/Manager1.svg'
import ButtonMainOrange from '@/components/partials/ButtonMainOrange'
import Sells from '@/components/icons/Sells'

export default {
  components: {
    IllustratedButton,
    ManagerIcon,
    ButtonMainOrange,
    Sells
  },
  data() {
    return {
      planshetId: this.$cookies.get('paveleon-planshet'),
      isAvailable: true,
      isWaiting: null
    }
  },
  computed: {
    question() {
      return this.isAvailable
        ? this.$t('labels.callSalesQuestion')
        : this.$t('labels.saleIsBusy')
    },
    firstBtnLabel() {
      return this.isAvailable
        ? this.$t('buttons.continue')
        : this.$t('buttons.confirmCallSale')
    },
    secondBtnLabel() {
      return this.isAvailable
        ? this.$t('buttons.cancelTheCall')
        : this.$t('buttons.awaitSale')
    }
  },
  methods: {
    summonSale() {
      this.$axios
        .post('user/summon-sale', {
          planshet_id: this.planshetId,
          wait: this.isWaiting
        })
        .then((response) => {
          if (response.status === 200) {
            this.isWaiting = false
            if (response.data.has_old_sale) {
              // User has sales manager. Need to ask additional question

              this.isAvailable = false
            } else {
              // Sales manager is called. Go to waiting page

              this.$eventBus.$emit('redirect')
            }
          }
        })
    },
    cancelSummonSale() {
      this.$eventBus.$emit('closeModal')
    },
    waitSale() {
      this.isWaiting = true

      this.summonSale()
    }
  }
}
</script>

<style lang="scss">
.layout-modal {
  justify-content: center;
  width: fit(1060) !important;
  height: fit(760) !important;
  padding: fit(160) fit(140) fit(140) !important;

  .button {
    width: fit(780);
    height: fit(122);
    padding-left: 25px;
    border-radius: 30px;
    background-color: rgba(241, 216, 202, 0.32);

    .label {
      margin-right: fit(35, fitRaw(16));
      font-family: $font-caps;
      font-size: fit(24);
      letter-spacing: 1px;
      font-weight: bold;
      color: #494949;
    }

    .svg-container {
      display: none;
    }
  }

  .buttons {
    display: flex;
    justify-content: center;
    margin-top: fit(55);
  }

  .btn {
    margin-top: fit(36);

    &.summon-sale {
      margin-right: fit(40);
    }

    .btn-standard__icon {
      margin: auto 8px auto 14px;
      border: none;
    }

    &.cancel-summon-sale {
      background-color: #fff;
      border: 1px solid rgba(60, 34, 112, 0.3);

      .btn-standard__text {
        font-family: 'BPG WEB 001', sans-serif;
        font-size: 14px;
        letter-spacing: initial;
        font-weight: initial;
        color: #3c2270;
      }

      .btn-standard__icon {
        margin: auto 8px;
      }
    }
  }
}
</style>
