<script setup lang="ts">
const { data: posts } = await useAsyncData('blog', () =>
  queryCollection('blog').all()
);
</script>

<template>
  <div class="max-w-3xl mx-auto p-6">
    <h1 class="text-3xl font-bold pb-3 mb-6 border-b border-gray-200">
      My Blogs
    </h1>
    <div class="space-y-4">
      <ul v-if="posts && posts.length !== 0" class="space-y-3">
        <li
          v-for="post in posts"
          :key="post.id"
          class="bg-gray-700 dark:bg-gray-50 p-4 rounded-md transition-colors duration-200"
        >
          <NuxtLink
            :to="post.path"
            class="text-gray-50 dark:text-gray-700 block"
          >
            {{ post.date }} - {{ post.title }}
          </NuxtLink>
        </li>
      </ul>
      <div v-else class="bg-gray-50 p-6 rounded-md text-gray-500 text-center">
        No Blogs Found
      </div>
    </div>
  </div>
</template>
