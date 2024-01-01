<script setup lang="ts">
defineProps<{
  title: string
  description: string
}>()
</script>

<template>
  <div class="flex justify-between">
    <div class="flex flex-col">
      <h2 class="font-bold text-base">{{ title }}</h2>
      <span>{{ description }}</span>
    </div>
    <input type="checkbox" />
  </div>
</template>
