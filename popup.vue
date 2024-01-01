<script setup lang="ts">
import "./styles.css"

import OptionSelect from "./components/OptionSelect.vue"

const features = [
  {
    title: "No new links",
    description: "Prevent Etsy from opening a new tab"
  },
  {
    title: "Sticky header",
    description: "Make the header stick on top of the page"
  },
  {
    title: "Auto-expand listing description",
    description: "Make the header stick on top of the page"
  }
]
</script>

<template>
  <div class="bg-blue-900 text-blue-100 px-4 w-[400px]">
    <div class="px-5 flex flex-col items-center gap-y-3 py-3">
      <h2 class="text-2xl">[betsy logo]</h2>
    </div>
    <div class="bg-blue-700 rounded-md px-3 py-2 flex flex-col gap-y-3">
      <h2>Options</h2>
      <OptionSelect
        v-for="(item, index) in features"
        :key="index"
        :title="item.title"
        :description="item.description" />
    </div>
    <div class="py-2.5 flex flex-col items-center gap-y-1.5">
      <span
        >BEtsy is an open source project by
        <a
          href="https://github.com/kuroji-fusky"
          target="_blank"
          class="underline"
          >Kuroji Fusky</a
        >!</span
      >
      <a
        href="https://github.com/kuroji-fusky/betsy"
        target="_blank"
        class="underline"
        >GitHub</a
      >
    </div>
  </div>
</template>
