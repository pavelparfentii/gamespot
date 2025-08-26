<template>
  <div class="text-center mb3" v-if="isLoading">
    <v-progress-circular indeterminate color="primary"></v-progress-circular>
  </div>
  <div v-else>
    <Header />
    <router-view />
  </div>
</template>

<script setup>
import Header from './components/navigation/header.vue'
import { firstLoad } from './composables/auth'

const { isLoading } = firstLoad()
</script>
