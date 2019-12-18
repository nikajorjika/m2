<template>
  <div class="queue-info">
    <full-page-loader v-if="loading" />
    <div class="queue-info__illustration">
      <div class="queue-info__illustration__icon">
        <img
          src="@/assets/illustrations/illustration-women.png"
          alt="Call For Sales"
        />
      </div>
      <div class="queue-info__illustration__title">
        <h4>
          {{ $t('labels.YouCalledForSales') }}
          <span class="color-orange">{{
            $t('labels.YouAreNumber').replace('%s', currentQueueNumber)
          }}</span>
        </h4>
      </div>
      <!--      <div class="queue-info__illustration__sub-title">-->
      <!--        <p>{{ $t('labels.ApproximateWaitingTime').replace('%s', '25') }}</p>-->
      <!--      </div>-->
    </div>
    <div class="queue-info__info">
      <p>{{ $t('labels.WaitForSalesOrRequestInfo') }}</p>
    </div>
    <!-- <button class="queue-info__pdf-button" @click="sendPdf">
      <span>{{ $t('labels.DetailsAsPdf') }}</span>
      <pdf-icon class="svg-icon" height="16px" />
    </button> -->
    <button class="queue-info__cancel-button" @click="cancelSummonSale">
      <span>{{ $t('labels.CancelSalesRequest') }}</span>
      <cancel-icon class="svg-icon" height="14px" />
    </button>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import FullPageLoader from '@/components/partials/FullPageLoader'
// import PdfIcon from '@/assets/icons/PdfIcon.svg'
import CancelIcon from '@/assets/icons/CancelIcon.svg'
export default {
  components: {
    FullPageLoader,
    // PdfIcon,
    CancelIcon
  },
  data() {
    return {
      loading: false,
      queueNumber: null
    }
  },
  computed: {
    ...mapGetters({
      locale: 'locale',
      user: 'auth/user'
    }),
    currentQueueNumber() {
      if (!this.queueNumber) return ''

      const prefix = this.locale === 'ka' ? 'მე - ' : ''

      return parseInt(this.queueNumber) === 1
        ? this.locale === 'ka'
          ? 'პირველი'
          : 'One'
        : prefix + this.queueNumber
    }
  },
  mounted() {
    this.$axios.get('user/queue-number').then((response) => {
      if (response.status === 200 && response.data.queue_number) {
        this.queueNumber = response.data.queue_number
      }
    })
  },
  methods: {
    cancelSummonSale() {
      return new Promise((resolve, reject) => {
        this.$axios
          .post('user/cancel-summon-sale')
          .then((response) => {
            if (response.status === 200 && response.data.status) {
              this.$router.push(`/${this.locale}/sales`)
            }

            resolve(response)
          })
          .catch((e) => {
            reject(e)
          })
      })
    },
    sendPdf() {
      this.loading = true
      this.$axios
        .get(`user-flats/1/send-pdf`)
        .then(({ data }) => {
          this.loading = false
        })
        .catch(() => {
          this.loading = false
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.queue-info {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  &__illustration {
    display: flex;
    align-items: center;
    background: #f1e6dd;
    min-height: fit(120);
    position: relative;
    padding: 18px 18px 18px 85px;
    border-radius: 20px;
    &__icon {
      height: 107.5px;
      position: absolute;
      bottom: -13px;
      left: 16px;
      img {
        height: 100%;
      }
    }
    &__title {
      font-family: $font-caps;
      text-align: center;
      color: #494949;
      font-size: 16px;
    }
    &__sub-title {
      font-family: $font;
      text-align: center;
      font-size: 14px;
      color: #494949;
      margin-top: 13px;
    }
  }
  &__info {
    margin-top: 30px;
    color: #494949;
    font-family: $font;
  }
  &__pdf-button {
    margin-top: 30px;
    background: $orange;
    border-radius: 16px;
    font-family: $font-caps;
    color: white;
    font-size: 12px;
    outline: none;
    padding: 12px;
    display: flex;
    align-items: center;
    border: 1px solid transparent;
    .svg-icon {
      margin-left: 12px;
      fill: #fff;
    }
    &:active {
      background: transparent;
      color: $orange;
      border: 1px solid $orange;
      .svg-icon {
        fill: $orange;
      }
    }
  }
  &__cancel-button {
    margin-top: 30px;
    color: #69558e;
    background: transparent;
    border: 1px solid #69558e;
    border-radius: 16px;
    font-family: $font;
    font-size: 12px;
    padding: 12px;
    outline: none;
    display: flex;
    align-items: center;
    .svg-icon {
      margin-left: 12px;
      stroke: #69558e;
    }
    &:active {
      background: #69558e;
      color: white;
      .svg-icon {
        stroke: white;
      }
    }
  }
}
</style>
