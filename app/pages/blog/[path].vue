<script setup lang="ts">
const route = useRoute();
const { data: page } = await useAsyncData(route.path, () => {
  return queryCollection('blog').path(route.path).first();
});
</script>

<template>
  <div v-if="page" class="max-w-3xl mx-auto p-6 nuxt-content">
    <h1 class="text-3xl font-bold pb-3 mb-6 border-b border-gray-200">
      {{ page.title }}
    </h1>
    <ContentRenderer :value="page" />
  </div>
</template>

<style lang="css">
.nuxt-content {
  h3 {
    font-size: var(--text-xl);
    line-height: var(--tw-leading, var(--text-xl--line-height));
    margin-top: 1rem;
  }

  h2 {
    font-size: var(--text-2xl);
    line-height: var(--tw-leading, var(--text-2xl--line-height));
    margin-top: 1rem;
  }

  h1 {
    font-size: var(--text-3xl);
    line-height: var(--tw-leading, var(--text-3xl--line-height));
    margin-top: 1rem;
  }

  p,
  pre {
    margin-top: 0.5rem;
  }
}
</style>
