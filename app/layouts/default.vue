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
    label: 'Full CV',
    icon: 'dashicons:text-page',
    to: '/cv',
  },
  {
    slot: 'mode',
  },
])
</script>

<template>
  <UNavigationMenu :items="items" class="w-full justify-center print:hidden">
    <template #mode>
      <UColorModeSwitch />
    </template>
  </UNavigationMenu>
  <ClientOnly>
  <slot />
  </ClientOnly>
</template>
