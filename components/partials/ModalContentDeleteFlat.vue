<template>
  <div class="content">
    <h1 class="title">{{ $t('modal.favouritesPageModal') }}</h1>

    <div class="buttons">
      <save-button
        :width="'auto'"
        :height="'40px'"
        :padding="'0 21px'"
        :label="$t('modal.yes')"
        :icon-margin-left="'0'"
        @regularBtnClick="removeFlat"
      />

      <save-button
        :width="'auto'"
        :height="'40px'"
        :padding="'0 21px'"
        :border="'1px solid #3c2270'"
        :background="'transparent'"
        :label="$t('modal.no')"
        :label-color="'#3c2270'"
        :icon-margin-left="'0'"
        @regularBtnClick="cancel"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import SaveButton from '@/components/partials/RegularButton'

export default {
  components: {
    SaveButton
  },
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  computed: {
    ...mapGetters(['locale']),
    modalMessageRemovedFlat() {
      return {
        message: this.$t('messages.removedFlat')
      }
    }
  },
  methods: {
    removeFlat() {
      this.$axios
        .post('user/remove-flat', {
          user_flat_id: this.data.id
        })
        .then((response) => {
          if (response.status === 200) {
            this.$eventBus.$emit(
              'openModal',
              'modal-content-message',
              this.modalMessageRemovedFlat
            )

            this.removeElement('flat-' + this.data.id)
          }
        })
        .catch((e) => {
          console.error(e)
        })
    },
    removeElement(elementId) {
      const element = document.getElementById(elementId)

      element.parentNode.parentNode.removeChild(element.parentNode)
    },
    cancel() {
      this.$eventBus.$emit('closeModal')
    }
  }
}
</script>

<style lang="scss" scoped>
.content {
  width: 100%;
  display: flex;
  flex-direction: column;
}

.title {
  font: 24px/1 $font-caps;
  color: $font-color;
}

.description {
  margin-top: fit(30);
  font: 16px/1.4 $font;
  color: $font-color;
}

.buttons {
  width: 100%;
  display: flex;
  align-self: flex-start;
  justify-self: flex-start;
  margin-top: fit(40);

  .regular-btn:first-child {
    margin-right: fit(30);
  }
}
</style>
