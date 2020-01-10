<template>
  <div class="confirm-modal" @click.stop="closeModal">
    <div class="confirm-modal__wrapper" @click.stop>
      <div class="close-button" @click="closeModal">x</div>
      <div class="confirm-modal__content">
        <h4>{{ cQuestion }}</h4>
        <div class="confirm-modal__buttons">
          <button class="button button-accept" @click="accept">
            {{ cYesText }}
          </button>
          <button class="button button-cancel" @click="decline">
            {{ cNoText }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    question: {
      type: String,
      default: null
    },
    yesText: {
      type: String,
      default: null
    },
    noText: {
      type: String,
      default: null
    }
  },
  computed: {
    cQuestion() {
      return this.question
        ? this.question
        : this.$t('modal.are_you_sure_question')
    },
    cYesText() {
      return this.yesText ? this.yesText : this.$t('modal.yes')
    },
    cNoText() {
      return this.noText ? this.noText : this.$t('modal.no')
    }
  },
  mounted() {},
  methods: {
    closeModal() {
      this.$emit('closed')
    },
    decline() {
      this.$emit('decline')
    },
    accept() {
      this.$emit('accept')
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
      font: 22px 'BPG Nino Mtavruli', sans-serif;
      line-height: 26px;
      color: #494949;
    }
  }

  &__buttons {
    margin-top: 40px;
    .button {
      border: none;
      border-radius: 18px;
      font-family: $font-caps;
      background: $orange;
      color: #fff;
      padding: 10px 27px;
      font-size: 16px;
      outline: none;
      margin-right: 18px;
      &-cancel {
        background: #8178b7;
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
