<template>
  <button class="btn" @click="handleClick">
    <div class="btn__prefix"></div>
    <div class="btn__lab">
      {{ label }}
    </div>
    <div class="btn__postfix"></div>
  </button>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      required: true
    }
  },
  methods: {
    handleClick: function (){
      this.$emit('click')
    }
  }
}
</script>

<style lang="scss" scoped>
.btn {
  background: #7e73ae;
  color: #fff;
  display: flex;
  padding: 8px 22px; 
  border: none;
  border-radius: 16px;
  &:focus {
    outline: none;
  } 
}
</style>