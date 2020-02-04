<template>
  <form @submit.prevent="handleSubmit" class="registration-form">
    <div class="registration-form__input required">
      <input
        v-model="name"
        :placeholder="$t('labels.name')"
        :disabled="loading"
        @input="handleInput"
        type="text"
      />
      <div v-if="errors.name.length && showErrors" class="error">
        {{ errors.name }}
      </div>
    </div>
    <div class="registration-form__input required">
      <input
        v-model="phone"
        :placeholder="$t('labels.phone')"
        :disabled="loading"
        @input="handleInput"
        type="text"
      />
      <div v-if="errors.phone.length && showErrors" class="error">
        {{ errors.phone }}
      </div>
      <div v-if="errorKey === 'phone'" class="error">
        {{ error }}
      </div>
    </div>
    <div class="registration-form__input">
      <input
        v-model="email"
        :placeholder="$t('labels.email')"
        :disabled="loading"
        @input="handleInput"
        type="text"
      />
      <div v-if="errors.email.length && showErrors" class="error">
        {{ errors.email }}
      </div>
      <div v-if="errorKey === 'email'" class="error">
        {{ error }}
      </div>
    </div>
    <div class="registration-form__button">
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
        return this.$t('buttons.register')
      }
    },
    loading: {
      type: Boolean,
      default: false
    },
    errorKey: {
      type: String,
      default: ''
    },
    error: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      name: '',
      phone: '',
      email: '',
      errors: {
        name: '',
        phone: '',
        email: ''
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
        this.$emit('register', {
          name: this.name,
          phone_number: this.phone,
          email: this.email
        })
      }
      this.showErrors = true
    },
    validateForm() {
      this.$emit('removeErrors')

      this.errors = {
        name: '',
        phone: '',
        email: ''
      }
      if (!this.name.length) {
        this.errors.name = this.$t('errors.NameFieldIsRequired')
      }
      if (
        !this.phone.length ||
        isNaN(this.phone) ||
        !this.validatePhone(this.phone)
      ) {
        this.errors.phone = this.$t('errors.PhoneFieldIsRequired')
      }
      // if (!this.email.length || !this.validateEmail(this.email)) {
      //   this.errors.email = this.$t('errors.emailIsNotValid')
      // }
      return (
        !this.errors.name.length &&
        !this.errors.phone.length &&
        !this.errors.email.length
      )
    },
    validateEmail(email) {
      // eslint-disable-next-line no-useless-escape
      const emailValidationRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      return emailValidationRegex.test(String(email).toLowerCase())
    },
    validatePhone(phone) {
      const phoneValidationRegex = /^[0-9+]{9,}$/
      return phoneValidationRegex.test(phone)
    }
  }
}
</script>

<style lang="scss" scoped>
.registration-form {
  align-items: center;
  display: grid;
  grid-template-columns: repeat(2, 288px);
  grid-template-rows: repeat(2, 46px);
  grid-column-gap: 53px;
  grid-row-gap: 47px;
  .error {
    font-size: 11px;
    color: red;
    margin-left: 8px;
    margin-top: 5px;
  }
  &__input {
    position: relative;
    height: 100%;
    input {
      height: 100%;
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
    &.required::after {
      content: '*';
      position: absolute;
      top: -10px;
      right: -5px;
      z-index: 1;
      color: red;
      transform: scale3d(1.35, 1.35, 1.35);
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
