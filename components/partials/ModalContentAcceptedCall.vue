<template>
  <div>
    <illustrated-button :label="$t('labels.acceptedCall')">
      <template v-slot:illustration>
        <manager-icon
          :width="49"
          :height="114"
          :style="{ marginTop: '-3px' }"
        />
      </template>
    </illustrated-button>
  </div>
</template>

<script>
import IllustratedButton from '@/components/partials/IllustratedButton'
import ManagerIcon from '@/assets/icons/Manager1.svg'

export default {
  components: {
    IllustratedButton,
    ManagerIcon
  }
}
</script>

<style lang="scss">
.layout-modal {
  justify-content: center;
  width: fit(1060) !important;
  height: fit(760) !important;
  padding: fit(160) fit(140) fit(140) !important;

  .button {
    width: fit(780);
    height: fit(122);
    padding-left: 25px;
    border-radius: 30px;
    background-color: rgba(241, 216, 202, 0.32);

    .label {
      margin-right: fit(35, fitRaw(16));
      font-family: $font-caps;
      font-size: fit(24);
      letter-spacing: 1px;
      font-weight: bold;
      color: #494949;
    }

    .svg-container {
      display: none;
    }
  }
}
</style>
