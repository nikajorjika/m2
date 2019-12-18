<template>
  <div class="confirm-modal" @click.stop="closeModal">
    <div class="confirm-modal__wrapper" @click.stop>
      <div class="close-button" @click="closeModal">x</div>
      <div class="confirm-modal__content">
        <h4>{{ $t('modal.please_confirm_email') }}</h4>
        <div class="confirm-modal__buttons">
          <div class="input">
            <input v-model="email" type="text" :disabled="loading" />
          </div>
          <button
            :disabled="loading"
            class="button button-accept"
            @click="accept"
          >
            {{ $t('modal.send') }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    preset: {
      type: String,
      default: null
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      email: this.preset
    }
  },
  methods: {
    closeModal() {
      this.$emit('closed')
    },
    accept() {
      this.$emit('accept', this.email)
    }
  }
}
</script>

<style lang="scss" scoped>
.confirm-modal {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  display: flex;
  background: rgba(0, 0, 0, 0.7);
  z-index: 999;
  animation: fadeIn;
  &__wrapper {
    display: flex;
    flex-direction: column;
    position: relative;
    width: fit(900);
    padding: fit(80) fit(70) fit(70);
    margin: auto;
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
  }
  &__content {
    display: flex;
    flex-direction: column;
    height: 100%;
    h4 {
      font: 22px/1 'BPG Nino Mtavruli', sans-serif;
      color: #494949;
    }
  }

  &__buttons {
    margin-top: 40px;
    display: flex;
    .input {
      width: 100%;
      input {
        height: 100%;
        border: 1px solid #b9b9b9;
        border-radius: 12px;
        width: 90%;
        padding: 9px 19px;
        color: #494949;
        font-family: $font;
        letter-spacing: 0.7px;
        outline: none;
      }
    }
    .button {
      border: none;
      border-radius: 18px;
      background: $orange;
      color: #fff;
      padding: 10px 27px;
      font-size: 16px;
      outline: none;
      &-cancel {
        background: #8178b7;
      }
      &[disabled='disabled'] {
        pointer-events: none;
        opacity: 0.6;
      }
    }
  }
}
@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>
