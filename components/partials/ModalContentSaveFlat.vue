<template>
  <div class="content">
    <h1 class="title">{{ $t('titles.flatPagesModal') }}</h1>

    <p class="description">{{ $t('descriptions.flatPagesModal') }}</p>

    <div class="buttons">
      <save-button
        :loading="saveFlatBtnLoading"
        :width="'auto'"
        :height="'40px'"
        :padding="'0 21px'"
        :label="$t('modal.yes')"
        :icon-margin-left="'0'"
        @regularBtnClick="saveFlat"
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
        @regularBtnClick="continueWithoutSaving"
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
  data() {
    return {
      saveFlatBtnLoading: false
    }
  },
  computed: {
    ...mapGetters({
      locale: 'locale',
      flat: 'customize/flat',
      renovationId: 'customize/renovationId',
      furnitureId: 'customize/furnitureId',
      decorationId: 'customize/decorationId',
      appliancesIds: 'customize/appliancesIds'
    })
  },
  methods: {
    saveFlat() {
      this.saveFlatBtnLoading = true

      const data = {
        flat_id: this.flat ? this.flat.id : null,
        renovation_id: this.renovationId,
        furniture_id: this.furnitureId,
        decoration_id: this.decorationId,
        appliances_ids: this.appliancesIds
      }

      // Reset flat configurations

      this.$store.commit('customize/SET_CONFIGURATIONS', [])

      return new Promise((resolve, reject) => {
        this.$axios
          .post('user/save-flat', data)
          .then((response) => {
            if (response.status === 200 && response.data.success) {
              // Store flat configurations

              this.$store.commit('customize/SET_CONFIGURATIONS', data)

              this.$eventBus.$emit('continue')
            }

            this.saveFlatBtnLoading = false

            resolve(response)
          })
          .catch((e) => {
            this.saveFlatBtnLoading = false

            reject(e)
          })
      })
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
