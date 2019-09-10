<template>
  <div class="gradient-block">
    <slot />
  </div>
</template>
<style lang="scss" scoped>
.gradient-block {
  background: linear-gradient(60deg, rgba(104, 79, 120, .7) 0%, rgba(226, 100, 121, .7) 100%) white;
  border-radius: 14px;
  overflow: hidden;
  padding: 14px;
  color: #fff;
}
</style>