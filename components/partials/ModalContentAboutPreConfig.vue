<template>
  <div class="content">
    <h1 class="title">{{ $t('modal.aboutFilterTitle') }}</h1>

    <p class="description">{{ $t('modal.aboutFilterDesc') }}</p>

    <div class="buttons">
      <confirm-button
        :width="'auto'"
        :height="'40px'"
        :padding="'0 21px'"
        :border="'1px solid #3c2270'"
        :background="'transparent'"
        :label="$t('modal.ok')"
        :label-color="'#3c2270'"
        :icon-margin-left="'0'"
        @regularBtnClick="close"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import ConfirmButton from '@/components/partials/RegularButton'

export default {
  components: {
    ConfirmButton
  },
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  computed: {
    ...mapGetters(['locale'])
  },
  methods: {
    close() {
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
