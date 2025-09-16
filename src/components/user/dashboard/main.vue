<template>
  <div class="dashboard-container">
    <div class="mb-4">
      <h1>Dashboard</h1>
      <p>Welcome back, {{ userStore.user.firstname || 'User' }}!</p>
    </div>

    <div class="row">
      <div class="col-md-4 mb-4">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">Profile</h5>
            <p class="card-text">
              <strong>Name:</strong> {{ userStore.user.firstname }} {{ userStore.user.lastname
              }}<br />
              <strong>Email:</strong> {{ userStore.user.email }}
            </p>
            <router-link class="btn btn-primary" :to="{ name: 'user_profile' }">
              Edit Profile
            </router-link>
          </div>
        </div>
      </div>

      <div class="col-md-4 mb-4">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">Recent Activity</h5>
            <p class="card-text">You have no recent activity.</p>
          </div>
        </div>
      </div>

      <div class="col-md-4 mb-4">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">Favorites</h5>
            <p class="card-text">You haven't added any favorites yet.</p>
          </div>
        </div>
      </div>
    </div>

    <div class="row" v-if="userStore.user.isAdmin">
      <div class="col-12">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">Admin Quick Actions</h5>
            <div class="d-flex gap-2">
              <router-link class="btn btn-outline-primary" :to="{ name: 'admin_articles' }">
                Manage Articles
              </router-link>
              <router-link class="btn btn-outline-primary" :to="{ name: 'admin_add_article' }">
                Add New Article
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()
</script>

<style scoped>
.dashboard-container {
  padding: 20px 0;
}

.card {
  height: 100%;
  transition: transform 0.2s;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.card:hover {
  transform: translateY(-5px);
}
</style>
