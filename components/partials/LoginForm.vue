<template>
  <form class="confirm-form" @submit.prevent="handleSubmit">
    <div class="confirm-form__input">
      <input
        v-model="phone"
        ref="phone"
        type="text"
        :placeholder="$t('labels.phone')"
        @input="handleInput"
      />
      <div v-if="errors.phone.length && showErrors" class="error">
        {{ errors.phone }}
      </div>

      <div v-if="! (errors.phone.length && showErrors) && parentErrorMessage" class="error">
        {{ parentErrorMessage }}
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
  </form>
</template>

<script>
import ButtonMainOrange from '@/components/partials/ButtonMainOrange'
import ExitSessionIcon from '@/components/icons/ExitSession'
export default {
  components: { ButtonMainOrange, ExitSessionIcon },
  props: {
    buttonText: {
      type: String,
      default() {
        return this.$t('buttons.GetCode')
      }
    },
    parentErrorMessage: ''
  },
  data() {
    return {
      phone: '',
      errors: {
        phone: ''
      },
      showErrors: false
    }
  },
  mounted() {
    this.$refs.phone.focus()
  },
  methods: {
    handleInput() {
      this.validateForm()
    },
    handleSubmit() {
      if (this.validateForm()) {
        this.$emit('submit', { phone_number: this.phone })
      }
      this.showErrors = true
    },
    validateForm() {
      this.errors = {
        phone: ''
      }
      if (!this.phone.length) {
        this.errors.phone = this.$t('errors.PhoneFieldIsRequired')
      } else {
        this.$emit('discardParentErrorMessage')
      }
      return !this.errors.phone.length
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
  &__button {
    margin-right: auto;
    &__icon {
      margin-left: -2px;
    }
  }
}
</style>
