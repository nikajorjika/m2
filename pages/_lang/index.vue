<template>
  <div class="app-init">
    <app-card
      v-for="(item, index) in apps"
      :key="index"
      :title="item.title"
      @click="setApp(item.name)"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import AppCard from '@/components/partials/AppCard'
export default {
  components: { AppCard },
  middleware: 'chooseApp',
  data() {
    return {
      apps: [
        {
          title: this.$t('apps.renovation'),
          name: 'renovations'
        },
        {
          title: this.$t('apps.model'),
          name: 'model'
        }
      ]
    }
  },
  computed: {
    ...mapGetters({
      locale: 'locale',
      m2AppName: 'app'
    })
  },
  methods: {
    setApp(app) {
      this.$store.commit('SET_APP', app)
      this.goToApp(app)
    },
    goToApp(app) {
      this.$router.push({ path: `/${this.locale}/${app}` })
    }
  }
}
</script>
<style lang="scss" scoped>
.app-init {
  padding-top: 50px;
  padding-left: 50px;
  display: flex;
  justify-content: space-evenly;
}
</style>
