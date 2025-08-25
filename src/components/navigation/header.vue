<template>
  <header>
    <div class="container header_container">
      <div class="logo">
        <router-link :to="{ name: 'home' }">Gamesource</router-link>
      </div>
      <div>
        <ul>
          <li><router-link :to="{ name: 'signin' }">Sign in</router-link></li>
          <!-- <li><router-link to="{name: 'about'}">About</router-link></li>
        <li><router-link to="{name: 'contact'}">Contact</router-link></li>l -->
          <span>
            <li><span>Logout</span></li>
            <li><router-link :to="{ name: 'dashboard' }">Dashboard</router-link></li>
          </span>
        </ul>
      </div>
    </div>
  </header>
</template>
