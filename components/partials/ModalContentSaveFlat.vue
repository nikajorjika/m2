<template>
  <div class="content">
    <h1 class="title">{{ $t('titles.flatPagesModal') }}</h1>

    <p class="description">{{ $t('descriptions.flatPagesModal') }}</p>

    <div class="buttons">
      <save-button
        :loading="saveFlatBtnLoading"
        :width="'250px'"
        :height="'40px'"
        :padding="'0 21px'"
        :label="saveFlatBtnLabel"
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
import { mapGetters } from 'vuex'
import SaveButton from '@/components/partials/RegularButton'
import SaveIcon from '@/components/icons/SaveIcon'

export default {
  components: {
    SaveButton,
    SaveIcon
  },
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      saveFlatBtnLoading: false,
      saveFlatBtnMsgShow: false
    }
  },
  computed: {
    ...mapGetters(['locale']),
    saveFlatBtnLabel() {
      return !this.saveFlatBtnMsgShow
        ? this.$t('labels.saveFlat')
        : this.$t('buttons.saved')
    }
  },
  mounted() {
    this.$root.$on('flatIsSaved', this.flatIsSaved)
  },
  methods: {
    saveFlat() {
      this.saveFlatBtnLoading = true

      this.$root.$emit('saveFlat')
    },
    continueWithoutSaving() {
      if (
        this.$route.name === 'lang-sales-customize-id-appliance' &&
        this.data.location &&
        this.data.location.path &&
        this.data.location.path.split('?')[0] ===
          `/${this.locale}/sales/chosen-flat/${this.$route.params.id}`
      ) {
        // Go to sales main page

        this.$router.push({
          path: `/${this.locale}/sales`,
          query: { redirect: 1 }
        })
      } else {
        // Go to saved flat page
        this.$eventBus.$emit('continue')
        // this.$emit('callback', 'continueWithoutSaving')
      }
    },
    flatIsSaved() {
      this.saveFlatBtnLoading = false
      this.saveFlatBtnMsgShow = true

      setTimeout(() => {
        this.saveFlatBtnMsgShow = false
      }, 3000)
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
