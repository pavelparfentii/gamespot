<template>
  <div class="container p_top">
    <div class="text-center mt-3" v-if="loading">
      <v-progress-circular indeterminate color="primary"></v-progress-circular>
    </div>
    <div class="article_page" v-else>
      <div class="game_tag">{{ article.game }}</div>
      <div class="article_featured" :style="{ backgroundImage: `url(${article.img})` }"></div>
      <div class="article_content">
        <div class="owner">
          Article written by <b>{{ article.owner.firstname }} {{ article.owner.lastname }}</b>
        </div>
        <hr />
        <h1>{{ article.title }}</h1>
        <div class="editor" v-html="article.editor"></div>
        <div class="article_rating">
          <v-rating v-model="article.rating" readonly></v-rating>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import { useArticlesStore } from '@/stores/articles'
const articlesStore = useArticlesStore()

import { useRoute } from 'vue-router'
const route = useRoute()

const loading = ref(true)
const article = ref('')

articlesStore
  .getArticleById(route.params.id)
  .then((response) => {
    article.value = response
    // loading.value = false
  })
  .finally(() => {
    loading.value = false
  })
</script>
