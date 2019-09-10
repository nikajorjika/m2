<template>
  <form class="search-form">
    <div class="search-form__input">
      <input type="text" v-model="searchBy" :placeholder="placeholderText" />
    </div>
    <div class="search-form__button">
      <button-main-orange :disabled="disabled" :button-text="buttonText" @click="handleSubmit">
        <template v-slot:icon>
          <exit-session-icon class="search-form__button__icon" width="13" height="9" icon-color="#fff" />
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
      default: function() { return this.$t('buttons.search') }
    },
    placeholderText: {
      type: String,
      default: () => 'XXXXXXXX'
    }
  },
  computed: {
    disabled: function () {
      return !this.searchBy.length
    }
  },
  data() {
    return {
      searchBy: ''
    }
  },
  methods: {
    handleSubmit: function (){
      if(this.disabled){
        return
      }
      this.$emit('submit')
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