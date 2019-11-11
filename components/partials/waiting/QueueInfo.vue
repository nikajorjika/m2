<template>
  <div class="queue-info">
    <div class="queue-info__illustration">
      <div class="queue-info__illustration__icon">
        <img src="@/assets/illustrations/illustration-women.png" alt="Call For Sales">
      </div>
      <div class="queue-info__illustration__title">
        <h4>{{$t('labels.YouCalledForSales')}} <span class="color-orange">{{$t('labels.YouAreNumber').replace('%s', '-5')}}</span></h4>
      </div>
      <div class="queue-info__illustration__sub-title">
       <p>{{$t('labels.ApproximateWaitingTime').replace('%s', '25')}}</p>
      </div>
    </div>
    <div class="queue-info__info">
      <p>{{$t('labels.WaitForSalesOrRequestInfo')}}</p>
    </div>
    <button class="queue-info__pdf-button">
      <span>{{$t('labels.DetailsAsPdf')}}</span> <pdf-icon class="svg-icon" />
    </button>
    <button class="queue-info__cancel-button">
      <span>{{$t('labels.CancelSalesRequest')}}</span> <cancel-icon class="svg-icon" />
    </button>
  </div>
</template>

<script>
import PdfIcon from '@/assets/icons/PdfIcon.svg'
import CancelIcon from '@/assets/icons/CancelIcon.svg'
export default {
  components: {
    PdfIcon,
    CancelIcon
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
    background: #f1e6dd;
    width: 514px;
    position: relative;
    padding: 18px;
    padding-left: 85px;
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
    }
    &:active {
      background: transparent;
      color: $orange;
      border: 1px solid $orange;
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
    }
    &:active {
      background: #69558e;
      color: white;
    }
  }
}
</style>