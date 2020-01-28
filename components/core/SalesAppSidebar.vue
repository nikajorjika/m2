<template>
  <div :class="{ 'no-margin': noMargin }" class="sidebar">
    <nuxt-link :to="logoLink" class="link">
      <logo class="sidebar__logo" />
    </nuxt-link>
    <div class="sidebar__list">
      <nuxt-link
        v-for="(item, index) in items"
        :key="index"
        :to="item.path"
        :class="{
          hide:
            (!isSales && item.path === `/${locale}/sales/registration`) ||
            (!isLoggedIn && item.requiresLoggin)
        }"
        class="sidebar__list__item"
      >
        <div class="sidebar__list__item__icon">
          <component
            :is="item.component"
            icon-color="url(#gradient)"
            width="12px"
            height="12px"
          />
        </div>
        <div class="sidebar__list__item__label">
          {{ item.title[locale] }}
        </div>
      </nuxt-link>
    </div>
    <client-only>
      <div v-if="showSummon" class="sidebar__sales">
        <button class="sidebar__sales__button" @click="callForSales">
          <sells-icon icon-color="white" width="12px" height="12px" />
          <span>
            {{ $t('buttons.Sales') }}
          </span>
        </button>
      </div>
    </client-only>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Logo from '@/components/core/Logo'
import MainIcon from '@/components/icons/Main'
import QuestionsIcon from '@/components/icons/Questions'
import SellsIcon from '@/components/icons/Sells'
import Favourite from '@/components/icons/Favourite'
export default {
  components: { Logo, SellsIcon },
  props: {
    homepage: {
      type: [String, Object],
      default: ''
    },
    noMargin: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      loading: false
    }
  },
  computed: {
    ...mapGetters({
      locale: 'locale',
      user: 'auth/user',
      token: 'auth/token'
    }),
    isSales() {
      return !this.$cookies.get('paveleon-planshet')
    },
    isLoggedIn() {
      return this.user && this.token
    },
    logoLink() {
      return this.homepage.length > 0 ? this.homepage : `/${this.locale}/sales`
    },
    showSummon() {
      return this.$route.name !== 'lang-sales-waiting'
    },
    items() {
      return [
        {
          title: {
            en: 'Main',
            ka: 'მთავარი'
          },
          path: `/${this.locale}/sales`,
          component: MainIcon,
          requiresLoggin: false
        },
        {
          title: {
            en: 'Favourites',
            ka: 'ფავორიტები'
          },
          path: `/${this.locale}/sales/favourites`,
          component: Favourite,
          requiresLoggin: true
        },
        {
          title: {
            en: 'FAQ',
            ka: 'კითხვები'
          },
          path: `/${this.locale}/model/faq?redirect=${this.$route.name}`,
          component: QuestionsIcon,
          requiresLoggin: false
        }
      ]
    },
    modalData() {
      return {
        location: {
          name: 'lang-sales-waiting',
          params: { lang: this.locale }
        }
      }
    },
    modalMessage() {
      return {
        message: this.$t('labels.acceptedCall')
      }
    }
  },
  mounted() {
    // Listen pusher channel to notify user that sale accept the request

    this.pusher.subscribe('confirmSaleUser', (channel) => {
      channel.bind('App\\Events\\ConfirmSaleUser', (data) => {
        if (data.status) {
          this.$eventBus.$emit(
            'openModal',
            'modal-content-message',
            this.modalMessage
          )
        }
      })
    })
  },
  beforeDestroy() {
    this.pusher.unsubscribe('confirmSaleUser')
  },
  methods: {
    callForSales() {
      if (!this.isLoggedIn) {
        this.$router.push({
          name: 'lang-sales-login',
          params: {
            lang: this.locale
          }
        })
        return
      }

      if (!this.loading) {
        this.loading = true

        this.$axios.get('/user/awaiting-status').then((response) => {
          this.loading = false

          // Check if sales manager is already called

          if (!response.data.status) {
            // Open modal

            this.$eventBus.$emit(
              'openModal',
              'modal-content-call-sales',
              this.modalData
            )
          } else {
            // Go to waiting page

            this.$router.push({
              name: 'lang-sales-waiting',
              params: { lang: this.locale }
            })
          }
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.sidebar {
  background: #fff;
  width: 81px;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  position: relative;
  // margin-right: 3%;
  border-top-right-radius: 80px;
  box-shadow: 2px 3px 21.76px 10.24px rgba(67, 34, 114, 0.07);
  &.no-margin {
    margin-right: 0;
  }
  .link {
    display: inherit;
  }
  &__sales {
    margin: auto auto 36px;
    @media screen and (max-height: 628px) {
      display: none;
    }
    &__button {
      background: $orange;
      border: none;
      width: 72px;
      height: 65px;
      border-radius: 20px;
      color: white;
      text-align: center;
      font-family: $font-caps;
      font-weight: bold;
      font-size: 9px;
      letter-spacing: 0.6px;
      outline: none;
      span {
        margin-top: 8px;
        display: block;
      }
    }
  }
  &__logo {
    width: 43%;
    margin: 89px auto 0;
  }
  &__list {
    position: absolute;
    left: 50%;
    top: 33%;
    display: flex;
    flex-direction: column;
    transform: translateX(-50%);
    &__item {
      margin: 20px 0;
      display: flex;
      flex-direction: column;
      text-decoration: none;
      color: #3c2270;
      &.hide {
        display: none;
      }
      &:visited {
        color: #3c2270;
      }
      &__icon {
        background: #f7f6f9;
        border-radius: 16px;
        margin: 0 auto;
        padding: 6px 20px;
      }
      &__label {
        font-size: 10px;
        font-family: $font-caps;
        margin-top: 15px;
        font-weight: 600;
        text-align: center;
        // text-transform: uppercase;
      }
    }
  }
}
</style>
<style>
[lang='en'] .sidebar__list__item__label {
  font-weight: 800;
}
</style>
