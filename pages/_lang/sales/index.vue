<template>
  <div class="page-sales">
    <sales-app-sidebar class="page-sales__index__sidebar" :no-margin="true" />
    <div class="page-content">
      <div class="page-sales__content">
        <div class="page-sales__content__header">
          <session-button class="page-sales__content__header__session" />
          <language-switcher class="page-sales__content__header__language" />
        </div>
        <div class="page-sales__content__projects">
          <div class="project">
            <div class="project__image">
              <div class="img-wrapper">
                <img src="@/assets/images/m3_saburtalo_ubani.jpg" alt="" />
              </div>
            </div>
            <div class="project__content">
              <h1>{{ $t('projects.m3_gelovani') }}</h1>
              <p>{{ $t('home.m3text') }}</p>
              <ul>
                <li>{{ $t('home.m3sub1') }}</li>
              </ul>
              <div class="project__content__sold-info">
                <h4>{{ $t('labels.sold_flat_count') }}</h4>
                <div class="project__content__sold-info__progress">
                  <white-progress
                    :min="0"
                    :max="100"
                    suffix="%"
                    :value="progress"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="page-sales__footer">
        <div class="page-sales__footer__title-wrapper">
          <title-with-line
            class="title"
            :title="$t('titles.ChooseSearchOption')"
          />
          <!-- <small>{{ $t('titles.ChooseYourSearchingMethod') }}</small> -->
        </div>
        <div class="index-illustrated-button">
          <illustrated-button
            :label="$t('labels.ByRender')"
            :to-route="`/${locale}/sales/render`"
          >
            <template v-slot:illustration>
              <render-illustration
                class="index-illustation-icon"
                width="50px"
                height="100%"
              />
            </template>
            <template v-slot:icon>
              <render-icon icon-color="#fff" height="14px" width="14px" />
            </template>
          </illustrated-button>
        </div>
        <div class="index-illustrated-button">
          <illustrated-button
            :label="$t('labels.ByFilter')"
            :to-route="`/${locale}/sales/filter`"
          >
            <template v-slot:illustration>
              <filter-illustration
                class="index-illustation-icon"
                width="50px"
                height="100%"
              />
            </template>
            <template v-slot:icon>
              <filter-search icon-color="#fff" height="9px" width="12px" />
            </template>
          </illustrated-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import TitleWithLine from '@/components/partials/TitleWithLine'
import IllustratedButton from '@/components/partials/IllustratedButton'
import LanguageSwitcher from '@/components/core/LanguageSwitcher'
import SessionButton from '@/components/partials/SessionButton'
import WhiteProgress from '@/components/partials/WhiteProgress'
import FilterIllustration from '@/components/icons/FilterIllustration'
import RenderIllustration from '@/components/icons/RenderIllustration'
import FilterSearch from '@/components/icons/FilterSearch'
import SalesAppSidebar from '@/components/core/SalesAppSidebar'
import RenderIcon from '@/components/icons/Render'
export default {
  components: {
    TitleWithLine,
    IllustratedButton,
    SalesAppSidebar,
    SessionButton,
    WhiteProgress,
    FilterIllustration,
    RenderIllustration,
    RenderIcon,
    FilterSearch,
    LanguageSwitcher
  },
  layout: 'CleanLayout',
  auth: 'guest',
  data() {
    return {
      project: null
    }
  },
  computed: {
    ...mapGetters({
      locale: 'locale'
    }),
    appList() {
      return [
        {
          name: 'Filter',
          link: `/${this.locale}/sales/filter`
        },
        {
          name: 'Render',
          link: `/${this.locale}/sales/render`
        }
      ]
    },
    progress() {
      return this.project && this.project.data ? this.project.data.building_status : 0
    }
  },
  mounted() {
    this.getProjectInfo()
    // this.$toast.generalError()
  },
  methods: {
    getProjectInfo() {
      this.$axios.get('/projects/13').then(({ data }) => {
        this.project = data
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.page-sales {
  display: flex;
  height: 100vh;
  background: #f1ece6;
  .page-content {
    display: flex;
    flex-direction: column;
    width: calc(100% - 81px);
  }
  &__index__sidebar {
    margin-right: 0;
  }
  &__content {
    height: calc(100% - 174px);
    &__header {
      display: flex;
      padding: 0 45px;
      &__session {
        margin: auto 20px auto auto;
      }
    }
    &__projects {
      display: flex;
      max-width: 1039px;
      margin: 0 33px;
      height: 480px;
    }
  }
  &__footer {
    height: 174px;
    background: #f2e3d3;
    margin-top: auto;
    display: flex;
    padding: 0 33px;
    justify-content: space-between;
    &__title-wrapper {
      display: flex;
      flex-direction: column;
      margin: auto 0;
      small {
        font-size: 11px;
      }
    }
    .index-illustrated-button {
      margin: auto 0;
    }
    .index-illustation-icon {
      margin: 0 0 0 -12px;
    }
  }
}
.project {
  display: flex;
  &__image {
    width: 500px;
    padding-right: 60px;
    overflow: hidden;
    box-sizing: content-box;
    // background: url('~@/assets/images/pattern-lines.png') no-repeat;
    background-size: 11%;
    background-position: 86% top;
    .img-wrapper {
      border-top-left-radius: 70px;
      border-bottom-right-radius: 70px;
      height: 100%;
      width: 100%;
      overflow: hidden;
    }
    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
      object-position: center;
    }
  }
  &__content {
    width: 400px;
    h1 {
      color: $orange;
      font-size: 23px;
      font-family: $font-caps;
      line-height: 34px;
      font-weight: bold;
      letter-spacing: 1.4px;
    }
    p {
      font-size: 13.2px;
      line-height: 1.9;
      color: #494949;
      letter-spacing: 0.7px;
      margin: 46px 0;
    }
    ul {
      display: flex;
      flex-direction: column;
      list-style: none;
      padding-left: 33px;
      li {
        font-size: 13.2px;
        line-height: 1.4;
        color: #494949;
        letter-spacing: 0.7px;
        margin-bottom: 16px;
        position: relative;
        &:before {
          content: '';
          position: absolute;
          top: 8px;
          left: -33px;
          height: 6px;
          width: 12px;
          background: $orange;
        }
      }
    }
    &__sold-info {
      margin-top: 48px;
      h4 {
        color: $orange;
        margin-bottom: 25px;
        font-family: $font-caps;
        font-size: 13px;
        font-weight: bold;
      }
      &__progress {
        width: 303px;
      }
    }
  }
}
</style>
