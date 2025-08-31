<template>
  <div class="container-fluid">
    <div class="row">
      <nav id="sidebarMenu" class="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
        <div class="position-sticky pt-3">
          <ul class="nav flex-column">
            <li class="nav-item">
              <router-link class="nav-link" :to="{ name: 'dashboard' }">
                <v-icon icon="mdi-view-dashboard"></v-icon>
                Dashboard
              </router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" :to="{ name: 'user_profile' }">
                <v-icon icon="mdi-account"></v-icon>
                Profile
              </router-link>
            </li>
            <li class="nav-item">
              <router-link
                class="nav-link"
                :to="{ name: 'admin_articles' }"
                v-if="userStore.user.isAdmin"
              >
                <v-icon icon="mdi-note-outline"></v-icon>
                Articles
              </router-link>
            </li>
            <li class="nav-item">
              <router-link
                class="nav-link"
                :to="{ name: 'admin_add_article' }"
                v-if="userStore.user.isAdmin"
              >
                <v-icon icon="mdi-note-plus-outline"></v-icon>
                Add Article
              </router-link>
            </li>
          </ul>
        </div>
      </nav>
      <main id="admin_body" class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
        <div>
          <router-view></router-view>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()

console.log(userStore.user)
</script>
