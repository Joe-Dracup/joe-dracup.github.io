<script setup lang="ts">
import type { ButtonProps } from '@nuxt/ui';

const links : ButtonProps[] =[
  {
    label: 'Blog',
    to: '/blog',
    icon: 'dashicons:welcome-write-blog'
  },
  {
    label: 'linkedin',
    to: 'https://www.linkedin.com/in/joe-dracup',
    color: 'neutral',
    icon: 'uil:linkedin',
    variant: 'subtle',
    trailingIcon: 'i-lucide-arrow-right'
  }
]
</script>
<template>
  <main>
    <UPageHero title="dracup.io" description="joseph dracup, software engineer" :links="links" orientation="horizontal" >
      <img
        src="/assets/images/me.jpg"
        alt="my face"
        class="rounded-lg shadow-2xl ring ring-default"
      /> 
  </UPageHero>
  </main>
</template>
