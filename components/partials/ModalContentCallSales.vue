<template>
  <div>
    <illustrated-button
      :label="$t('labels.callSalesQuestion')"
      @click.native.prevent="summonSale"
    >
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
        :button-text="$t('buttons.continue')"
        :text-padding="'0 0 0 12px'"
        @click.native.prevent="summonSale"
      >
        <template v-slot:icon>
          <sells width="15" height="15" icon-color="#fff" />
        </template>
      </button-main-orange>

      <button-main-orange
        :button-text="$t('buttons.cancelTheCall')"
        :text-padding="'0 0 0 12px'"
        @click.native.prevent="summonSale"
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
    }
  },
  methods: {
    summonSale() {
      return new Promise((resolve, reject) => {
        this.$axios
          .post('user/summon-sale', {
            flat_id: null,
            planshet_id: this.planshetId
          })
          .then((response) => {
            if (response.status === 200) {
              resolve(response)
            }
          })
          .catch((e) => {
            reject(e)
          })
      })
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

    &:first-child {
      margin-right: fit(40);
    }

    .btn-standard__icon {
      margin: auto 8px auto 14px;
      border: none;
    }

    &:last-child {
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
