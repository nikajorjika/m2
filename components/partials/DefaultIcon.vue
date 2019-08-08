<template>
  <div class="icon" :class="iconName" :style="activeStyles || inactiveStyles" />
</template>

<script>
export default {
  props: {
    iconName: {
      type: String,
      default: ''
    },
    inactiveStyles: {
      type: Object,
      default: () => ({})
    },
    activeStyles: {
      type: Object,
      default: () => null
    }
  }
}
</script>

<style lang="scss" scoped>
.icon {
  width: 41px;
  height: 41px;
  background-image: linear-gradient(
    0,
    rgba(104, 79, 120, 1) 50%,
    rgba(226, 100, 121, 1) 100%
  );
  background-repeat: no-repeat;
  mask-repeat: no-repeat;
  mask-position: center;

  &.alone {
    mask-image: url('~assets/icons/Alone1.svg');
  }

  &.appartament {
    mask-image: url('~assets/icons/Appartament1.svg');
  }

  &.block {
    mask-image: url('~assets/icons/Block1.svg');
  }

  &.children {
    mask-image: url('~assets/icons/Children1.svg');
  }

  &.complited {
    mask-image: url('~assets/icons/Complited1.svg');
  }

  &.cost {
    mask-image: url('~assets/icons/Cost1.svg');
  }

  &.custom_makeover {
    mask-image: url('~assets/icons/Custom_Makeover1.svg');
  }

  &.decor {
    mask-image: url('~assets/icons/Decor1.svg');
  }

  &.favourite {
    mask-image: url('~assets/icons/Favourite1.svg');
  }

  &.finish_session {
    mask-image: url('~assets/icons/Finish_Session1.svg');
  }

  &.floor {
    mask-image: url('~assets/icons/Floor1.svg');
  }

  &.furniture {
    mask-image: url('~assets/icons/Furniture1.svg');
  }

  &.giving_option {
    mask-image: url('~assets/icons/Giving_option1.svg');
  }

  &.imigrent {
    mask-image: url('~assets/icons/Imigrent1.svg');
  }

  &.investment {
    mask-image: url('~assets/icons/Investment1.svg');
  }

  &.in_progress {
    mask-image: url('~assets/icons/In_progress1.svg');
  }

  &.land {
    mask-image: url('~assets/icons/Land1.svg');
  }

  &.main {
    mask-image: url('~assets/icons/Main1.svg');
  }

  &.makeover {
    mask-image: url('~assets/icons/makeover1.svg');
  }

  &.parents {
    mask-image: url('~assets/icons/Parents1.svg');
  }

  &.planed {
    mask-image: url('~assets/icons/Planed1.svg');
  }

  &.project {
    mask-image: url('~assets/icons/Project1.svg');
  }

  &.questions {
    mask-image: url('~assets/icons/Questions1.svg');
  }

  &.sleeping_room {
    mask-image: url('~assets/icons/Sleeping_room1.svg');
  }

  &.status {
    mask-image: url('~assets/icons/Status1.svg');
  }

  &.technick {
    mask-image: url('~assets/icons/Technick1.svg');
  }

  &.to_find {
    mask-image: url('~assets/icons/To_Find1.svg');
  }

  &.arrow-right {
    mask-image: url('~assets/icons/arrow-pointing-to-right.svg');
  }

  &.caret-right {
    mask-image: url('~assets/icons/arrow-right-keyboard.svg');
  }
}
</style>
