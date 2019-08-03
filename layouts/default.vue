<template>
  <div>
    <button-main-orange icon="caret-right" button-text="შემდეგი" />
    <nuxt />
  </div>
</template>
<script>
import ButtonMainOrange from '~/components/partials/ButtonMainOrange'

export default {
  components: { ButtonMainOrange }
}
</script>

<style lang="scss">
body {
  background: #fff;
}
</style>
