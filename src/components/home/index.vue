<template>
  <div class="container">
    <app-carousel> </app-carousel>
    <div class="mt-4">
      <featured></featured>
    </div>
    <!-- <featured></featured> -->
  </div>
</template>

<script setup>
//get articles
import { useArticlesStore } from '@/stores/articles'
//carousel
import AppCarousel from '@/utils/carousel.vue'

import Featured from '@/components/home/featured.vue'

const articlesStore = useArticlesStore()
if (!articlesStore.homeArticles) {
  articlesStore.getHomeArticles(8)
}
</script>
