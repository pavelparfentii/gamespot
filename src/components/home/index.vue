<template>
  <div class="container">
    <app-carousel> </app-carousel>
  </div>
</template>

<script setup>
//get articles
import { useArticlesStore } from '@/stores/articles'
//carousel
import AppCarousel from '@/utils/carousel.vue'

const articlesStore = useArticlesStore()
if (!articlesStore.homeArticles) {
  articlesStore.getHomeArticles(3)
}
</script>
