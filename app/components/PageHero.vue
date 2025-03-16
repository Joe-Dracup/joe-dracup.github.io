<script setup lang="ts">
const props = defineProps<{
  eyebrow?: string;
  title: string;
  description: string;
}>();
</script>

<template>
  <section class="relative h-[calc(100vh-60px)] flex items-center">
    <div class="relative container mx-auto px-6 py-24 md:py-32">
      <div class="max-w-3xl">
        <span
          v-if="eyebrow"
          class="inline-block px-3 py-1 mb-6 text-xs font-semibold tracking-wider uppercase bg-opacity-20 rounded-full"
        >
          {{ eyebrow }}
        </span>

        <h1
          class="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6"
        >
          {{ title }}
        </h1>

        <p class="text-xl md:text-2xl mb-8 max-w-2xl">
          {{ description }}
        </p>
      </div>
    </div>
  </section>
</template>
