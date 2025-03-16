<script setup lang="ts">
const route = useRoute();
const { data: page } = await useAsyncData(route.path, () => {
  return queryCollection('blog').path(route.path).first();
});
</script>

<template>
  <div v-if="page" class="max-w-3xl mx-auto p-6">
    <h1 class="text-3xl font-bold pb-3 mb-6 border-b border-gray-200">
      {{ page.title }}
    </h1>
    <ContentRenderer :value="page" />
  </div>
</template>
