<template>
  <form class="search-form">
    <div class="search-form__input">
      <input v-model="searchBy" type="text" :placeholder="placeholderText" />
    </div>
    <div class="search-form__button">
      <button-main-orange
        :disabled="disabled"
        :button-text="buttonText"
        @click="handleSubmit"
      >
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
        return this.$t('buttons.search')
      }
    },
    placeholderText: {
      type: String,
      default: () => 'XXXXXXXX'
    }
  },
  data() {
    return {
      searchBy: ''
    }
  },
  computed: {
    disabled() {
      return !this.searchBy.length
    }
  },
  methods: {
    handleSubmit() {
      if (this.disabled) {
        return
      }
      this.$emit('submit', this.searchBy)
    }
  }
}
</script>

<style lang="scss" scoped>
.search-form {
  display: flex;
  align-items: center;
  height: 47px;
  &__input {
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
  }
  &__button {
    &__icon {
      margin-left: -2px;
    }
  }
}
</style>
