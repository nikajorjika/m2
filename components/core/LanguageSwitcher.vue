<template>
  <div class="switcher">
    <div class="switcher__item" @click="toggleLanguage">
      <span class="switcher__label">
        {{ $t(`languages.${opositeLocale}`) }}
      </span>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  computed: {
    ...mapGetters(['locale','allLocales']),
    opositeLocale: function (){
      return this.allLocales.filter(item => item !== this.locale)[0]
    }
  },
  methods: {
    toggleLanguage() {
      const { params, name } = this.$route
      // this.$store.commit('SET_LANG', this.opositeLocale)
      // this.$i18n.locale = this.opositeLocale
      // console.log(this.locale, this.$i18n.locale)
      this.$router.push({ name, params: { ...params, lang: this.opositeLocale } })
    }
  }
}
</script>
<style lang="scss">
.switcher {
  display: flex;
  height: 63px;
  justify-content: flex-end;
  align-items: center;
  &__item {
    height: 38px;
    width: 38px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #ece7e5;
    color: #f26529;
    border-radius: 15px;
    text-align: center;
    font-size: 10px;
    font-family: $font-caps;
  }
}
</style>
