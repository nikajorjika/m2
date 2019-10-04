<template>
  <form class="confirm-form" @submit.prevent="handleSubmit">
    <div class="confirm-form__input">
      <input
        v-model="code"
        type="text"
        placeholder="XXXX"
        @input="handleInput"
      />
      <div v-if="errors.code.length && showErrors" class="error">
        {{ errors.code }}
      </div>
    </div>
    <div class="confirm-form__button">
      <button-main-orange :button-text="buttonText">
        <template v-slot:icon>
          <exit-session-icon
            class="search-form__button__icon"
            width="13"
            height="9"
            icon-color="#fff"
          />
        </template>
      </button-main-orange>
    </div>
    <a class="confirm-form__resend" @click.prevent="handleResend">
      <small
        ><paper-plane-icon icon-color="#f26529" width="10" height="12" />
        <span>{{ $t('labels.SendCodeAgain') }}</span></small
      >
    </a>
  </form>
</template>

<script>
import ButtonMainOrange from '@/components/partials/ButtonMainOrange'
import ExitSessionIcon from '@/components/icons/ExitSession'
import PaperPlaneIcon from '@/components/icons/PaperPlane'
export default {
  components: { ButtonMainOrange, ExitSessionIcon, PaperPlaneIcon },
  props: {
    buttonText: {
      type: String,
      default() {
        return this.$t('buttons.ConfirmPhone')
      }
    }
  },
  data() {
    return {
      code: '',
      errors: {
        code: ''
      },
      showErrors: false
    }
  },
  methods: {
    handleInput() {
      this.validateForm()
    },
    handleSubmit() {
      if (this.validateForm()) {
        this.$emit('submit', { code: this.code })
      }
      this.showErrors = true
    },
    handleResend() {
      this.$emit('resend')
    },
    validateForm() {
      this.errors = {
        code: ''
      }
      if (!this.code.length) {
        this.errors.code = this.$t('errors.CodeFieldIsRequired')
      }
      return !this.errors.code.length
    },
    validatePhone(phone) {
      const phoneValidationRegex = /^[0-9+]{9,}$/
      return phoneValidationRegex.test(phone)
    }
  }
}
</script>

<style lang="scss" scoped>
.confirm-form {
  display: flex;
  align-items: center;
  display: grid;
  grid-template-columns: repeat(2, 288px);
  grid-template-rows: repeat(2, 46px);
  grid-column-gap: 53px;
  grid-row-gap: 15px;
  .error {
    font-size: 11px;
    color: red;
    margin-left: 8px;
    margin-top: 5px;
  }
  &__input {
    height: 100%;
    input {
      height: 100%;
      letter-spacing: 0.8px;
      border: none;
      border-radius: 20px;
      padding: 19px 22px;
      font-size: 11px;
      margin-right: 44px;
      width: 288px;
      &:focus {
        outline: none;
      }
    }
  }
  &__resend {
    color: $orange;
    font-size: 12px;
    margin-left: 18px;
    small {
      display: flex;
      align-items: center;
      span {
        margin-left: 13px;
      }
    }
  }
  &__button {
    margin-right: auto;
    &__icon {
      margin-left: -2px;
    }
  }
}
</style>
