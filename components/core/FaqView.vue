<template>
  <div class="faq-view">
    <language-switcher class="faq-switcher" />
    <slot />
    <div class="close-container">
      <close-button :button-text="$t('buttons.CLOSE')" @click="goBack" />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import LanguageSwitcher from '@/components/core/LanguageSwitcher'
import CloseButton from '@/components/partials/CloseButton'
export default {
  components: { CloseButton, LanguageSwitcher },
  computed: {
    ...mapGetters({ locale: 'locale' })
  },
  methods: {
    goBack() {
      const query = this.$route.query
      console.log(query.hasOwnProperty('redirect'))
      if (query.hasOwnProperty('redirect')) {
        this.$router.push({
          name: query.redirect,
          params: {
            lang: this.locale
          }
        })
      } else {
        this.$router.go(-1)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.faq-view {
  flex: 1;
  width: calc(100% - 81px);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  .close-container {
    margin: auto 50px;
  }
  .faq-switcher {
    margin-right: 67px;
    height: 63px;
  }
}
</style>
