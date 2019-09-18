<template>
  <div class="prompt" :style="{ backgroundColor: `${color}40` }">
    <div class="prompt__color" :style="{backgroundColor: color}" />
    <div class="prompt__text">
      {{text}}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    color: {
      type: String,
      default: '#009444'
    },
    text: {
      type: String,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
.prompt {
  display: flex;
  align-items: center;
  padding: 8px 15px;
  margin: auto; 
  margin-right: 0;
  margin-top: 0;
  border-top-left-radius: 12px;
  border-bottom-left-radius: 12px;
  &__color {
    height: 20px;
    width: 20px;
    border-radius: 50%;
    margin-right: 10px;
  }
  &__text {
    color: #494949;
    font-family: $font;
    font-size: 11px;
    letter-spacing: 0.6px;
  }
}
</style>