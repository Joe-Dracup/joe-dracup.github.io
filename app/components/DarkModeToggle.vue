<script setup lang="ts">
const colorMode = useColorMode()

function toggleDarkMode() {
  colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
}
</script>

<template>
  <ClientOnly fallback="loading colour preference">
    <div class="dark-mode-toggle">
      <UButton
        :icon="
          colorMode.value === 'dark'
            ? 'i-heroicons-sun-20-solid'
            : 'i-heroicons-moon-20-solid'
        "
        variant="ghost"
        @click="toggleDarkMode"
      >
        {{ colorMode.value === 'dark' ? 'Light Mode' : 'Dark Mode' }}
      </UButton>
    </div>
  </ClientOnly>
</template>
