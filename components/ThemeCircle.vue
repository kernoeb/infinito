<script lang="ts" setup>
defineProps({
  title: {
    type: String,
    required: true
  },
  customClass: {
    type: Object,
    default: () => ({})
  },
  iconName: {
    type: String,
    default: ''
  }
})
</script>

<template>
  <div
    :class="customClass"
    class="w-64 h-16 rounded-full flex justify-center items-center zoom font-bold border-cyan-950 border-2"
  >
    <Icon
      v-if="iconName"
      :name="iconName"
      class="w-6 h-6 mr-2"
    />
    {{ title }}
  </div>
</template>

<style lang="postcss" scoped>
.zoom {
  @apply transition-all duration-75 ease-in-out;

  &:hover {
    @apply transform scale-105;
  }
}
</style>
