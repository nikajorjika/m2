<template>
  <div class="app-init">
    <div v-if="loading" class="loading">
      <logo />
    </div>
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
import Logo from '@/components/core/Logo'
import AppCard from '@/components/partials/AppCard'
export default {
  components: { AppCard, Logo },
  middleware: 'chooseApp',
  data() {
    return {
      loading: true,
      apps: [
        {
          title: this.$t('apps.renovation'),
          name: 'renovations'
        },
        {
          title: this.$t('apps.model'),
          name: 'model'
        },
        {
          title: this.$t('apps.sales'),
          name: 'sales'
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
  mounted() {
    if(this.$cookies.get('paveleon-app')){
      this.$router.push(`/${this.locale}/${this.$cookies.get('paveleon-app')}`)  
    }else {
      this.loading = false
    }
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
  .loading { 
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: #f1ece6;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9999;
  }
}
</style>
