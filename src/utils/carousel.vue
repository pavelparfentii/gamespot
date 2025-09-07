<template>
  <div v-if="articlesStore.getFeaturedArticles.length">
    <Carousel :items-to-show="1" :wrap-around="true" class="p_top">
      <Slide v-for="article in articlesStore.getFeaturedArticles" :key="article.id">
        <div class="slider_bck" :style="`background-image: url(${article.img});`"></div>
        <div class="slide_content">
          <div class="item">
            <div>{{ article.title }}</div>
            <div>{{ article.excerpt }}</div>
          </div>
        </div>
      </Slide>
      <template #addons>
        <Navigation />
        <Pagination />
      </template>
    </Carousel>
  </div>
</template>

<script setup>
import 'vue3-carousel/carousel.css'
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel'

import { useArticlesStore } from '@/stores/articles'

const articlesStore = useArticlesStore()
articlesStore.getFeaturedArticles
</script>
