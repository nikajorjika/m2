<template>
  <div class="content">
    <h1 class="title">{{ $t('titles.flatPagesModal') }}</h1>

    <p class="description">{{ $t('descriptions.flatPagesModal') }}</p>

    <div class="buttons">
      <save-button
        :width="'250px'"
        :height="'40px'"
        :padding="'0 21px'"
        :label="$t('labels.saveFlat')"
        :icon-margin-left="'21px'"
        @regularBtnClick="saveFlat"
      >
        <template>
          <save-icon :width="'17px'" :height="'17px'" />
        </template>
      </save-button>

      <save-button
        :width="'250px'"
        :height="'40px'"
        :padding="'0 21px'"
        :background="'#f26529'"
        :label="$t('labels.dontSaveFlat')"
        :icon-margin-left="'21px'"
        @regularBtnClick="continueWithoutSaving"
      >
        <template>
          <save-icon :width="'17px'" :height="'17px'" />
        </template>
      </save-button>
    </div>
  </div>
</template>

<script>
import SaveButton from '@/components/partials/RegularButton'
import SaveIcon from '@/components/icons/SaveIcon'

export default {
  components: {
    SaveButton,
    SaveIcon
  },
  methods: {
    saveFlat() {
      this.$root.$emit('saveFlat')
    },
    continueWithoutSaving() {
      this.$emit('callback', 'continueWithoutSaving')
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
  align-self: flex-end;
  justify-self: flex-start;
  justify-content: space-between !important;
  margin-top: auto;
}
</style>
