<template>
  <div class="sidebar">
    <nuxt-link class="link" :to="logoLink">
      <logo class="sidebar__logo" />
    </nuxt-link>
    <div class="sidebar__list">
      <nuxt-link
        v-for="(item, index) in items"
        :key="index"
        :to="item.path"
        class="sidebar__list__item"
        :class="{
          hide:
            (!isSales && item.path === `/${locale}/sales/registration`) ||
            (!isLoggedIn && item.requiresLoggin)
        }"
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
    <div v-if="showSummon" class="sidebar__sales">
      <button class="sidebar__sales__button" @click="callForSales">
        <sells-icon icon-color="white" width="12px" height="12px" />
        <span>
          {{ $t('buttons.Sales') }}
        </span>
      </button>
    </div>
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
    }
  },
  data() {
    return {
      isLoggedIn: !!this.$cookies.get('auth._token.local'),
      isAwaiting: false
    }
  },
  computed: {
    ...mapGetters(['locale']),
    isSales() {
      return !this.$cookies.get('paveleon-planshet')
    },
    logoLink() {
      return this.homepage.length > 0 ? this.homepage : `/${this.locale}/sales`
    },
    showSummon() {
      return this.$router.name !== 'lang-sales-waiting' && this.isLoggedIn
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
          path: `/${this.locale}/model/faq`,
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
        },
        isUserAwaiting: this.isUserAwaiting
      }
    },
    isUserAwaiting() {
      return this.isAwaiting
    }
  },
  mounted() {
    if (this.isLoggedIn) {
      this.$axios.get('/user/awaiting-status').then((response) => {
        this.isAwaiting = response.data.success
      })
    }
  },
  methods: {
    callForSales() {
      // Check if sales manager is already called

      if (!this.isUserAwaiting) {
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
    }
  }
}
</script>

<style lang="scss" scoped>
.sidebar {
  background: #fff;
  width: 7%;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  position: relative;
  margin-right: 3%;
  border-top-right-radius: 80px;
  box-shadow: 2px 3px 21.76px 10.24px rgba(67, 34, 114, 0.07);
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
      width: 65px;
      height: 65px;
      border-radius: 20px;
      color: white;
      text-align: center;
      font-family: $font-caps;
      font-weight: bold;
      font-size: 10px;
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
        font-size: 12px;
        font-family: $font-caps;
        margin-top: 15px;
        font-weight: 600;
        text-align: center;
        text-transform: uppercase;
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
