<template>
  <div class="text-center m-4" v-show="loading">
    <v-progress-circular indeterminate color="primary"></v-progress-circular>
  </div>
  <div v-show="!loading">
    <v-table theme="dark">
      <thead>
        <tr>
          <th class="text-left">Name</th>
          <th class="text-left">Owner</th>
          <th class="text-left">Rating</th>
          <th class="text-left">Date</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="article in articlesStore.adminArticles" :key="article.id">
          <td>{{ article.game }}</td>
          <td>{{ article.owner.firstname }} {{ article.owner.lastname }}</td>
          <td>{{ article.rating }}</td>
          <td>{{ article.timestamp.toDate().toDateString() }}</td>
          <td>
            <v-btn variant="outline" color="red" size="small"> REMOVE </v-btn>
          </td>
          <td>
            <v-btn
              variant="outline"
              color="yellow"
              size="small"
              @click="router.push({ name: 'admin_edit_article', params: { id: article.id } })"
            >
              Edit
            </v-btn>
          </td>
        </tr>
      </tbody>
    </v-table>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useArticlesStore } from '@/stores/articles'

//router
import { useRoute, useRouter } from 'vue-router'
const router = useRouter()
const route = useRoute()

const loading = ref(false)
const btnLoad = ref(false)

const articlesStore = useArticlesStore()

//load more articles

//get first articles
loading.value = true
if (!articlesStore.adminArticles || route.query.reload) {
  articlesStore.getAdminArticles(3).finally(() => {
    loading.value = false
  })
}
</script>
