<script setup lang="ts">
const items = ref([
  {
    label: 'Home',
    icon: 'dashicons:admin-home',
    to: '/',
  },
  {
    label: 'Blog',
    icon: 'dashicons:welcome-write-blog',
    to: '/blog',
  },
  {
    slot: 'mode',
  },
]);
</script>
<template>
  <UNavigationMenu :items="items" class="w-full justify-center">
    <template #mode><DarkModeToggle /> </template>
  </UNavigationMenu>
  <slot />
</template>
